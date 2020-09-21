# karakul

> [ Collie ERP 系统 ] -- [ 生产流程管理系统 ]

## 项目简介

生产流程管理系统，主要负责记录商品生产流程的节点及其主要操作人。

## 项目结构

```bash
├── README.md
├── package.json
├── public
├── src
│   ├── components   //  通用组件
│   ├── helpers   //  工具函数
│   ├── images
│   ├── layout   //  页面对应的区块
│   ├── pages   //  页面
│   ├── service   //  后端接口
│   │   ├── client.ts
│   │   ├── codegen.dev.yml   //  远程后端接口代码自动生成配置
│   │   ├── codegen.local.yml   //  本地后端接口代码自动生成配置
│   │   ├── generated   //  代码自动生成文件，不需要配置
│   │   └── gql
└── tsconfig.json
```

## 技术栈

- [nextjs](https://nextjs.org/)
- typescript
- graphql
- apollo-client [@apollo/react-testing](https://www.npmjs.com/package/@apollo/react-testing)
- scss
- antd

## 开发指南

- `schema:update` 更新本地测试环境 schema 并重新生成代码
- `schema` 使用本地测试环境 schema 生成代码
- `icon` 压缩并合并 icon

## 部署指南

- `master`：生产环境
- `dev`：开发环境

### docker 部署

使用 [`Dockerfile`](./Dockerfile) 进行打包，运行时需要设置环境变量 `ENDPOINT=<URL>`(`URL` 为后端接口地址)

### 本地部署

#### 环境要求：

- node v12.16.1
- yarn v1.22.4

#### 打包 & 部署

```bash
export ENDPOINT=<URL>
yarn
yarn build
yarn start [-p PORT]
```

当前应用会运行在 `localhost:PORT`，默认端口 3000
