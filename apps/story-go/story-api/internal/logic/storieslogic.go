package logic

import (
	"context"
	"github.com/zeromicro/go-zero/core/logx"
	"story-api/internal/dao/db"
	"story-api/internal/dao/model/model"
	"story-api/internal/svc"
	"story-api/internal/types"
)

type StoriesLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewStoriesLogic(ctx context.Context, svcCtx *svc.ServiceContext) *StoriesLogic {
	return &StoriesLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *StoriesLogic) Stories(ctx context.Context, req *types.StoriesRequest) (resp *types.StoriesResponse, err error) {
	// todo: add your logic here and delete this line
	//list = append(list, types.Story{
	//	Id:   12,
	//	Name: "asd",
	//})
	//storiesModel := db.NewStoriesModel(db2.SqlConn)
	//storiesModel.FindOne()
	var instances []*model.Story
	instances, err = db.Q.WithContext(ctx).Story.Order(db.Q.Story.CreateTime.Desc()).Find()
	if err != nil {
		return nil, err
	}
	var list []types.Story
	for i := range instances {
		instance := instances[i]
		tmp := svc.BuildStory(instance)
		//audioUrl, _ := svc.GetObjectUrl(tmp.AudioLink)
		list = append(list, *tmp)
	}
	res := &types.StoriesResponse{
		Message: "",
		Data:    list,
	}
	return res, nil
}
