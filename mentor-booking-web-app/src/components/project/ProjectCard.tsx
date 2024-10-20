import React from "react";
import { Card, Tag } from "antd";
import { CalendarOutlined, UserOutlined } from "@ant-design/icons";
import moment from "moment"; // For formatting dates
import 'antd/dist/reset.css'; // Make sure to import Antd CSS
import { ProjectType } from "../../types/project.type";

// Main Component
const ProjectCard: React.FC<{ project?: ProjectType }> = ({ project }) => {
  // Define color mapping for Status
  const statusColors = {
    Activated: "green",
    Deactivated: "gray",
    Suspended: "red",
    Pending: "yellow",
    Closed: "gray"
  };

  if (!project) {
    return <div>Project data not available</div>; // Thông báo khi project bị undefined
  }

  return (
    <Card className="border rounded-lg shadow-lg p-3 mb-4 max-w-xs text-left">
      {/* Project Title */}
      <h2 className="text-lg font-semibold text-gray-800">{project.title}</h2>
      
      {/* Status tag */}

      {/* Project Description */}
      <p className="text-gray-600 my-2 text-sm">
        {project.description ? project.description : "No description provided."}
      </p>

      {/* Due date and semester */}
      <div className="flex items-center justify-between mt-2 text-xs">
        <div className="flex items-center text-gray-500">
          <CalendarOutlined className="mr-1" />
          <span>Due: {moment(project.dueDate).format("DD MMM YYYY")}</span>
        </div>
        <div className="text-gray-500">
          <span>Semester: {project.semester}</span>
        </div>
      </div>

      {/* Created by and Mentor */}
      <div className="flex items-center justify-between mt-2 text-xs">
        <div className="flex items-center text-gray-500">
          <UserOutlined className="mr-1" />
          <span>Created by: {project.createdBy}</span>
        </div>
        <div className="text-gray-500">
          <span>Mentor ID: {project.mentorId}</span>
        </div>
      </div>
    </Card>
  );
};

export default ProjectCard;
