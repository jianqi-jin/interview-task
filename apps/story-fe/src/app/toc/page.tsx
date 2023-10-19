"use client";
/**
 * @file Toc
 * @author jjq
 * @description Toc
 */

import { useEffect, useState } from 'react';
import styles from './index.module.scss';
import { storiesApi } from 'idl';

interface TocProps {};

const Toc: React.FC<TocProps> = () => {
  const [story, setStory] = useState('');
  const fetchStory = () => {
    storiesApi.story({} as any).then(res => {
      setStory(res.data?.data || '');
    });
  }
  useEffect(() => {
    fetchStory();
  }, []);
  return <div className={`${styles.TocWrapper} p-4`}>
    <div className={styles.story}>
      {story}
    </div>
    <div className={styles.btn}>
      <div className={`${styles.btnFull} shadow-sm text-center border`} onClick={fetchStory}>
        下一篇
      </div>
    </div>
  </div>;
};

export default Toc;