// Code powered by REGO

package db

import (
	"bytes"
	_ "embed"
	"io"
	"time"

	"github.com/spf13/viper"
)

var config = new(Conf)

// Conf defines configurations for databases.
type Conf struct {
	MySQL struct {
		Addr            string        `yaml:"addr"`
		User            string        `yaml:"user"`
		Pwd             string        `yaml:"pwd"`
		Name            string        `yaml:"name"`
		Psm             string        `yaml:"psm"`
		MaxOpenConn     int           `yaml:"max_open_conn"`
		MaxIdleConn     int           `yaml:"max_idle_conn"`
		ConnMaxLifeTime time.Duration `yaml:"conn_max_lifetime"`
	} `yaml:"mysql"`
}

var (
	//go:embed dev.yaml
	devConf []byte
)

func init() {
	var r io.Reader

	r = bytes.NewReader(devConf)
	viper.SetConfigType("yaml")
	if err := viper.ReadConfig(r); err != nil {
		panic(err)
	}
	if err := viper.Unmarshal(config); err != nil {
		panic(err)
	}
}

func GetConf() Conf {
	return *config
}
