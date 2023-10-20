"use client";
/**
 * @file Toc
 * @author jjq
 * @description Toc
 */

import { useEffect, useState } from 'react';
import styles from './index.module.scss';
import { tasksApi } from 'idl';

interface TocProps {};

const Toc: React.FC<TocProps> = () => {
  const [task, setTask] = useState('');
  const fetchTask = () => {
    tasksApi.task({} as any).then(res => {
      setTask(res.data?.data || '');
    });
  }
  useEffect(() => {
    fetchTask();
  }, []);
  return <div className={`${styles.TocWrapper} p-4`}>
    <div className={styles.task}>
      {task}
    </div>
    <div className={styles.btn}>
      <div className={`${styles.btnFull} shadow-sm text-center border`} onClick={fetchTask}>
        下一篇
      </div>
    </div>
  </div>;
};

export default Toc;