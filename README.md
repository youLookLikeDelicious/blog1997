## Blog1997

一个现代化的博客系统,让摄影爱好者多一个选择。

### 项目介绍
Blog1997是一个前后端分离的博客系统。前端使用Nuxt，实现vue的服务端渲染（ssr）。后端使用Laravel + mysql + redis进行开发。该项目是系统的后端部分。

### 环境
- Redis
- Mysql
- PHP
    - xdebug
    - gd
    - ...
- Linux
  - **Cron** *管理 Laravel计划任务*
  - **Supervisor** *管理Laravel 队列工作*
  - ...

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

### 部署示例
![](https://img.wenhairu.com/images/2021/01/09/DSPp3.png)
<details>
    <summary>nginx 配置</summary>

```nginx
server {
  listen 443 ssl;
  listen [::]:443 ssl;
  server_name www.blog1997.com blog1997.com;

  root /var/www/example.com/public;
  ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
  ssl_certificate /etc/ssl/certs/blog1997.crt;
  ssl_certificate_key /etc/ssl/private/blog1997.key;

  access_log /var/log/nginx/access.log;
  error_log /var/log/nginx/error.log;

  index index.html index.php index.htm;
  charset utf-8;

  add_header X-Frame-Options "SAMEORIGIN";
  add_header X-XSS-Protection "1; mode=block";
  add_header X-Content-Type-Options "nosniff";

  underscores_in_headers on;

  location / {
    proxy_pass http://blog-1997:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    #proxy_redirect off;
    proxy_cache_bypass $http_upgrade;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header X-NginX-Proxy true;
    proxy_set_header Host $host;
  }


  location ~ ^/(admin|image|fonts|svg|api|vue) {
    access_log off;
    #valid_referers server_names;
    #if ($invalid_referer) {
    #    #rewrite ^/ http://www.abc.com/403.jpg;
    #    return 403;
    #}
    try_files $uri $uri/ /index.php?$query_string;
  }


  location = /favicon.ico { access_log off; log_not_found off; }
  location = /robots.txt  { access_log off; log_not_found off; }

  location ~ \.php$ {
    proxy_set_header        X-Real-IP $remote_addr;
    proxy_set_header        X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header        X-Forwarded-Proto $scheme;
    fastcgi_pass php-fpm-7.2:9000;
    fastcgi_index index.php;
    fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
    include fastcgi_params;
  }

  location /sitemap {
    root /var/www/example.com/public;
  }


  location ~ /\.(?!well-known).* {
        deny all;
  }
}
server {
  listen 80;
  listen [::]:80;
  server_name www.blog1997.com blog1997.com;
  return 301 https://$host$request_uri;
}
```
</details>

### 项目管理员界面演示
这是由cypress测试工具，录制的E2E测试过程。作为演示素材
[![Watch the video](https://raw.github.com/GabLeRoux/WebMole/master/ressources/WebMole_Youtube_Video.png)](http://go.plvideo.cn/front/video/preview?vid=43876a053ad92f5e3bcf91ab170ace07_4)


### FAQ（常见问题）
- 如果想在Docker容器中运行E2E测试，需要设置参数 --shm-size=512m(默认是64M)，否则会崩溃
- 因为搜索使用了Mysql自带的全文索引，所以你需要配置Mysql的 _ft_min_word_len_(默认是4)
- 可以使用Google的Analytics或是国内的友盟统计用户的行为(没有内置)
- 推荐使用sentry收集错误日志（没有内置）

### Blog1997界面

![blog1997-dashboard](https://img.wenhairu.com/images/2021/01/09/DSZOo.png)
![blog1997-create-article](https://img.wenhairu.com/images/2021/01/09/DS0vf.png)
![blog1997-front](https://img.wenhairu.com/images/2021/01/09/DSIUd.md.png)

### 感谢
- [公众图库免费图片托管](https://img.wenhairu.com/)
- [pixabay免费素材图库](https://pixabay.com/)
