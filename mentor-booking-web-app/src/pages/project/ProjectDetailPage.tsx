import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { ProjectType } from '../../types/project.type';
import ProjectCard from '../../components/project/ProjectCard';
import StudentProjectList from '../../components/user/student/StudentProjectList';
import { Button, Modal, Select } from 'antd';
import { projectService } from '../../services/projectService';
import { StudentType } from '../../types/user.types';
import { debounce } from 'lodash'
import { studentService } from '../../services/studentService';

export const ProjectDetailPage = () => {
    const { id } = useParams();
    const [project, setProject] = useState<ProjectType>();
    const [students, setStudents] = useState<StudentType[]>([]);
    const [searchStudent, setSearchStudent] = useState<StudentType[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState<string | undefined>(undefined);

    useEffect(() => {
        handleGetProject();
    }, [id]);

    const handleGetProject = async () => {
        try {
            if (id) {
                const res = await projectService.getProjectById(id);
                setProject(res.responseRequestModel.project);
                setStudents(res.responseRequestModel.students);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        console.log('Adding student:', selectedStudent, 'to project ID:', project?.id);
        // Thực hiện API thêm sinh viên vào dự án ở đây

        // Đóng modal sau khi thực hiện
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    // Gọi API tìm kiếm sinh viên
    const fetchStudents = async (searchValue: string) => {
        try {
            const response = await studentService.searchStudent(searchValue);
            setSearchStudent(response.students);
        } catch (error) {
            console.error("Failed to search students:", error);
        }
    };

    // Debounce để giảm số lần gọi API khi tìm kiếm
    const handleSearch = useCallback(
        debounce((value: string) => {
            if (value) {
                fetchStudents(value);
            } else {
                setSearchStudent([]); // Xóa kết quả khi không có từ khóa
            }
        }, 500), // 500ms debounce time
        []
    );

    return (
        <div className='p-10'>
            {project ? (
                <>
                    <div className='flex w-full gap-5'>
                        <ProjectCard project={project} />
                        <div>
                            <Button type="primary" onClick={showModal}>Add Member</Button>
                        </div>
                    </div>
                    <StudentProjectList students={students} />
                </>
            ) : (
                <>Project not found</>
            )}
            <Modal title="Add Member" open={isModalOpen} onCancel={handleCancel} footer={null}>
                <div className="flex flex-col">
                    <div className="mt-4">
                        <label className="mb-2">Search Student:</label>
                        <Select
                            showSearch
                            placeholder="Search for a student"
                            value={selectedStudent}
                            onSearch={handleSearch} // Gọi hàm debounce khi gõ tìm kiếm
                            onChange={(value) => setSelectedStudent(value)}
                            style={{ width: '100%' }}
                            filterOption={false} // Disable the default filtering behavior
                        >
                            {searchStudent.map(student => (
                                <Select.Option key={student.id} value={student.id}>
                                    {`${student.fullName} (${student.email})`}
                                </Select.Option>
                            ))}
                        </Select>
                    </div>
                    <div className="mt-4">
                        <Button type="primary" onClick={handleOk}>Add Member</Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};
