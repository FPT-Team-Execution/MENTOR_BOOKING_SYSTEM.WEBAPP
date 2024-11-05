/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { Card, Badge } from "antd";
import { CalendarOutlined } from "@ant-design/icons";
import moment from "moment"; // For formatting dates
import 'antd/dist/reset.css'; // Make sure to import Antd CSS
import { ProjectType } from "../../types/project.type";
import { Link } from "react-router-dom";
import { mentorService } from "../../services/mentorService";
import { MentorType } from "../../types/user.types";

type ChildComponentProps = {
  className?: string;
  project: ProjectType;
};

const ProjectCard: React.FC<ChildComponentProps> = ({ project, className }) => {
  const [mentor, setMentor] = useState<MentorType | null>(null);

  const statusColors = {
    Activated: "green",
    Deactivated: "gray",
    Suspended: "red",
    Pending: "yellow",
    Closed: "gray",
  };

  // Fetch mentor data based on mentorId
  useEffect(() => {
    handleGetMentor();
  }, [project.mentorId]);

  const handleGetMentor = async () => {
    if (project.mentorId) {
      const res = await mentorService.getMentor(project.mentorId);
      if (res.isSuccess) {
        setMentor(res.responseModel);
      }
    }
  };

  if (!project) {
    return <div>Project data not available</div>;
  }

  return (
    <div className={`${className} min-w-96 min-h-60`}>
      <Link to={`/project/${project.id}`} className="no-underline">
        <Card className="border border-gray-200 rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-300 mb-6">
          {/* Project Title */}
          <h2 className="text-xl font-semibold text-blue-800 mb-1">
            {project.title}
          </h2>

          {/* Project Status */}
          <Badge
            color={statusColors[project.status]}
            text={project.status}
            className="mb-2 text-sm font-medium"
          />

          {/* Project Description */}
          <p className="text-gray-700 my-3 text-sm text-wrap max-w-96">
          Description: {project.description ? project.description : "No description provided."}
          </p>

          {/* Mentor Info */}
          {mentor && (
            <div className="flex items-center mt-2 mb-4">
              <span className="mr-2">Mentor: </span> 
              <img
                src={mentor.avatarUrl}
                className="w-5 h-5 rounded-full mr-3 border border-gray-200"
              />
              <span className="text-gray-800 text-sm font-medium">{mentor.fullName}</span>
            </div>
          )}

          {/* Due date and semester */}
          <div className="text-xs mt-2">
            <div className="flex items-center text-gray-600 mb-1">
              <CalendarOutlined className="mr-2" />
              <span>Due: {moment(project.dueDate).format("DD MMM YYYY")}</span>
            </div>
            <div className="text-gray-600">
              <span>Semester: {project.semester}</span>
            </div>
          </div>
        </Card>
      </Link>
    </div>
  );
};

export default ProjectCard;
