/**
 * @file constant
 * @author jjq
 * @description constant
 */

export enum TaskStatus {
  Init,
  Pending,
  Pass,
  NotPass
};

export const TaskStatusText = {
  [TaskStatus.Init]: '未知（不可选）',
  [TaskStatus.Pending]: '待审核',
  [TaskStatus.Pass]: '通过',
  [TaskStatus.NotPass]: '不通过'
};

export const TagColor = {
  [TaskStatus.Init]: 'default',
  [TaskStatus.Pending]: 'default',
  [TaskStatus.Pass]: 'success',
  [TaskStatus.NotPass]: 'error'
};
