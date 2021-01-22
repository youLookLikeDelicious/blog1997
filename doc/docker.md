# 生产模式(参考)
因为使用服务端渲染,nuxt容器也会向nginx容器发送请求,需要在***env***文件中配置***BASE_URL=nginx-service-name|nginx-container-name***,定义axios的base url.


## 使用多阶段构建创建一个node
```bash
docker build -f docker/DockerFile -t your-repository:tag .
```

## 创建一个服务
```bash
docker service create \
--name nuxt \
--hostname nuxt \
--network blog \
--replicas 1 \
--constraint node.labels.region==*** \
--config src=nuxt.env,target=/var/www/.env \
-t \
--update-failure-action continue \
your-image
```
