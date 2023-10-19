// Code generated by gorm.io/gen. DO NOT EDIT.
// Code generated by gorm.io/gen. DO NOT EDIT.
// Code generated by gorm.io/gen. DO NOT EDIT.

package model

import (
	"time"
)

const TableNameHistory = "history"

// History mapped from table <history>
type History struct {
	ID         int64     `gorm:"column:id;primaryKey;autoIncrement:true" json:"id"`
	TaskID     int64     `gorm:"column:task_id;not null;comment:task id" json:"task_id"`                             // task id
	Data       string    `gorm:"column:data;comment:json详细信息" json:"data"`                                           // json详细信息
	Version    int32     `gorm:"column:version;not null;comment:history 相对于mask的 version" json:"version"`            // history 相对于mask的 version
	IsActive   int32     `gorm:"column:is_active;not null;default:1;comment:是否是当前版本 1 当前版本 0 历史版本" json:"is_active"` // 是否是当前版本 1 当前版本 0 历史版本
	CreateTime time.Time `gorm:"column:create_time;not null;default:CURRENT_TIMESTAMP(6)" json:"create_time"`
	UpdateTime time.Time `gorm:"column:update_time;not null;default:CURRENT_TIMESTAMP(6)" json:"update_time"`
	Status     int32     `gorm:"column:status;not null;comment:1=待审核, 2=审核通过, 3=审核失败" json:"status"` // 1=待审核, 2=审核通过, 3=审核失败
}

// TableName History's table name
func (*History) TableName() string {
	return TableNameHistory
}
