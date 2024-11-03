# 《普洱·甲辰茶会》目录结构

## 写在前面

`assets/simplebackups/lang` 下的文件源自 https://github.com/ChaoticTrials/SimpleBackups/tree/1.21.x/src/main/resources/assets/simplebackups/lang 原文件在 Apache Licese, Version 2.0 下发布。

## 我应该把文件放哪？

  - 资源包相关内容放入 `assets`。
  - 数据包相关内容放入 `data`。
  - 配置文件放入 `config`。
    - 这包括此前需要放在 serverconfig 下的服务器配置文件！[NeoForge 自 20.4.21-beta 始会读取 config 下的服务器侧配置文件](https://github.com/neoforged/NeoForge/pull/376)，原有的存档级别的 `serverconfig` 功能仍然保留，可用于覆盖全局配置。
  - 其他那些会出现在 `.minecraft` 或服务器根目录下的文件都应该保持和 `config` 同级的目录。

## 目录结构图例

使用 https://tree.nathanfriend.io/ 生成。

```
PUER/
└── jiachen/
    ├── config/ 
    │   ├── fml.toml
    │   ├── forge-client.toml
    │   ├── forge-server.toml
    │   └── powertool-server.toml  <-- 注意这个文件，现在你可以把 server-side 配置放在 config 目录下了！
    ├── assets/
    │   ├── teacon_jiachen/
    │   │   └── lang/
    │   │       └── zh_cn.json
    │   └── chromeball/
    ├── data/
    │   └── teacon_jiachen/
    │       └── recipe/
    │           └── new_recipe.json
    ├── options.txt
    └── pack.mcmeta
```
