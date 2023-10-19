"use client";
/**
 * @file DetailPage
 * @author jjq
 * @description DetailPage
 */

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import styles from "./index.module.scss";
import { useEffect, useRef, useState } from "react";
import { tasksApi } from "idl/dist/index";
import { Task } from "idl/dist/idl/taskComponents";
import { Button, Col, Row, Space, Spin, message } from "antd";
import { getFileMd5, upload } from "@/utils/upload";
import { RcFile } from "antd/es/upload";
import MyUpload from "@/components/Upload";
import { useRequest } from "ahooks";

interface DetailPageProps {
  params: { taskId: string };
}

const DetailPage: React.FC<DetailPageProps> = ({ params }) => {
  const { taskId } = params;
  const query = useSearchParams();
  const router = useRouter();
  const path = usePathname();
  const [task, setTask] = useState<Task>();
  const [messageApi] = message.useMessage();
  const [loading, setLoading] = useState(false);
  const fetchDetail = () => {
    setLoading(true);
    tasksApi
      .task({
        id: Number(taskId),
        random: false,
      })
      .then((res) => {
        setTask(res.data);
      })
      .catch((e) => {
        messageApi.open({
          type: "error",
          content: e || "请求失败",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    fetchDetail();
  }, [taskId]);
  const handleGenerateAudio = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/v1/text2speech", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: task?.data || "",
        }),
      });
      const tmpBlob = (await res.blob()) as RcFile;
      const tmpKey = await getFileMd5(tmpBlob);
      const uploadRes = await upload({
        key: tmpKey,
        file: tmpBlob,
        onProgress: () => {},
      });
      console.log("jjq debug uploadRes", uploadRes);
      await tasksApi.updateTask({
        task: {
          ...task,
          audio_link: `/audio/${tmpKey}`,
        },
      });
    } catch (e) {
      messageApi.error((e as string) || "生成失败");
    } finally {
      setLoading(false);
      fetchDetail();
    }
    // tasksApi.textToSpeech({}).then((res) => {
    //   console.log("jjq debug res", res);
    // });
  };
  const [showUpload, setShowUpload] = useState(false);
  const handleImgChangeService = (img: string) => {
    setShowUpload(false);
    updateImg(`https://audio.compencat.com${img}`);
    return tasksApi.updateTask({
      task: {
        ...task,
        ori_img_key: img,
      },
    });
  };
  useEffect(() => {
    console.log(task?.img_url);
    updateImg(task?.img_url);
  }, [task]);
  const { run: handleImgChange, loading: updating } = useRequest(
    handleImgChangeService,
    {
      manual: true,
    }
  );
  const canvasRef = useRef<HTMLCanvasElement>();
  const updateImg = (imgUrl: string) => {
    const ctx = canvasRef.current?.getContext("2d");
    const img = new Image();
    img.onload = () => {
      ctx?.drawImage(img, 0, 0);
    };
    img.src = imgUrl;
  };
  return (
    <div className={styles.DetailPageWrapper}>
      <Spin spinning={loading || updating}>
        {/* <Button onClick={handleGenerateAudio}>生成语音</Button> */}
        {/* <ul className="w-[800px] mx-auto">
          {task &&
            Object.keys(task).map((key) => {
              const value = task[key as keyof Task];
              return (
                <Row
                  className="shadow-lg rounded-lg mb-5 p-3 overflow-scroll"
                  key={key}
                >
                  <Col span={4}>{key}</Col>
                  <Col span={20}>{value}</Col>
                </Row>
              );
            })}
        </ul> */}
        <canvas width={800} height={800} ref={canvasRef}></canvas>
        <Space size={8}>
          <Button type="primary" onClick={handleGenerateAudio}>
            Save Task
          </Button>
          {showUpload ? (
            <MyUpload onSuccess={handleImgChange} />
          ) : (
            <Button onClick={() => setShowUpload(true)}>Upload Image</Button>
          )}
        </Space>
      </Spin>
    </div>
  );
};

export default DetailPage;
