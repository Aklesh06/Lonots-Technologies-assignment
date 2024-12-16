import { useState } from "react";
import axios from 'axios';

function ProjectProgress ({ project, onBack }) {
    const [tasks, setTasks] = useState(project.tasks);

    const toggleTaskCompletion =async (id) => {
        const updatedTasks = tasks.map((task) =>
            task.id === id ? { ...task, completed: !task.completed } : task
        );
        setTasks(updatedTasks);
        try{
            await axios.put(`http://localhost:3000/update/${project.id}`,{tasks: updatedTasks, accepted: true})
        }
        catch(err){
            console.error("Failed to save progress:", err);
        }
    };

    const calculateScore = () => {
        const completedTasks = tasks.filter((task) => task.completed).length;
        return (completedTasks / tasks.length) * 100;
    };

    return (
        <div>
            <h1>{project.name}</h1>
            <p>{project.description}</p>
            <h2>Tasks</h2>
            <ul>
                {tasks.map((task) => (
                    <li key={task.id}>
                        <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => toggleTaskCompletion(task.id)}
                        />
                        {task.title}
                    </li>
                ))}
            </ul>
            <h3>Progress: {calculateScore()}%</h3>
            <button onClick={onBack}>Back to Projects</button>
        </div>
    );
};

export default ProjectProgress;