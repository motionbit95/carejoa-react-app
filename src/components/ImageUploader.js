import React, { useState } from "react";
import { Space, Upload, message } from "antd";
import axios from "axios";
import { AiOutlinePicture } from "react-icons/ai";
import apiClient from "../api";

const ImageUploader = ({ onUpload }) => {
  const [fileList, setFileList] = useState([]);

  const uploadFileToServer = async (file) => {
    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      return new Promise((resolve, reject) => {
        reader.onload = async () => {
          const base64String = reader.result.split(",")[1]; // Base64 변환
          const response = await apiClient.post(`/upload`, {
            fileName: file.name,
            fileBase64: base64String,
          });
          resolve(response.data);
          onUpload(response.data);
        };
        reader.onerror = (error) => reject(error);
      });
    } catch (error) {
      console.error("Upload failed:", error);
      message.error("Upload failed!");
    }
  };

  const onChange = async ({ fileList: newFileList }) => {
    setFileList(newFileList);

    const lastFile = newFileList[newFileList.length - 1];
    if (lastFile && lastFile.originFileObj) {
      const uploadedFile = await uploadFileToServer(lastFile.originFileObj);
      if (uploadedFile) {
        setFileList((prevList) =>
          prevList.map((file) =>
            file.uid === lastFile.uid
              ? { ...file, url: uploadedFile.url, status: "done" }
              : file
          )
        );
      }
    }
  };

  return (
    <div
      style={{
        display: "flex",
      }}
    >
      <Upload listType="picture-card" fileList={fileList} onChange={onChange}>
        {fileList.length < 5 && (
          <div>
            <AiOutlinePicture size={16} />
            <div>{fileList.length}/5</div>
          </div>
        )}
      </Upload>
    </div>
  );
};

export default ImageUploader;
