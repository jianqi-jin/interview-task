// Code powered by REGO

package db

import (
	"fmt"
	"story-api/internal/dao/model/query"

	"gorm.io/driver/mysql"

	"sync"
	"time"

	"gorm.io/gorm"
	"gorm.io/gorm/schema"
)

var (
	Q    *query.Query
	Db	 *gorm.DB
	once sync.Once
)

func init() {
	once.Do(func() {
		db := establishMySqlConnection()
		Db = db
		Q = query.Use(db)
	})
}

func establishMySqlConnection() (conn *gorm.DB) {
	cfg := GetConf().MySQL
	var err error
	dsn := fmt.Sprintf("%s:%s@tcp(%s)/%s?charset=utf8mb4&parseTime=%t&loc=%s",
		cfg.User,
		cfg.Pwd,
		cfg.Addr,
		cfg.Name,
		true,
		"Local")
	conn, err = gorm.Open(mysql.Open(dsn), &gorm.Config{
		NamingStrategy: schema.NamingStrategy{
			SingularTable: true,
		},
	})
	if err != nil {
		panic(fmt.Errorf("cannot establish db connection: %w", err))
	}
	conn.Set("gorm:table_options", "CHARSET=utf8mb4")
	sqlDB, err := conn.DB()
	if err != nil {
		panic(fmt.Errorf("cannot get sqlDB instance: %w", err))
	}
	sqlDB.SetMaxOpenConns(cfg.MaxOpenConn)
	sqlDB.SetMaxIdleConns(cfg.MaxIdleConn)
	sqlDB.SetConnMaxLifetime(time.Minute * cfg.ConnMaxLifeTime)
	return conn
}
