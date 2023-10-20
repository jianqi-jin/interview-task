package svc

import (
	"github.com/zeromicro/go-zero/core/stores/sqlx"
	"task-api/internal/config"
)

func GetSqlCnn() sqlx.SqlConn {
	mysqlConfig := config.GetMysqlConfig()
	return sqlx.NewMysql(mysqlConfig.DataSource)
}
