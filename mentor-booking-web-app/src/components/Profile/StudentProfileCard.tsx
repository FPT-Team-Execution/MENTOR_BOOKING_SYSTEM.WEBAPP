import { useRequest } from "ahooks";
import axiosInstance from "../../utils/axios/axiosInstance";
import { PageRequestModel, PaginationModel, ResponseModel, ResponseRequestModel } from "../../types/common.types";
import { MAJOR_API_URL, STUDENT_OWN_PROFILE_URL, UPLOAD_AVATAR_URL } from "../../utils/apiUrl/baseUrl";
import { Button, Card, DatePicker, Form, Image, Input, message, Select } from "antd";
import { useState } from "react";
import moment from "moment";
import ImageUploadButton from "../ui/ImageUploadButton";
import { AxiosError } from "axios";
import { useAuth } from "../../auth/AuthContext";
import { Option } from "antd/es/mentions";
import { GetStudentResModel } from "../../types/student.types";
import { Major } from "../../types/mentor.types";


const StudentProfileCard = () => {
    const { userInfo } = useAuth();
    const [form] = Form.useForm<GetStudentResModel>();
    const [majors, setMajors] = useState<Major[]>([]);
    const [avatarUrl, setAvatarUrl] = useState<string>();
    const [profile, setProfile] = useState<GetStudentResModel>();

    const { loading: getLoading } = useRequest(async () => {
        try {
            const response = await axiosInstance.get<ResponseModel<GetStudentResModel>>(STUDENT_OWN_PROFILE_URL);
            const pageReq: PageRequestModel = {
                size: 100,
                page: 1,
                sort: ""
            }
            const majorResponse = await axiosInstance.get<ResponseRequestModel<PaginationModel<Major>>>(MAJOR_API_URL(undefined, pageReq))
            setMajors(majorResponse.data.responseRequestModel.items)
            setInitialFormValues(response.data.responseModel);
            console.log(response.data.responseModel);
            setAvatarUrl(response.data.responseModel.avatarUrl);
            setProfile(response.data.responseModel);
        } catch (error) {
            console.log(error);
        }
    })

    const { loading: putLoading, runAsync: putRunAsync } = useRequest(async (data: GetStudentResModel) => {

        try {
            const response = await axiosInstance.put<ResponseModel<boolean>>(STUDENT_OWN_PROFILE_URL, data);
            if (response.data.isSuccess) {
                message.success(response.data.message);
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                message.error(error.response?.data.message)
            }
            console.log(error)
        }

    }, {
        manual: true
    })

    const setInitialFormValues = (studentProfile: GetStudentResModel) => {
        form.setFieldsValue({
            fullName: studentProfile?.fullName,
            avatarUrl: studentProfile?.avatarUrl,
            birthday: studentProfile.birthday ? moment(studentProfile.birthday) : null,
            walletPoint: studentProfile?.walletPoint,
            email: studentProfile?.email,
            university: studentProfile?.university,
            majorId: studentProfile?.majorId,
            userName: studentProfile?.userName,
            id: studentProfile.id,
            gender: studentProfile.gender
        })
    }

    const handleSubmit = async (values: GetStudentResModel) => {
        values.id = userInfo?.nameidentifier ?? ""
        values.walletPoint = profile?.walletPoint ?? 100;
        values.email = profile?.email ?? ""
        await putRunAsync(values)
    }

    const handleRefreshAvatarUrl = (newUrl: string) => {
        setAvatarUrl(newUrl)
    }

    return (
        <div className="flex items-center justify-center gap-6 p-4">

            <div className="w-6/12">
                <Card
                    loading={getLoading}
                    title={"Profile"}
                >
                    <Form className={'w-full'} form={form} onFinish={handleSubmit} layout="vertical">

                        <Form.Item
                            label="Fullname"
                            name="fullName"
                            rules={[{ required: true, message: 'Please input the name!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[{ required: true, message: 'Please input the email!' }]}
                        >
                            <Input readOnly/>
                        </Form.Item>

                        <Form.Item
                            label="University"
                            name="university"
                            rules={[{ required: true, message: 'Please input the university!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <div className="lg:flex justify-between items-center gap-4">
                            <Form.Item
                                label="WalletPoint"
                                name="walletPoint"
                    
                            >
                                <Input readOnly />
                            </Form.Item>

                            <Form.Item
                                className="min-w-36"
                                label="Major"
                                name="majorId"
                                rules={[
                                    { required: true, message: "Please select your major." },
                                ]}
                            >
                                <Select placeholder="Select Major">
                                    {
                                        majors.map((item) => (
                                            <Option value={item.id}>{item.name}</Option>
                                        ))
                                    }
                                </Select>
                            </Form.Item>

                            <Form.Item
                                className="min-w-36"
                                label="Gender"
                                name="gender"
                                rules={[
                                    { required: true, message: "Please select your gender." },
                                ]}
                            >
                                <Select placeholder="Select Gender">
                                    <Option value="male">Male</Option>
                                    <Option value="female">Female</Option>
                                    <Option value="other">Other</Option>
                                </Select>
                            </Form.Item>

                            <Form.Item
                                label="Birthday"
                                name="birthday"
                                rules={[{ required: true, message: 'Please input the birthday!' }]}
                            >
                                <DatePicker />
                            </Form.Item>
                        </div>

                        <Form.Item>
                            <Button loading={putLoading} type="primary" htmlType="submit">
                                Update
                            </Button>
                        </Form.Item>

                    </Form>
                </Card>

            </div>

            <div className="">
                <Card
                    title={"Avatar"}
                >
                    <div className="flex flex-col justify-center items-center gap-4">
                        <div>
                            <Image
                                src={avatarUrl}
                                width={'200px'}
                            />
                        </div>
                        <div>
                            <ImageUploadButton refreshUrl={handleRefreshAvatarUrl} uploadUrl={UPLOAD_AVATAR_URL} />
                        </div>
                    </div>
                </Card>
            </div>

        </div>
    )
}

export default StudentProfileCard
