import React, { useEffect, useRef, useState } from "react";
import { InboxOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import { getFileMd5, upload } from "@/utils/upload";
import { RcFile } from "antd/es/upload";

const { Dragger } = Upload;

const MyUpload: React.FC<{ value?: string; onChange?: any; onSuccess?: (key: string) => void }> = ({
  onChange,
  value,
  onSuccess
}) => {
  const [fileList, setFileList] = useState<any[]>(value ? [{ 
    uid: '-1',
    name: value,
    status: 'done',
    // url: value,
   }] : []);
  const stateRef = useRef({
    onChange: (str: string) => {}
  });
  useEffect(() => {
    stateRef.current.onChange = onChange;
  }, [onChange]);
  const handleUpload: (options: any) => void = async ({ file, onProgress, onError, onSuccess: onSuc }) => {
    try {
      if (!file) {
        return;
      }
      const key = await getFileMd5(file as RcFile);
      const bindedKey = `/audio/${key}`;
      stateRef.current.onChange?.(bindedKey);
      await upload({
        key,
        file: file as RcFile,
        onProgress,
      });
      onSuc?.({});
      onSuccess?.(bindedKey);
    } catch (e) {
      console.error(e);
      onError?.(e as any);
    }
  };
  return (
    <Dragger
      name="file"
      multiple={false}
      fileList={fileList}
      action=""
      customRequest={handleUpload}
      onChange={async (info) => {
        let newFileList = [info.file];
        setFileList(newFileList);
        const { status } = info.file;
        if (status !== "uploading") {
          console.log(info.file, info.fileList);
        }
        if (status === "done") {
          message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === "error") {
          message.error(`${info.file.name} file upload failed.`);
        }
      }}
      onDrop={(e) => {
        console.log("Dropped files", e.dataTransfer.files);
      }}
    >
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">
        Click or drag file to this area to upload
      </p>
      <p className="ant-upload-hint">
        Support for a single or bulk upload. Strictly prohibited from uploading
        company data or other banned files.
      </p>
    </Dragger>
  );
};

export default MyUpload;
