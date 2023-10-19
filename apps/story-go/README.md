# story-api

更新 idl
```
sh update.sh
```

安装mod

```
cd ./story-api
go mod tidy
```

运行
```
go run story.go -f etc/story-api.yaml
```

升级db model
```

```
本地开发可能需要安装server环境：

1、安装go 环境

2、GO111MODULE=on go install github.com/zeromicro/go-zero/tools/goctl@latest

3、go install gorm.io/gen/tools/gentool@latest

