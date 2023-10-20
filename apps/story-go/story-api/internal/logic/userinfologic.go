package logic

import (
	"context"
	"task-api/internal/svc"
	"task-api/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type UserInfoLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewUserInfoLogic(ctx context.Context, svcCtx *svc.ServiceContext) *UserInfoLogic {
	return &UserInfoLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *UserInfoLogic) UserInfo() (resp *types.UserResponse, err error) {
	// todo: add your logic here and delete this line
	value := l.ctx.Value("payload")
	if value == nil {
		return &types.UserResponse{Status: int32(types.UserStatusFail)}, nil
	}
	return &types.UserResponse{User: types.User{Username: value.(string)}}, nil
}
