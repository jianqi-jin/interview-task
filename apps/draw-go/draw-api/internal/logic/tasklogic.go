package logic

import (
	"context"
	"task-api/internal/dao/db"
	"task-api/internal/dao/model/model"

	"task-api/internal/svc"
	"task-api/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type TaskLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewTaskLogic(ctx context.Context, svcCtx *svc.ServiceContext) *TaskLogic {
	return &TaskLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *TaskLogic) Task(req *types.TaskDetailRequest) (resp *types.TaskResponse, err error) {
	// todo: add your logic here and delete this line
	var task model.Task
	if req.Id != 0 {
		db.Db.Where(db.Q.Task.ID.Eq(req.Id)).Limit(1).Find(&task)
	} else {
		db.Db.Order("RAND()").Limit(1).Find(&task)
	}
	return &types.TaskResponse{Message: "", Data: *svc.BuildTask(&task)}, nil
}
