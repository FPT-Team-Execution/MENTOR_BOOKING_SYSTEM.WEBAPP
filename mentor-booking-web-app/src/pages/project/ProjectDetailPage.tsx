/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ProjectType } from '../../types/project.type';
import ProjectCard from '../../components/project/ProjectCard';

const sampleProject: ProjectType = {
    id: 1,
    title: "AI Research Project",
    description: "Research on the application of AI in healthcare.",
    dueDate: "2024-12-01T00:00:00.000Z",
    semester: "Fall 2024",
    createdBy: "John Doe",
    mentorId: "M123",
    status: "Activated",
  };

export const ProjectDetailPage = () => {
    const { id } = useParams();
    const [project,setProject] = useState<ProjectType>();
    useEffect(() => {
        console.log(id)
        setProject(sampleProject)
    }, [])

    return (
        <div className='p-10'>
            <ProjectCard project={project}></ProjectCard>
        </div>
    )
}
