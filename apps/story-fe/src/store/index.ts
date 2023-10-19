'use client'
import { message } from 'antd';
import { tasksApi } from 'idl/dist/index';
import { Task } from 'idl/dist/idl/taskComponents';
/**
 * @file store/index.ts
 * @author jjq
 * @description store/index.ts
 */

import { useState } from 'react';
import { createContainer } from 'unstated-next';

const useAppContext = () => {
  const [count, setCount] = useState(0);
  const [tasksLoading, setStoriesLoading] = useState(true);
  const [tasks, setStories] = useState<Task[]>([]);
  const fetchStories = () => {
    setStoriesLoading(true);
    tasksApi.tasks({}).then(res => {
      setStories(res?.data || []);
    }).catch(e => {
      message.error(e.message || '网络错误');
    }).finally(() => {
      setStoriesLoading(false);
    });
  };
  return {
    count,
    setCount,
    fetchStories,
    tasks,
    tasksLoading
  };
};

const AppContext = createContainer(useAppContext);

export default AppContext;
