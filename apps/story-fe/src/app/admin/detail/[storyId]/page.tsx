"use client";
/**
 * @file DetailPage
 * @author jjq
 * @description DetailPage
 */

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import styles from "./index.module.scss";
import { useEffect, useState } from "react";
import { storiesApi } from "idl/dist/index";
import { Story } from "idl/dist/idl/storyComponents";
import { Button, Col, Row, Spin, message } from "antd";
import { getFileMd5, upload } from "@/utils/upload";
import { RcFile } from "antd/es/upload";

interface DetailPageProps {
  params: { storyId: string };
}

const DetailPage: React.FC<DetailPageProps> = ({ params }) => {
  const { storyId } = params;
  const query = useSearchParams();
  const router = useRouter();
  const path = usePathname();
  const [story, setStory] = useState<Story>();
  const [messageApi] = message.useMessage();
  const [loading, setLoading] = useState(false);
  const fetchDetail = () => {
    setLoading(true);
    storiesApi
      .story({
        id: Number(storyId),
        random: false
      })
      .then((res) => {
        setStory(res.data);
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
  }, [storyId]);
  const handleGenerateAudio = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/v1/text2speech", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: story?.data || "",
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
      await storiesApi.updateStory({
        story: {
          ...story,
          audio_link: `/audio/${tmpKey}`,
        },
      });
    } catch (e) {
      messageApi.error((e as string) || "生成失败");
    } finally {
      setLoading(false);
      fetchDetail();
    }
    // storiesApi.textToSpeech({}).then((res) => {
    //   console.log("jjq debug res", res);
    // });
  };
  return (
    <div className={styles.DetailPageWrapper}>
      <Spin spinning={loading}>
        <Button onClick={handleGenerateAudio}>生成语音</Button>
        <ul className="w-[800px] mx-auto">
          {story &&
            Object.keys(story).map((key) => {
              const value = story[key as keyof Story];
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
        </ul>
      </Spin>
    </div>
  );
};

export default DetailPage;
