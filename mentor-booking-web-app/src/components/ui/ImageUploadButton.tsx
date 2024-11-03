import { useState } from 'react';
import { Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import type { UploadFile, RcFile } from 'antd/es/upload/interface';
import axiosInstance from '../../utils/axios/axiosInstance';
import { ResponseModel, UploadAvatarResModel } from '../../types/common.types';
import { AxiosError } from 'axios';

interface IProps {
    uploadUrl: string;
    refreshUrl: (newUrl: string) => void;
}

const ImageUploadButton = (props: IProps) => {
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    const handleCustomRequest = async (options: any) => {
        const { onSuccess, onError, file } = options;

        try {
            const formData = new FormData();
            formData.append('file', file as RcFile);

            // Gọi API upload ảnh
            const response = await axiosInstance.post<ResponseModel<UploadAvatarResModel>>(props.uploadUrl, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log(response);
            onSuccess(response.data); // Gọi lại khi upload thành công
            props.refreshUrl(response.data.responseModel.avatarUrl)
            message.success(`${file.name} uploaded successfully`);
        } catch (error) {
            onError(error); // Gọi lại khi upload thất bại
            if (error instanceof AxiosError) {
                message.error(error.response?.data.message);
            }
            console.log(error)
        }
    };

    return (
        <Upload
            className="flex flex-col items-center justify-center"
            customRequest={handleCustomRequest} // Sử dụng customRequest để gọi API
            fileList={fileList}
            onChange={(info) => setFileList(info.fileList.slice(-1))} // Giữ lại 1 file duy nhất
            maxCount={1} // Chỉ cho phép upload 1 file
            listType="picture" // Hiển thị ảnh dưới dạng hình thu nhỏ
        >
            <Button icon={<UploadOutlined />}>Upload Image</Button>
        </Upload>
    );
};

export default ImageUploadButton;
