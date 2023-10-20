package handler

import (
	"net/http"

	"github.com/zeromicro/go-zero/rest/httpx"
	"task-api/internal/logic"
	"task-api/internal/svc"
	"task-api/internal/types"
)

func TaskHandler(svcCtx *svc.ServiceContext) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var req types.TaskDetailRequest
		if err := httpx.Parse(r, &req); err != nil {
			httpx.ErrorCtx(r.Context(), w, err)
			return
		}

		l := logic.NewTaskLogic(r.Context(), svcCtx)
		resp, err := l.Task(&req)
		if err != nil {
			httpx.ErrorCtx(r.Context(), w, err)
		} else {
			httpx.OkJsonCtx(r.Context(), w, resp)
		}
	}
}
