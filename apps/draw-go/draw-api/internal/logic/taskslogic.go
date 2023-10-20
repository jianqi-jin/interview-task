package logic

import (
	"context"
	"github.com/zeromicro/go-zero/core/logx"
	"task-api/internal/dao/db"
	"task-api/internal/dao/model/model"
	"task-api/internal/svc"
	"task-api/internal/types"
)

type TasksLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewTasksLogic(ctx context.Context, svcCtx *svc.ServiceContext) *TasksLogic {
	return &TasksLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *TasksLogic) Tasks(ctx context.Context, req *types.TasksRequest) (resp *types.TasksResponse, err error) {
	// todo: add your logic here and delete this line
	//list = append(list, types.Task{
	//	Id:   12,
	//	Name: "asd",
	//})
	//storiesModel := db.NewTasksModel(db2.SqlConn)
	//storiesModel.FindOne()
	var instances []*model.Task
	instances, err = db.Q.WithContext(ctx).Task.Order(db.Q.Task.CreateTime.Desc()).Find()
	if err != nil {
		return nil, err
	}
	var list []types.Task
	for i := range instances {
		instance := instances[i]
		tmp := svc.BuildTask(instance)
		//audioUrl, _ := svc.GetObjectUrl(tmp.AudioLink)
		list = append(list, *tmp)
	}
	res := &types.TasksResponse{
		Message: "",
		Data:    list,
	}
	return res, nil
}
