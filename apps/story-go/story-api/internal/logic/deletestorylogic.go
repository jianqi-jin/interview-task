package logic

import (
	"context"
	"story-api/internal/dao/db"
	"story-api/internal/dao/model/model"

	"story-api/internal/svc"
	"story-api/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type DeleteStoryLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewDeleteStoryLogic(ctx context.Context, svcCtx *svc.ServiceContext) *DeleteStoryLogic {
	return &DeleteStoryLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *DeleteStoryLogic) DeleteStory(req *types.StoryRequest) (resp *types.StoryResponse, err error) {
	// todo: add your logic here and delete this line
	_, err = db.Q.WithContext(l.ctx).Story.Where(db.Q.Story.ID.Eq(req.Story.Id)).Delete(&model.Story{})
	if err != nil {
		return nil, err
	}
	return &types.StoryResponse{Message: "删除成功"}, nil
}
