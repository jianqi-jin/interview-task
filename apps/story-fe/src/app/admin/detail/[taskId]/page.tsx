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
import { Button, Col, Modal, Row, Slider, Space, Spin, message } from "antd";
import { getFileMd5, upload } from "@/utils/upload";
import { RcFile } from "antd/es/upload";
import MyUpload from "@/components/Upload";
import { useRequest } from "ahooks";
import FabricCanvas, { useFabric } from "@/components/Fabric";
import { Image as FabricImage } from "fabric";
import History from "@/components/History";
import { MaskState } from "@/store/Mask";
import { useContainer } from "unstated-next";
import useMessage from "antd/es/message/useMessage";

interface DetailPageProps {
  params: { taskId: string };
}

const DetailPageInner: React.FC<DetailPageProps> = ({ params }) => {
  const { taskId } = params;
  const query = useSearchParams();
  const router = useRouter();
  const path = usePathname();
  const [task, setTask] = useState<Task>();
  const [messageApi, contentHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);
  const {
    maskData,
    setMaskData,
    playMaskData,
    currentStep,
    totalStep,
    isPlaying,
    FabricCanvas,
    canvas,
    canvasRef,
  } = useContainer(MaskState);
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
        console.log(e);
        messageApi.open({
          type: "error",
          content: "Request failed.",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    fetchDetail();
  }, [taskId]);
  const [saveLoading, setSaveLoading] = useState(false);
  const handleSave = () => {
    setSaveLoading(true);
    const json = canvas?.toJSON();
    return tasksApi
      .updateTask({
        task: {
          ...task,
          data: JSON.stringify(json),
        },
      })
      .catch((e) => {
        console.log(e);
        messageApi.open({
          type: "error",
          content: "Internet error.",
        });
      })
      .then(() => {
        messageApi.open({
          type: "success",
          content: "Save success.",
        });
      })
      .finally(() => {
        setSaveLoading(false);
      });
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
    try {
      const json = task?.data || "{}";
      const jsonData = JSON.parse(json);
      canvas?.loadFromJSON(jsonData).then(() => {
        canvas.renderAll();
      });
    } catch (e) {}
  }, [task]);
  const { run: handleImgChange, loading: updating } = useRequest(
    handleImgChangeService,
    {
      manual: true,
    }
  );
  // const canvasRef = useRef<HTMLCanvasElement>(null);
  const updateImg = (imgUrl?: string) => {
    if (!imgUrl) return;
    FabricImage.fromURL(imgUrl).then((oImg: FabricImage) => {
      canvas!.backgroundImage = oImg;
      canvas?.renderAll();
    });
  };
  const handleCanvasChange = (canvasData: any) => {
    console.log("Reading canvas");
    console.log("canvasData", canvasData);
    setMaskData(canvasData);
  };
  const handleClear = () => {
    canvas?.clear();
  };
  const handleDownload = () => {
    let a = document.createElement("a");
    let dt =
      canvas?.toDataURL({
        // @ts-ignore
        format: "png",
        quality: 1,
      }) || "";
    a.href = dt;
    a.download = "canvas.png";
    a.click();
  };
  return (
    <div className={styles.DetailPageWrapper}>
      {contentHolder}
      <Spin spinning={loading || updating || saveLoading}>
        <div className="flex flex-row justify-between">
          <div className="flex flex-col">
            <div>
              {isPlaying ? (
                <div>
                  <h3>
                    Playing {currentStep} / {totalStep}
                  </h3>
                  <Slider value={currentStep} max={totalStep} step={1} />
                </div>
              ) : (
                <></>
              )}
            </div>
            <FabricCanvas
              canvas={canvas}
              canvasRef={canvasRef}
              onChange={handleCanvasChange}
            />
          </div>
          <div className="flex flex-col">
            <History />
            <div className="flex flex-col"></div>
            <Space size={8}>
              <Button type="primary" danger onClick={handleClear}>
                Clear Canvas
              </Button>
              <Button type="primary" onClick={handleSave}>
                Save Task
              </Button>
              <Button type="primary" onClick={playMaskData}>
                Replay process
              </Button>
              <Button type="primary" onClick={handleDownload}>
                Download
              </Button>
              <Modal open={showUpload} onCancel={() => setShowUpload(false)}>
                <MyUpload onSuccess={handleImgChange} />
              </Modal>
              <Button onClick={() => setShowUpload(true)}>Upload Image</Button>
            </Space>
          </div>
        </div>
      </Spin>
    </div>
  );
};
const DetailPage: typeof DetailPageInner = ({ ...args }) => {
  return (
    <MaskState.Provider>
      <DetailPageInner {...args} />
    </MaskState.Provider>
  );
};

export default DetailPage;
