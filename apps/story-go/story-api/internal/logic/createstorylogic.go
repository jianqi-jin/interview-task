package logic

import (
	"context"
	"story-api/internal/dao/db"
	"story-api/internal/dao/model/model"
	"story-api/internal/svc"
	"story-api/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type CreateStoryLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewCreateStoryLogic(ctx context.Context, svcCtx *svc.ServiceContext) *CreateStoryLogic {
	return &CreateStoryLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func newStoryInstance(story *types.Story) *model.Story {
	res := &model.Story{}
	res.Status = int32(types.StoryStatusInit)
	res.Name = story.Name
	res.Description = story.Description
	res.Data = story.Data
	res.AudioLink = story.AudioLink
	return res
}

func (l *CreateStoryLogic) CreateStory(req *types.StoryRequest) (resp *types.StoryResponse, err error) {
	// todo: add your logic here and delete this line
	e := db.Q.WithContext(l.ctx).Story.Create(newStoryInstance(&req.Story))
	if e != nil {
		return nil, e
	}
	return &types.StoryResponse{Message: "", Data: req.Story}, nil
}
