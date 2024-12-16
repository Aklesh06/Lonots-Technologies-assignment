import { useState } from 'react';
import AssignmentList from './components/projects';
import ProjectProgress from './components/progressTrack';

function App() {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
      <div>
          {selectedProject ? (
              <ProjectProgress
                  project={selectedProject}
                  onBack={() => setSelectedProject(null)}
              />
          ) : (
              <AssignmentList onSelect={setSelectedProject} />
          )}
      </div>
  );
};

export default App;
