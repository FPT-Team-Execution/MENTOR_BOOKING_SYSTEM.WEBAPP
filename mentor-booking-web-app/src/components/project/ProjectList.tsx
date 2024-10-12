import React from "react";
import { List, Card, Button } from "antd";

interface ProjectListProps {
  projects: any[];
  loading: boolean;
  onView: (project: any) => void;
}

const ProjectList: React.FC<ProjectListProps> = ({
  projects,
  loading,
  onView,
}) => {
  return (
    // <List
    //   grid={{ gutter: 16, column: 3 }}
    //   loading={loading}
    //   dataSource={projects}
    //   renderItem={(project) => (
    //     <List.Item>
    //       <Card title={project.title}>
    //         <p>{project.description}</p>
    //         <Button onClick={() => onView(project)}>View Details</Button>
    //       </Card>
    //     </List.Item>
    //   )}
    // />
    <p className="text-center">No projects found</p>
  );
};

export default ProjectList;
