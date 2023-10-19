package logic

import (
	"context"
	"fmt"
	"github.com/zeromicro/go-zero/core/logx"
	"story-api/internal/dao/db"
	"story-api/internal/svc"
	"story-api/internal/types"
)

type UpdateStoryLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewUpdateStoryLogic(ctx context.Context, svcCtx *svc.ServiceContext) *UpdateStoryLogic {
	return &UpdateStoryLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *UpdateStoryLogic) UpdateStory(req *types.StoryRequest) (resp *types.StoryResponse, err error) {
	// todo: add your logic here and delete this line
	res, err := db.Q.Story.WithContext(l.ctx).Where(db.Q.Story.ID.Eq(req.Story.Id)).Updates(svc.BuildStoryDB(&req.Story))
	if err != nil {
		return nil, err
	}
	return &types.StoryResponse{Message: fmt.Sprintf("affected rows: %d", res.RowsAffected), Data: req.Story}, nil
}
