package logic

import (
	"context"
	"task-api/internal/dao/db"
	"task-api/internal/dao/model/model"

	"task-api/internal/svc"
	"task-api/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type DeleteTaskLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewDeleteTaskLogic(ctx context.Context, svcCtx *svc.ServiceContext) *DeleteTaskLogic {
	return &DeleteTaskLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *DeleteTaskLogic) DeleteTask(req *types.TaskRequest) (resp *types.TaskResponse, err error) {
	// todo: add your logic here and delete this line
	_, err = db.Q.WithContext(l.ctx).Task.Where(db.Q.Task.ID.Eq(req.Task.Id)).Delete(&model.Task{})
	if err != nil {
		return nil, err
	}
	return &types.TaskResponse{Message: "删除成功"}, nil
}
