# artemis-fe

> 项目原名autool-fe，现更名为artemis-fe
> 
> 在原项目基础上新增以下例子：
> - 登录退出与token凭证功能
> - 单元测试集成
> - Docker化
> - SetTimeOut递归调用
> - FormData上传多文件与Json等代码以供学习参考
> - 修复若干bug
  - 主题色修改

如果本项目对你起到了学习或工作的帮助，请点个star，我会在今后的工作中不断充实改骨架工程，有意见问题也请在issue里提出~

## 技术栈
vue.js/vuex/ant-design-vue/axios/vue-test-utils/jest/prettier

## 特点
本骨架工程采用了顶部菜单加侧边菜单分别渲染的方式，为了可以直接通过复制网址打开对应页面且能正确高亮顶部与侧边菜单，本工程并未使用浏览器本地存储数据的方式，而是对url进行了解析，所以对于地址命名与项目文件命名有着一定的规范。请阅读骨架工程代码学习约定规约。本工程使用prettier进行代码规范检查，请关闭eslint的检查插件，使用 `npm run format` 可以进行格式化项目代码。

## 框架设计核心
- 通过vue-router的嵌套路由来实现根据顶部菜单 -> 渲染侧边菜单 -> 根据侧边菜单渲染内容页，这样应用的页面层级关系就实现了；
- 通过vuex的管理的组件依赖状态的变化来触发菜单组件的重渲染；
- 通过约定化配置路由与菜单的对应关系，来解析url识别需要高亮的顶部与侧边菜单；

核心逻辑代码位于App.vue文件中，大家自己看一下就会明白。其实这个骨架相对来说比较简单简洁，菜单高亮与路由的设置方式也许不是最好的，但是自己从零开始实现一个前端骨架工程还是比较有意思的，也可以比较好得巩固vue全家桶基础。

## 使用
- 请根据自己的需要删除页面和代码
- 本项目所涉及后端代码请看仓库：https://github.com/tangyiming/artemis

## 部署
### 常规部署方式
拉取代码
```bash
[root@localhost conf.d]# npm install
[root@localhost conf.d]# npm run build
```
配置nginx server项


```bash
[root@localhost conf.d]# vi default.conf
```

> listen 8080;
>
> location / {
>
> root /opt/artemis-fe/dist/;
>
> try_files $uri $uri/ /index.html = 404;
>
> }

```bash 
[root@localhost conf.d]# nginx -c /etc/nginx/nginx.conf
[root@localhost conf.d]# nginx -s reload
```
关闭防火墙，以防止外面无法访问
```bash
[root@localhost conf.d]# systemctl stop firewalld.service
```
 
### Docker化部署方式（暂不用这种方式部署）
在项目中添加docker与nginx配置
给服务器生成sshkey添加到gitlab
在服务器上拉取前端代码
进行image构建（tag随版本变更），和容器运行
```bash
[root@localhost opt]# docker build artemis-fe/ -t artemis-fe:1.0.0
[root@localhost opt]# docker run -d -p 8080:80 artemis-fe:1.0.0
```
 
参考：https://cli.vuejs.org/guide/deployment.html#docker-nginx
