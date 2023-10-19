package svc

import (
	"story-api/internal/dao/model/model"
	"story-api/internal/types"
	"strconv"
)

var (
	AudioCdnPrefix="https://audio.compencat.com"
)

func BuildStory(instance *model.Story) *types.Story {
	return &types.Story{
		Id:          instance.ID,
		Name:        instance.Name,
		Status:      instance.Status,
		Description: instance.Description,
		CreateTime:  strconv.FormatInt(instance.CreateTime.Unix(), 10),
		UpdateTime:  strconv.FormatInt(instance.UpdateTime.Unix(), 10),
		AudioLink: instance.AudioLink,
		AudioUrl: AudioCdnPrefix + instance.AudioLink,
		Data:        instance.Data,
	}
}

func BuildStoryDB(instance *types.Story) *model.Story {
	return &model.Story{
		ID:          instance.Id,
		Name:        instance.Name,
		Description: instance.Description,
		Data:        instance.Data,
		Status:      instance.Status,
		AudioLink: instance.AudioLink,
		//Channel:     "",
		//Source:      "",
		//CreateTime:  instance.CreateTime,
		//UpdateTime:  time.Now().UTC(),
	}
}
