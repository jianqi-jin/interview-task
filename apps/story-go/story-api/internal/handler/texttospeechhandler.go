package handler

import (
	"net/http"
	"task-api/internal/logic"

	"github.com/zeromicro/go-zero/rest/httpx"
	"task-api/internal/svc"
	"task-api/internal/types"
)

func TextToSpeechHandler(svcCtx *svc.ServiceContext) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var req types.TextToSpeechRequest
		if err := httpx.Parse(r, &req); err != nil {
			httpx.ErrorCtx(r.Context(), w, err)
			return
		}

		l := logic.NewTextToSpeechLogic(r.Context(), svcCtx)
		resp, err := l.TextToSpeech(&req)
		if err != nil {
			httpx.ErrorCtx(r.Context(), w, err)
		} else {
			w.Header().Set("Content-Type", "audio/x-wav")
			w.Write(resp)
			httpx.Ok(w)
			//httpx.OkJsonCtx(r.Context(), w, resp)
		}
	}
}
