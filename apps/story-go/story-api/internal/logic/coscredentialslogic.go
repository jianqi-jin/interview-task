package logic

import (
	"context"
	"story-api/internal/svc"
	"story-api/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type CosCredentialsLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewCosCredentialsLogic(ctx context.Context, svcCtx *svc.ServiceContext) *CosCredentialsLogic {
	return &CosCredentialsLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *CosCredentialsLogic) CosCredentials(req *types.CosCredentialsRequest) (resp *types.CosCredentialsResponse, err error) {
	// todo: add your logic here and delete this line
	cosCredentials, err := svc.GetStsCredentials(req.Key)
	if err != nil {
		return nil, err
	}
	return &types.CosCredentialsResponse{
		Message: "",
		Data: types.CosCredentials{
			TmpSecretID: cosCredentials.TmpSecretID,
			TmpSecretKey: cosCredentials.TmpSecretKey,
			SessionToken: cosCredentials.SessionToken,
		},
	}, nil
}
