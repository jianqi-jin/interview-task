package svc

import (
	"strconv"
	"task-api/internal/dao/model/model"
	"task-api/internal/types"
)

var (
	AudioCdnPrefix = "https://audio.compencat.com"
)

func BuildTask(instance *model.Task) *types.Task {
	return &types.Task{
		Id:          instance.ID,
		Name:        instance.Name,
		Status:      instance.Status,
		Description: instance.Description,
		CreateTime:  strconv.FormatInt(instance.CreateTime.Unix(), 10),
		UpdateTime:  strconv.FormatInt(instance.UpdateTime.Unix(), 10),
		OriImgKey:   instance.OriImgKey,
		ImgUrl:      AudioCdnPrefix + instance.OriImgKey,
		Data:        instance.Data,
	}
}

func BuildTaskDB(instance *types.Task) *model.Task {
	return &model.Task{
		ID:          instance.Id,
		Name:        instance.Name,
		Description: instance.Description,
		Data:        instance.Data,
		Status:      instance.Status,
		OriImgKey:   instance.OriImgKey,
		//Channel:     "",
		//Source:      "",
		//CreateTime:  instance.CreateTime,
		//UpdateTime:  time.Now().UTC(),
	}
}
