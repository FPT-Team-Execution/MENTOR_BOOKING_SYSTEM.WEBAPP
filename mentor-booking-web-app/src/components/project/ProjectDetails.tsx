import React from "react";
import { Modal } from "antd";

interface ProjectDetailsProps {
  project: any;
  onClose: () => void;
}

const ProjectDetails: React.FC<ProjectDetailsProps> = ({
  project,
  onClose,
}) => {
  return (
    <Modal
      title="Project Details"
      visible={!!project}
      onCancel={onClose}
      footer={null}
    >
      <p>
        <strong>Title:</strong> {project.title}
      </p>
      <p>
        <strong>Description:</strong> {project.description}
      </p>
      <p>
        <strong>Due Date:</strong> {project.dueDate}
      </p>
      <p>
        <strong>Semester:</strong> {project.semester}
      </p>
      <p>
        <strong>Mentor ID:</strong> {project.mentorId}
      </p>
    </Modal>
  );
};

export default ProjectDetails;
