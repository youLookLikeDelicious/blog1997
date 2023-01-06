## Blog1997
![introduce](https://img.wenhairu.com/images/2023/01/06/7pe0S.png)

一个现代化的博客系统,让摄影爱好者多一个选择。

![coverage](https://img.shields.io/codecov/c/github/youLookLikeDelicious/blog1997)
![licence](https://img.shields.io/github/license/youLookLikeDelicious/blog1997)
![code](https://img.shields.io/github/languages/top/youLookLikeDelicious/blog1997)

### 项目介绍
Blog1997的SSR部分

### 特性
- Vue的SSR
- 自动生成sitemap.xml。
- 使用DFA算法对敏感词汇进行监测，将评论的敏感词汇替换成***，任意扩展词汇列表。
- 基于角色的权限控制（RBAC）。
- 富文本和Markdown可以任意切换。
- 使用bit.bin实现vue组件的共享。
- 比较全面的Feature测试和Unit测试
- 将上传的图片备份一个webp格式，并添加水印。
- 支持微信和GITHUB第三方登陆，也可以将第三方账号绑定到邮箱账号。

## 开发模式
```bash
npm run serve
```

## 测试
```bash
npm run test:unit
```

## 打包docker镜像
```bash
docker build -t chaosxy/blog1997:tag -f docker/DockerFile --network=host --target=app .
```
### 感谢
- [公众图库免费图片托管](https://img.wenhairu.com/)
- [pixabay免费素材图库](https://pixabay.com/)
