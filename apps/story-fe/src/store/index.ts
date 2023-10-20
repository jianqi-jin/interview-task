'use client'
import { message } from 'antd';
import { tasksApi } from 'idl/dist/index';
import { Task } from 'idl/dist/idl/taskComponents';
/**
 * @file store/index.ts
 * @author jjq
 * @description store/index.ts
 */

import { useEffect, useState } from 'react';
import { createContainer } from 'unstated-next';
import { useCookieState } from 'ahooks';
import { UserStatus } from '@/interface';
import { usePathname } from 'next/navigation';

const useAppContext = () => {
  const [count, setCount] = useState(0);
  const [userName, setUserName] = useState('');
  const path = usePathname();
  const [jwt, setJwt] = useCookieState("jwt", {
    defaultValue: "",
  });
  const goLanding = () => {
    path !== '/landing' && (location.href = '/landing');
  };
  useEffect(() => {
    tasksApi.userInfo().then(res => {
      if (res.status === UserStatus.Success) {
        setUserName(res?.user?.username || '');
      } else {
        goLanding();
      }
    }).catch(e => {
      goLanding();
    })
  }, []);
  const [showLogin, setShowLogin] = useState(false);
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
    tasksLoading,
    setShowLogin,
    showLogin,
    jwt, setJwt,
    userName
  };
};

const AppContext = createContainer(useAppContext);

export default AppContext;
