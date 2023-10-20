package handler

import (
	"net/http"
	"task-api/internal/types"

	"github.com/zeromicro/go-zero/rest/httpx"
	"task-api/internal/logic"
	"task-api/internal/svc"
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
