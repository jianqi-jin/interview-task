"use client";
/**
 * @file Dashboard
 * @author jjq
 * @description Dashboard
 */

import AppContext from "@/store";
import styles from "./index.module.scss";
import CreateTask from "./CreateTask";
import {
  Button,
  Image,
  Select,
  Space,
  Spin,
  Table,
  Tag,
  Tooltip,
  Typography,
} from "antd";
import { ColumnsType } from "antd/es/table";
import { useEffect, useRef, useState } from "react";
import { tasksApi } from "idl";
import { TaskStatus, TaskStatusText, TagColor } from "@/constant";
import confirm from "antd/es/modal/confirm";
import { Task } from "idl/dist/idl/taskComponents";
import { useRouter } from "next/navigation";

interface DashboardProps {}

const statusOptions = Object.keys(TaskStatusText).map((item) => {
  const value = +item as TaskStatus;
  const label = TaskStatusText[value];
  return {
    id: value,
    value,
    label,
  };
});

const Dashboard: React.FC<DashboardProps> = () => {
  const { count, setCount, tasksLoading, fetchStories, tasks } =
    AppContext.useContainer();
  const [editInfo, setEditInfo] = useState<Task>();
  const createRef = useRef({
    setIsOpen: (val: boolean) => {},
  });
  useEffect(() => {
    fetchStories();
  }, []);
  const router = useRouter();
  const columns: ColumnsType<Task> = [
    {
      key: "id",
      title: "id",
      dataIndex: "id",
    },
    {
      key: "name",
      title: "name",
      dataIndex: "name",
    },
    {
      key: "description",
      title: "description",
      width: 200,
      dataIndex: "description",
      render: (val) => {
        return (
          <Typography.Paragraph
            className={styles.task}
            ellipsis={{
              rows: 2,
              tooltip: {
                overlayClassName: styles.taskTooltip,
              },
            }}
          >
            {val}
          </Typography.Paragraph>
        );
      },
    },
    // {
    //   key: "task",
    //   title: "task",
    //   dataIndex: "data",
    //   width: 200,
    //   render: (val) => {
    //     return (
    //       <Typography.Paragraph
    //         className={styles.task}
    //         ellipsis={{
    //           rows: 2,
    //           tooltip: {
    //             overlayClassName: styles.taskTooltip,
    //           },
    //         }}
    //       >
    //         {val}
    //       </Typography.Paragraph>
    //     );
    //   },
    // },
    {
      key: "img_url",
      title: "img_url",
      dataIndex: "img_url",
      render: (val, record) => {
        return (
          <div>
            <Image width={80} src={record.img_url} alt="" />
          </div>
        );
      },
    },
    // {
    //   key: "status",
    //   title: "status",
    //   dataIndex: "status",
    //   render: (status: TaskStatus, values) => {
    //     return (
    //       <>
    //         <Select
    //           bordered={false}
    //           // showArrow={false}
    //           style={{ width: 150 }}
    //           value={status}
    //           onChange={async (val) => {
    //             try {
    //               await tasksApi.updateTask({
    //                 task: {
    //                   ...values,
    //                   status: val,
    //                 },
    //               });
    //             } finally {
    //               fetchStories();
    //             }
    //           }}
    //         >
    //           {statusOptions.map((item) => (
    //             <Select.Option
    //               key={item.id}
    //               title={item.label}
    //               value={item.value}
    //             >
    //               <div>
    //                 <Tag color={TagColor[item.value as TaskStatus]}>
    //                   {item.label}
    //                 </Tag>
    //               </div>
    //             </Select.Option>
    //           ))}
    //         </Select>
    //       </>
    //     );
    //   },
    // },
    // {
    //   key: "updateTime",
    //   title: "updateTime",
    //   dataIndex: "updateTime",
    // },
    {
      key: "create_time",
      title: "create_time",
      dataIndex: "create_time",
      render: (time) => <>{new Date(time * 1e3).toLocaleString()}</>,
    },
    {
      key: "action",
      title: "task",
      dataIndex: "data",
      render: (_, rows) => {
        return (
          <>
            <Space size={4}>
              <Button
                type="primary"
                key="edit"
                onClick={() => {
                  setEditInfo(rows);
                  // @ts-ignore
                  createRef.current?.setIsOpen &&
                    createRef.current.setIsOpen(true);
                }}
              >
                编辑
              </Button>
              <Button
                type="primary"
                key="delete"
                onClick={() => {
                  confirm({
                    onOk: async () => {
                      try {
                        await tasksApi.deleteTask({ task: rows });
                      } finally {
                        fetchStories();
                      }
                    },
                    onCancel: () => {},
                    content: "确定删除吗？",
                    okText: "确定删除",
                    cancelText: "点错了",
                  });
                }}
              >
                删除
              </Button>
              <Button
                key="detail"
                onClick={() => router.push(`/admin/detail/${rows.id}`)}
              >
                详情
              </Button>
            </Space>
          </>
        );
      },
    },
  ];
  return (
    <div className={`${styles.dashboard}`}>
      {/* <h1 className="text-3xl font-bold underline">Stories Dashboard</h1> */}
      <CreateTask
        // @ts-ignore
        ref={createRef}
        editInfo={editInfo}
        setEditInfo={setEditInfo}
      />
      <div className="rounded-md overflow-hidden border border-black/5 p-8">
        <Spin spinning={tasksLoading}>
          <Table
            columns={columns}
            rowKey={(row) => String(row.id)}
            dataSource={tasks}
          />
        </Spin>
      </div>
    </div>
  );
};

export default Dashboard;
