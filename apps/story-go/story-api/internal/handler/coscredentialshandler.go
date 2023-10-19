package handler

import (
	"net/http"
	"story-api/internal/types"

	"github.com/zeromicro/go-zero/rest/httpx"
	"story-api/internal/logic"
	"story-api/internal/svc"
)

func CosCredentialsHandler(svcCtx *svc.ServiceContext) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var req types.CosCredentialsRequest
		if err := httpx.Parse(r, &req); err != nil {
			httpx.ErrorCtx(r.Context(), w, err)
			return
		}
		l := logic.NewCosCredentialsLogic(r.Context(), svcCtx)
		resp, err := l.CosCredentials(&req)
		if err != nil {
			httpx.ErrorCtx(r.Context(), w, err)
		} else {
			httpx.OkJsonCtx(r.Context(), w, resp)
		}
	}
}
