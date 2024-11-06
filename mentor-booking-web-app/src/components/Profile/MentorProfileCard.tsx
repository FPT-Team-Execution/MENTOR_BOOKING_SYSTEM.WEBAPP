import { useRequest } from "ahooks";
import axiosInstance from "../../utils/axios/axiosInstance";
import { ResponseModel, ResponseRequestModel } from "../../types/common.types";
import { GetMentorResModel } from "../../types/mentor.types";
import { MENTOR_OWN_PROFILE_URL, UPLOAD_AVATAR_URL } from "../../utils/apiUrl/baseUrl";
import { Button, Card, DatePicker, Form, Image, Input, message, Select } from "antd";
import { useState } from "react";
import moment from "moment";
import ImageUploadButton from "../ui/ImageUploadButton";
import { AxiosError } from "axios";
import { useAuth } from "../../auth/AuthContext";
import { Option } from "antd/es/mentions";


const MentorProfileCard = () => {
    const { userInfo } = useAuth();
    const [form] = Form.useForm<GetMentorResModel>();
    const [avatarUrl, setAvatarUrl] = useState<string>();
    const [profile, setProfile] = useState<GetMentorResModel>();

    const { loading: getLoading } = useRequest(async () => {
        try {
            const response = await axiosInstance.get<ResponseRequestModel<GetMentorResModel>>(MENTOR_OWN_PROFILE_URL);
            setInitialFormValues(response.data.responseRequestModel);
            console.log(response.data.responseRequestModel);
            setAvatarUrl(response.data.responseRequestModel.avatarUrl);
            setProfile(response.data.responseRequestModel)
        } catch (error) {
            console.log(error);
        }
    })

    const { loading: putLoading, runAsync: putRunAsync } = useRequest(async (data: GetMentorResModel) => {

        try {
            const response = await axiosInstance.put<ResponseModel<boolean>>(MENTOR_OWN_PROFILE_URL, data);
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

    const setInitialFormValues = (mentorProfile: GetMentorResModel) => {
        form.setFieldsValue({
            fullName: mentorProfile?.fullName,
            avatarUrl: mentorProfile?.avatarUrl,
            birthday: mentorProfile.birthday ? moment(mentorProfile.birthday) : null,
            consumePoint: mentorProfile?.consumePoint,
            email: mentorProfile?.email,
            industry: mentorProfile?.industry,
            major: mentorProfile?.major,
            userName: mentorProfile?.userName,
            id: mentorProfile.id,
            gender: mentorProfile.gender
        })
    }

    const handleSubmit = async (values: GetMentorResModel) => {
        values.id = userInfo?.nameidentifier ?? ""
        values.email = profile?.email?? ""
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
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Industry"
                            name="industry"
                            rules={[{ required: true, message: 'Please input the email!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <div className="lg:flex justify-between items-center gap-4">
                            <Form.Item
                                label="ConsumePoint"
                                name="consumePoint"
                                rules={[{ required: true, message: 'Please input the email!' }]}
                            >
                                <Input />
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

export default MentorProfileCard
