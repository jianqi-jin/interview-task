/**
 * @file constant
 * @author jjq
 * @description constant
 */

export enum StoryStatus {
  Init,
  Pending,
  Pass,
  NotPass
};

export const StoryStatusText = {
  [StoryStatus.Init]: '未知（不可选）',
  [StoryStatus.Pending]: '待审核',
  [StoryStatus.Pass]: '通过',
  [StoryStatus.NotPass]: '不通过'
};

export const TagColor = {
  [StoryStatus.Init]: 'default',
  [StoryStatus.Pending]: 'default',
  [StoryStatus.Pass]: 'success',
  [StoryStatus.NotPass]: 'error'
};
