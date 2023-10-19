package config

import (
	"flag"
	"github.com/zeromicro/go-zero/core/conf"
)

type MysqlConfig struct {
	//Host string `json:",default=0.0.0.0"`
	//Port int
	//user string
	//Password string
	//Database string
	DataSource string
}
type CosConfig struct {
	//Host string `json:",default=0.0.0.0"`
	//Port int
	//user string
	//Password string
	//Database string
	ak string
	sk string
}

var f = flag.String("mysql", "mysql.yml", "mysql config")
var fCos = flag.String("cos", "mysql.yml", "cos config")

func GetCosConfig() CosConfig {
	flag.Parse()
	var c CosConfig
	conf.MustLoad(*fCos, &c)
	return c
}

func GetMysqlConfig() MysqlConfig {
	flag.Parse()
	var m MysqlConfig
	conf.MustLoad(*f, &m)
	return m
}


