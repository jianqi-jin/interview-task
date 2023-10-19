'use client';
/**
 * @file CreateStory
 * @author jjq
 * @description CreateStory
 */

import Modal from "@/components/Modal";
import styles from "./index.module.scss";
import React, { Dispatch, ForwardedRef, MutableRefObject, SetStateAction, useState } from "react";
// import Button, { BtnType } from "@/components/Button";
import { Button, Form, Input, message } from 'antd';
import TextArea from "antd/es/input/TextArea";
import { storiesApi } from 'idl/dist/index';
import AppContext from "@/store";
import { Story } from "idl/dist/idl/storyComponents";
import Upload from "@/components/Upload";

interface CreateStoryProps {
  editInfo?: Story;
  setEditInfo?: Dispatch<SetStateAction<Story | undefined>>;
}

const WrappedCreateStory = React.forwardRef(function CreateStory({
  editInfo,
  setEditInfo,
}: CreateStoryProps, ref: ForwardedRef<{ setIsOpen: any; }>) {
  const { fetchStories } = AppContext.useContainer();
  const [isOpen, setIsOpen] = useState(false);
  const handleCreate = () => {
    setIsOpen(true);
  };
  // @ts-ignore
  ref && (ref.current = {
    setIsOpen
  });
  const handleSubmit = async (values: Story) => {
    try {
      let api = editInfo ? storiesApi.updateStory : storiesApi.createStory;
      const res = await api({
        story: {
          ...editInfo,
          ...values
        }
      });
      message.success('操作成功');
      fetchStories();
      setIsOpen(false);
    }
    catch (e) {
      // @ts-ignore
      message.error(e?.message || '网络错误');
    }
  };

  function onModalClose() {
    setIsOpen(false);
    setTimeout(() => {
      setEditInfo && setEditInfo(undefined);
    }, 6e2);
  }
  return (
    <div className={styles.CreateStoryWrapper}>
      <button
        onClick={handleCreate}
        className="cursor-pointer bg-gradient-to-r from-teal-400 to-blue-500 hover:from-pink-500 hover:to-orange-500 text-white font-semibold px-6 py-2 rounded-md"
      >
        Create
      </button>
      <Modal
        title={`Story ${editInfo ? 'editing' : 'creating'}...`}
        isOpen={isOpen}
        onClose={onModalClose}
      >
        <div className="mt-2">
          <p className="text-sm text-gray-500">
            请填写故事内容
          </p>
        </div>
        
        <div className="mt-4">
          <Form
            onFinish={handleSubmit}
            initialValues={editInfo}
            labelCol={{ span: 6 }}
            layout="vertical"
          >
            <div style={{ display: 'none' }}>
              <Form.Item
                label="id"
                name="id"
              />
            </div>
            <Form.Item
              label="name"
              name="name"
              required
              rules={[{ required: true, message: '此项必填' }]}
            >
              <Input placeholder="请填写name" />
            </Form.Item>
            <Form.Item
              label="description"
              name="description"
              required
              rules={[{ required: true, message: '此项必填' }]}
            >
              <Input placeholder="请填写描述" />
            </Form.Item>
            <Form.Item
              label="story"
              name="data"
              rules={[{ required: true, message: '此项必填' }]}
              required
            >
              <TextArea placeholder="请填写故事内容" rows={10}></TextArea>
            </Form.Item>
            <Form.Item
              label="audio file"
              name="audio_link"
            >
              <Upload />
            </Form.Item>
            <Button type="primary" htmlType="submit">Submit</Button>
          </Form>
        </div>
      </Modal>
    </div>
  );
});

export default WrappedCreateStory;