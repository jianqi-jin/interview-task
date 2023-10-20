package logic

import (
	"context"
	"github.com/golang-jwt/jwt/v4"
	"task-api/internal/dao/db"
	"time"

	"task-api/internal/svc"
	"task-api/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

func getJwtToken(secretKey string, iat, seconds int64, payload string) (string, error) {
	claims := make(jwt.MapClaims)
	claims["exp"] = iat + seconds
	claims["iat"] = iat
	claims["payload"] = payload
	token := jwt.New(jwt.SigningMethodHS256)
	token.Claims = claims
	return token.SignedString([]byte(secretKey))
}

type LoginLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewLoginLogic(ctx context.Context, svcCtx *svc.ServiceContext) *LoginLogic {
	return &LoginLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *LoginLogic) Login(req *types.Login) (resp *types.UserResponse, err error) {
	// todo: add your logic here and delete this line
	instance, err := db.Q.WithContext(l.ctx).User.Where(db.Q.User.Username.Eq(req.Username)).Where(db.Q.User.Password.Eq(req.Password)).Limit(1).Find()
	if err != nil || len(instance) < 1 {
		return &types.UserResponse{Status: int32(types.UserStatusFail)}, nil
	}
	//var configFile = flag.String("f", "etc/task-api.yaml", "the config file")
	//var c config.Config
	//conf.MustLoad(*configFile, &c)
	curUser := svc.BuildUser(instance[0])
	curUser.Jwt, err = getJwtToken("TestAccessSecret", time.Now().Unix(), 600000, curUser.Username)
	return &types.UserResponse{Status: int32(types.UserStatusSuccess), User: *curUser}, nil
}
