# 递归删除类似于 node_modules 的文件夹

## 安装

```sh
npm i -g node-modules-rm
```

## 递归当前路径，移除所有 node_modules

```sh
cd your work-dir
node-modules-rm node_modules
```

## 递归当前路径，移除所有指定的文件夹

如移除所有 `.turbo` 、`.next` 、`dist` 文件夹

```sh
node-modules-rm .turbo .next dist
```
