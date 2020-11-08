# Google kubernetes engine
## yaml 详解
google 关键字 deploy yaml详解

Kubernetes之yaml文件详解(汇总-详细）
https://blog.csdn.net/BigData_Mining/article/details/88535356

一、YAML基础

二、说明
```bash
定义配置时，指定最新稳定版API
配置文件应该存储在集群之外的版本控制仓库中。如果需要，可以快速回滚配置、重新创建和恢复
应该使用YAML格式编写配置文件，而不是json。YAML对用户更加友好
可以将相关对象组合成单个文件，通常会更容易管理
不要没必要指定默认值，简单和最小配置减小错误
在注释中说明一个对象描述更好维护
```

三、使用YAML创建Pod

四、创建Deployment

创建service

附上一个具体的yaml解释文件：

## practice
[译]Kubernetes入门指南：部署一个Node.js Docker应用 — SitePoint
https://www.jianshu.com/p/109c205e75ba

Kubernetes解决了什么问题？
Kubernetes 概念学习，什么是CS结构，为什么k8s是cs架构
使用Kubernetes在GKE上部署一个 Node.js 应用
1. 安装 Google Cloud SDK and Kubernetes 客户端
2. 创建一个 GCP工程
3. 创建一个你的应用程序的Docker镜像
4. 创建一个集群
5. 上传 Docker镜像到Google Container Image Registry
6. 第一次部署
7. 向互联网公开服务
8. 控制服务的扩展/收缩
9. 清理
