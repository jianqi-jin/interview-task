'use client'
import { message } from 'antd';
import { storiesApi } from 'idl/dist/index';
import { Story } from 'idl/dist/idl/storyComponents';
/**
 * @file store/index.ts
 * @author jjq
 * @description store/index.ts
 */

import { useState } from 'react';
import { createContainer } from 'unstated-next';

const useAppContext = () => {
  const [count, setCount] = useState(0);
  const [storiesLoading, setStoriesLoading] = useState(true);
  const [stories, setStories] = useState<Story[]>([]);
  const fetchStories = () => {
    setStoriesLoading(true);
    storiesApi.stories({}).then(res => {
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
    stories,
    storiesLoading
  };
};

const AppContext = createContainer(useAppContext);

export default AppContext;
