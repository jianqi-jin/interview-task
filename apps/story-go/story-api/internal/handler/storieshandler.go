package handler

import (
	"net/http"

	"github.com/zeromicro/go-zero/rest/httpx"
	"story-api/internal/logic"
	"story-api/internal/svc"
	"story-api/internal/types"
)

func StoriesHandler(svcCtx *svc.ServiceContext) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var req types.StoriesRequest
		if err := httpx.Parse(r, &req); err != nil {
			httpx.ErrorCtx(r.Context(), w, err)
			return
		}

		l := logic.NewStoriesLogic(r.Context(), svcCtx)
		resp, err := l.Stories(r.Context(), &req)
		if err != nil {
			httpx.ErrorCtx(r.Context(), w, err)
		} else {
			httpx.OkJsonCtx(r.Context(), w, resp)
		}
	}
}
