import React, { useEffect, useState } from "react";
import { Button, Modal, message } from "antd";
import ProjectList from "../../../components/project/ProjectList";
import CreateProjectForm from "../../../components/project/CreateProjectForm";
import { useAuth } from "../../../auth/AuthContext";
import { projectService } from "../../../services/projectService";
import { ProjectType } from "../../../types/project.type";

const ProjectPage: React.FC = () => {
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [loading, setLoading] = useState(false);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const { userInfo } = useAuth()

  // Fetch list of created projects
  const fetchProjects = async () => {
    setLoading(true);
    try {
      if (userInfo?.nameidentifier) {
        const res = await projectService.getProject({
          userRole: userInfo?.role,
          page: 1,
          size: 10,
          sortOrder: 'des'
        }, userInfo?.nameidentifier)
        setProjects(res.responseRequestModel.items);
      }

    } catch {
      message.error("Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  // Show the Create Project Modal
  const showCreateModal = () => {
    setIsCreateModalVisible(true);
  };

  // Handle project creation
  const handleProjectCreated = () => {
    setIsCreateModalVisible(false);
    fetchProjects(); // Reload project list
  };


  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Projects</h1>

      {/* Button to create a new project */}
      <Button type="primary" onClick={showCreateModal}>
        Create Project
      </Button>

      {/* Project List */}
      <ProjectList
        projects={projects}
        loading={loading}
      />

      {/* Modal for creating a new project */}
      <Modal
        title="Create New Project"
        open={isCreateModalVisible}
        onCancel={() => setIsCreateModalVisible(false)}
        footer={null}
      >
        <CreateProjectForm onProjectCreated={handleProjectCreated} />
      </Modal>
    </div>
  );
};

export default ProjectPage;
