import React, { useEffect, useState } from "react";
import { Button, Modal, message } from "antd";
import axios from "axios";
import ProjectList from "../../../components/project/ProjectList";
import CreateProjectForm from "../../../components/project/CreateProjectForm";
import ProjectDetails from "../../../components/project/ProjectDetails";
import { Link } from "react-router-dom";

const ProjectPage: React.FC = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  // Fetch list of created projects
  const fetchProjects = async () => {
    setLoading(true);
    try {
      // Get projects by student ID API
      const { data } = await axios.get("/api/projects/students/{studentId}");
      setProjects(data);
    } catch (error) {
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

  // Handle viewing project details
  const viewProjectDetails = (project: any) => {
    setSelectedProject(project);
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
        onView={viewProjectDetails}
      />

      {/* Modal for creating a new project */}
      <Modal
        title="Create New Project"
        visible={isCreateModalVisible}
        onCancel={() => setIsCreateModalVisible(false)}
        footer={null}
      >
        <CreateProjectForm onProjectCreated={handleProjectCreated} />
      </Modal>

      {/* Modal for viewing project details */}
      {selectedProject && (
        <ProjectDetails
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
      <Link to='/project/123'>Project Detail</Link>
      <Link to='/mentor/calendar/5f10c206-033a-4930-95a5-ac66570ba58'>Calendar</Link>
    </div>
  );
};

export default ProjectPage;
