# 这个 mcfunction 是用来偷懒的。一些需要确保全局生效的东西都直接扔这里了。
# 小心别把基岩版的 gamerule 复制进来了！会导致 mcfunction parser 报错的，进而让整个 mcfunction 都不运行。

# 禁止幻翼（Phantom）因玩家缺少睡眠而生成
gamerule doInsomnia false
# 禁止野外刷怪。
gamerule doMobSpawning false
# 禁止刷流浪商人。
gamerule doTraderSpawning false
# 死亡时保留背包内物品
gamerule keepInventory true
# 关闭玩家获取进度后的全服聊天广播——Mod 一多这个就有刷屏嫌疑了
gamerule announceAdvancements false
# 打开方块掉落。强行关闭这个会影响不少 Mod 的功能展示。
gamerule doTileDrops true

say 欢迎来到甲辰茶会
