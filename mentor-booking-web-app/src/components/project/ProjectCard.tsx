/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { Card } from "antd";
import { CalendarOutlined } from "@ant-design/icons";
import moment from "moment"; // For formatting dates
import 'antd/dist/reset.css'; // Make sure to import Antd CSS
import { ProjectType } from "../../types/project.type";
import { Link } from "react-router-dom";


type ChildComponentProps = {
  className?: string;
  project: ProjectType;
}

const ProjectCard: React.FC<ChildComponentProps> = ({ project, className }) => {
  const statusColors = {
    Activated: "green",
    Deactivated: "gray",
    Suspended: "red",
    Pending: "yellow",
    Closed: "gray"
  };

  if (!project) {
    return <div>Project data not available</div>;
  }

  return (
    <div className={className + ' min-w-64 min-h-52'}>
      <Link to={"/project/" + project.id} >
        <Card className="border rounded-lg shadow-lg p-3 mb-4 max-w-xs text-left">
          {/* Project Title */}
          <h2 className="text-lg font-semibold text-gray-800">{project.title}</h2>

          {/* Project Description */}
          <p className="text-gray-600 my-2 text-sm">
            {project.description ? project.description : "No description provided."}
          </p>

          {/* Due date and semester */}
          <div className="mt-2 text-xs">
            <div className="flex items-center text-gray-500">
              <CalendarOutlined className="mr-1" />
              <span>Due: {moment(project.dueDate).format("DD MMM YYYY")}</span>
            </div>
            <div className="text-gray-500">
              <span>Semester: {project.semester}</span>
            </div>
          </div>
        </Card>
      </Link>
    </div>
  );
};

export default ProjectCard;
