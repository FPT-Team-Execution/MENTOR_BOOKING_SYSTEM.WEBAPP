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
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const { userInfo } = useAuth();

  // Fetch list of created projects with pagination
  const fetchProjects = async (page = 1) => {
    setLoading(true);
    try {
      if (userInfo?.nameidentifier) {
        let res;
        if (userInfo.role === "Admin") {
          const params = { page, size: 5 }
          res = await projectService.getAllProject(params);
        } else {
          const params = {
            userRole: userInfo.role,
            page,
            size: 5,
            sortOrder: 'des'
          };
          res = await projectService.getProject(params, userInfo.nameidentifier);
        }

        if (page === 1) {
          setProjects(res.responseRequestModel.items);
        } else {
          setProjects((prevProjects) => [...prevProjects, ...res.responseRequestModel.items]);
        }

        setHasMore(res.responseRequestModel.items.length > 0);
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
    setCurrentPage(1);
    fetchProjects(1); // Reload project list
  };

  // Load more projects
  const loadMoreProjects = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    fetchProjects(nextPage);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Projects</h1>

      {/* Button to create a new project */}
      {
        userInfo.role !== "Mentor" &&
        <Button type="primary" onClick={showCreateModal}>
          Create Project
        </Button>
      }


      {/* Project List */}
      <ProjectList
        projects={projects}
        loading={loading}
      />

      {/* Load More button */}
      {hasMore && (
        <Button onClick={loadMoreProjects} disabled={loading} className="mt-4">
          Load More
        </Button>
      )}

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
