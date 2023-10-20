# DRAW

## Build and Run

#### build

```
docker-compose build --no-cache
```

#### run

```
docker-compose up
```

The contents blow this line are not for running this projet, it is for development.

## Development

#### run client

```
pnpm --filter draw-fe dev
```

build and run in docker:
```
sh ./scripts/build_client.sh
docker-compose up -d --no-deps --build node
```

#### build db
```
docker-compose up -d --no-deps --build db 
```

#### 查看log

```
 docker-compose logs -f node
```


#### 查看进程

```
docker ps
```

#### 数据库操作

删除数据
```
docker-compose down
```

有时无法删除
```
volumes:
  - ~/opt/data:/var/lib/mysql
  - ~/opt/log:/var/log/mysql
  - ~/opt/mysql-files:/var/lib/mysql-files
```

删除 volumes 中配置的路径，进行删除。

当dockerfile变更之后：

```
docker-compose build --no-cache
```

删除 docker 不用的images
```
docker image prune --all
```

开启swap

https://www.jianshu.com/p/04c7a9ab438c

```
cd /var
sudo mkdir swap
sudo dd if=/dev/zero of=swapfile bs=1024 count=4000000

在 var目录执行：
sudo mkswap swapfile


挂载： sudo swapon /var/swapfile
如果不需要了，可以也可以卸载：
卸载：sudo swapoff /var/swapfile


编辑   /etc/fstab，末行添加：


/var/swapfile   swap  swap  defaults  0  0

```


从文件搜索
```
find . -name '*.js' -print0 | xargs -0 grep "Failed to load configuration of your project"
```

```
docker system prune
```

```
df -m
```

登录数据库：

```
docker exec -it draw_db bash
mysql -uroot -p123456 draw
```

You need setup the whistle config:

```
interview.org/api/ localhost:18005/api/
interview.org/ localhost:3000/
```


And open this link to review this project: http://interview.org/

Fabric

6.0.0-beta4 for SSR

5.x 需要修改next-config
