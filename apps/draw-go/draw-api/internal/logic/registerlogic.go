package logic

import (
	"context"
	"task-api/internal/dao/db"
	"task-api/internal/svc"
	"task-api/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type RegisterLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewRegisterLogic(ctx context.Context, svcCtx *svc.ServiceContext) *RegisterLogic {
	return &RegisterLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *RegisterLogic) Register(req *types.User) (resp *types.UserResponse, err error) {
	// todo: add your logic here and delete this line
	//var res model.User
	res, err := db.Q.WithContext(l.ctx).User.Where(db.Q.User.Username.Eq(req.Username)).Limit(1).Find()
	if len(res) != 0 || err != nil {
		return &types.UserResponse{Status: int32(types.UserStatusFail)}, nil
	} else {
		e := db.Q.WithContext(l.ctx).User.Create(svc.BuildUserDB(req))
		if e != nil {
			return &types.UserResponse{Status: int32(types.UserStatusFail)}, nil
		}
	}
	return &types.UserResponse{Status: int32(types.UserStatusSuccess), User: *req}, nil

}
