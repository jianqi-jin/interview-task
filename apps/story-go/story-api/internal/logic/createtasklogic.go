package logic

import (
	"context"
	"task-api/internal/dao/db"
	"task-api/internal/dao/model/model"
	"task-api/internal/svc"
	"task-api/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type CreateTaskLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewCreateTaskLogic(ctx context.Context, svcCtx *svc.ServiceContext) *CreateTaskLogic {
	return &CreateTaskLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func newTaskInstance(task *types.Task) *model.Task {
	res := &model.Task{}
	res.Status = int32(types.TaskStatusInit)
	res.Name = task.Name
	res.Description = task.Description
	res.Data = task.Data
	//res.AudioLink = task.AudioLink
	return res
}

func (l *CreateTaskLogic) CreateTask(req *types.TaskRequest) (resp *types.TaskResponse, err error) {
	// todo: add your logic here and delete this line
	e := db.Q.WithContext(l.ctx).Task.Create(newTaskInstance(&req.Task))
	if e != nil {
		return nil, e
	}
	return &types.TaskResponse{Message: "", Data: req.Task}, nil
}
