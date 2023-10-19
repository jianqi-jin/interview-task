package logic

import (
	"context"
	"fmt"
	"github.com/zeromicro/go-zero/core/logx"
	"task-api/internal/dao/db"
	"task-api/internal/svc"
	"task-api/internal/types"
)

type UpdateTaskLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewUpdateTaskLogic(ctx context.Context, svcCtx *svc.ServiceContext) *UpdateTaskLogic {
	return &UpdateTaskLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *UpdateTaskLogic) UpdateTask(req *types.TaskRequest) (resp *types.TaskResponse, err error) {
	// todo: add your logic here and delete this line
	res, err := db.Q.Task.WithContext(l.ctx).Where(db.Q.Task.ID.Eq(req.Task.Id)).Updates(svc.BuildTaskDB(&req.Task))
	if err != nil {
		return nil, err
	}
	return &types.TaskResponse{Message: fmt.Sprintf("affected rows: %d", res.RowsAffected), Data: req.Task}, nil
}
