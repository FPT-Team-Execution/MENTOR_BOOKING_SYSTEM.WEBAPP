import { useRequest } from "ahooks";
import { useAuth } from "../../auth/AuthContext"
import axiosInstance from "../../utils/axios/axiosInstance";
import { ResponseRequestModel } from "../../types/common.types";
import { GetMentorResModel } from "../../types/mentor.types";
import { MENTOR_OWN_PROFILE_URL, UPLOAD_AVATAR_URL } from "../../utils/apiUrl/baseUrl";
import { Button, Card, DatePicker, Form, Image, Input } from "antd";
import { useState } from "react";
import moment from "moment";
import ImageUploadButton from "../ui/ImageUploadButton";


const UserProfileCard = () => {
    const { userInfo } = useAuth();
    const [form] = Form.useForm<GetMentorResModel>();
    const [mentorProfile, setMentorProfile] = useState<GetMentorResModel>();
    const [avatarUrl, setAvatarUrl] = useState<string>();

    const { loading } = useRequest(async () => {
        switch (userInfo?.role) {
            case ("Mentor"): {
                try {
                    const response = await axiosInstance.get<ResponseRequestModel<GetMentorResModel>>(MENTOR_OWN_PROFILE_URL);
                    setInitialFormValues(response.data.responseRequestModel);
                    setMentorProfile(response.data.responseRequestModel);
                    console.log(response.data.responseRequestModel);
                    setAvatarUrl(response.data.responseRequestModel.avatarUrl);
                } catch (error) {
                    console.log(error);
                }
                break;
            }
            case ("Student"): {
                break;
            }
            case ("Admin"): {
                break;
            }
        }

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
        })
    }

    const handleSubmit = () => {

    }

    const handleRefreshAvatarUrl = (newUrl: string) => {
        setAvatarUrl(newUrl)
    }

    return (
        <div className="flex items-center justify-center gap-6 p-4">

            <div className="w-6/12">
                <Card
                    loading={loading}
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

                        <Form.Item
                            label="ConsumePoint"
                            name="consumePoint"
                            rules={[{ required: true, message: 'Please input the email!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Birthday"
                            name="birthday"
                            rules={[{ required: true, message: 'Please input the birthday!' }]}
                        >
                            <DatePicker />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit">
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
                    <div className="flex flex-col justify-center items-center">
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

export default UserProfileCard
