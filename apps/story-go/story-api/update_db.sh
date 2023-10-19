#goctl model mysql datasource -url="root:Story_13456@tcp(0.0.0.0:3308)/story" -table="*"  -dir="./story-api/internal/types/db"
# This command line will extract the db schema to go data modal.
# 这个会从db同步schema到go 的数据模型
gentool -dsn "root:Interview_13456@tcp(152.136.56.221:3307)/interview?charset=utf8mb4&parseTime=True&loc=Local" -tables "users, tasks, history" -outFile "gen.go" -outPath "internal/dao/model/query"