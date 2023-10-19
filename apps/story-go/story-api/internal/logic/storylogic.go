package logic

import (
	"context"
	"story-api/internal/dao/db"
	"story-api/internal/dao/model/model"

	"story-api/internal/svc"
	"story-api/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type StoryLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewStoryLogic(ctx context.Context, svcCtx *svc.ServiceContext) *StoryLogic {
	return &StoryLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *StoryLogic) Story(req *types.StoryDetailRequest) (resp *types.StoryResponse, err error) {
	// todo: add your logic here and delete this line
	var story model.Story
	if req.Id != 0 {
		db.Db.Where(db.Q.Story.ID.Eq(req.Id)).Limit(1).Find(&story)
	} else {
		db.Db.Order("RAND()").Limit(1).Find(&story)
	}
	return &types.StoryResponse{Message: "", Data: *svc.BuildStory(&story)}, nil
}
