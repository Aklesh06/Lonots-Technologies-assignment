import { useState,useEffect } from "react";
import axios from "axios";

function AssignmentList({ onSelect }) {
    const [projectData, setProjectData] = useState([]);
   
    useEffect(() => {
        const fetchproject = async() => {
            try{
                const responce = await axios.get('http://localhost:3000/projects');
                setProjectData(responce.data)
            }
            catch(error){
                console.log("Error Fetching Data",error)
            }
        };
        fetchproject();
    },[]);

    const acceptProject = (id) => {
        const acceptedProjects = projectData.map((project) =>
            project.id === id ? { ...project, accepted: true } : project
        );
        setProjectData(acceptedProjects);
    };

    return (
        <div>
            <h1>Assignment</h1>
            <ul>
                {projectData.map((project) => (
                    <li key={project.id}>
                        <h2>{project.name}</h2>
                        <p>{project.description}</p>
                        {!project.accepted && (
                            <button onClick={() => acceptProject(project.id)}>
                                Accept
                            </button>
                        )}
                        {project.accepted && (
                            <button onClick={() => onSelect(project)}>
                                View Details
                            </button>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AssignmentList;