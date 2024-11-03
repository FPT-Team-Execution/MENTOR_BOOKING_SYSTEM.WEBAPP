import React from "react";
import { Spin } from "antd";
import ProjectCard from "./ProjectCard";
import { ProjectType } from "../../types/project.type";

interface ProjectListProps {
  projects: ProjectType[];
  loading: boolean;
}

const ProjectList: React.FC<ProjectListProps> = ({
  projects,
  loading,
}) => {
  return (
    <Spin spinning={loading}>
      <div>
      {
        projects ? 
        (<div className="flex flex-wrap justify-start gap-1">
          {
            projects.map(project =>
              <ProjectCard key={project.id} project={project}/>
            )
          }
        </div>)
        : (<>No project found</>)
      }
    </div>
    </Spin>
    
  );
};

export default ProjectList;
