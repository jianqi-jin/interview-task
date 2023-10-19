package logic

import (
	"context"

	"task-api/internal/svc"
	"task-api/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type TextToSpeechLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewTextToSpeechLogic(ctx context.Context, svcCtx *svc.ServiceContext) *TextToSpeechLogic {
	return &TextToSpeechLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *TextToSpeechLogic) TextToSpeech(req *types.TextToSpeechRequest) (resp []byte, err error) {
	// todo: add your logic here and delete this line
	audio, err := svc.SendText2SpeechRequest(req)
	//audio, err := svc.SendSpeech(req.Text)
	if err != nil {
		return nil, err
	}
	return audio, nil
}
