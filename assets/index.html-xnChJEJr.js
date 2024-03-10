const l=JSON.parse('{"key":"v-09071ef4","path":"/back-advance/6.redis/","title":"","lang":"zh-CN","frontmatter":{"description":"在此特别感谢黑马程序员提供的Redis课程 黑马程序员Redis入门到实战教程，深度透析redis底层原理+redis分布式锁+企业解决方案+黑马点评实战项目_哔哩哔哩_bilibili 初始Redis Redis是一种键值型的NoSQL数据库，这里有两个关键字","head":[["meta",{"property":"og:url","content":"https://apzs.github.io/back-advance/6.redis/"}],["meta",{"property":"og:site_name","content":"apzs"}],["meta",{"property":"og:description","content":"在此特别感谢黑马程序员提供的Redis课程 黑马程序员Redis入门到实战教程，深度透析redis底层原理+redis分布式锁+企业解决方案+黑马点评实战项目_哔哩哔哩_bilibili 初始Redis Redis是一种键值型的NoSQL数据库，这里有两个关键字"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-03-10T13:06:08.000Z"}],["meta",{"property":"article:author","content":"apzs"}],["meta",{"property":"article:modified_time","content":"2024-03-10T13:06:08.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-03-10T13:06:08.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"apzs\\",\\"url\\":\\"https://apzs.eu.org\\"}]}"]]},"headers":[{"level":2,"title":"初始Redis","slug":"初始redis","link":"#初始redis","children":[{"level":3,"title":"认识NoSQL","slug":"认识nosql","link":"#认识nosql","children":[]},{"level":3,"title":"认识Redis","slug":"认识redis","link":"#认识redis","children":[]},{"level":3,"title":"安装Redis","slug":"安装redis","link":"#安装redis","children":[]},{"level":3,"title":"修改配置","slug":"修改配置","link":"#修改配置","children":[]},{"level":3,"title":"Redis桌面客户端","slug":"redis桌面客户端","link":"#redis桌面客户端","children":[]}]},{"level":2,"title":"Redis常用命令","slug":"redis常用命令","link":"#redis常用命令","children":[{"level":3,"title":"Redis通用命令","slug":"redis通用命令","link":"#redis通用命令","children":[]},{"level":3,"title":"String类型","slug":"string类型","link":"#string类型","children":[]},{"level":3,"title":"Hash类型","slug":"hash类型","link":"#hash类型","children":[]},{"level":3,"title":"List类型","slug":"list类型","link":"#list类型","children":[]},{"level":3,"title":"Set类型","slug":"set类型","link":"#set类型","children":[]},{"level":3,"title":"SortedSet类型","slug":"sortedset类型","link":"#sortedset类型","children":[]}]},{"level":2,"title":"Redis的Java客户端","slug":"redis的java客户端","link":"#redis的java客户端","children":[{"level":3,"title":"Jedis客户端","slug":"jedis客户端","link":"#jedis客户端","children":[]},{"level":3,"title":"SpringDataRedis客户端","slug":"springdataredis客户端","link":"#springdataredis客户端","children":[]}]},{"level":2,"title":"内容概述","slug":"内容概述","link":"#内容概述","children":[]},{"level":2,"title":"短信登录","slug":"短信登录","link":"#短信登录","children":[{"level":3,"title":"导入项目","slug":"导入项目","link":"#导入项目","children":[]},{"level":3,"title":"基于Session实现登录流程","slug":"基于session实现登录流程","link":"#基于session实现登录流程","children":[]},{"level":3,"title":"实现发送短信验证码功能","slug":"实现发送短信验证码功能","link":"#实现发送短信验证码功能","children":[]},{"level":3,"title":"实现登录拦截功能","slug":"实现登录拦截功能","link":"#实现登录拦截功能","children":[]},{"level":3,"title":"隐藏用户敏感信息","slug":"隐藏用户敏感信息","link":"#隐藏用户敏感信息","children":[]},{"level":3,"title":"session共享问题","slug":"session共享问题","link":"#session共享问题","children":[]},{"level":3,"title":"Redis替代session的业务流程","slug":"redis替代session的业务流程","link":"#redis替代session的业务流程","children":[]},{"level":3,"title":"基于Redis实现短信登录","slug":"基于redis实现短信登录","link":"#基于redis实现短信登录","children":[]},{"level":3,"title":"解决状态登录刷新问题","slug":"解决状态登录刷新问题","link":"#解决状态登录刷新问题","children":[]}]},{"level":2,"title":"商户查询缓存","slug":"商户查询缓存","link":"#商户查询缓存","children":[{"level":3,"title":"什么是缓存","slug":"什么是缓存","link":"#什么是缓存","children":[]},{"level":3,"title":"添加商户缓存","slug":"添加商户缓存","link":"#添加商户缓存","children":[]},{"level":3,"title":"缓存更新策略","slug":"缓存更新策略","link":"#缓存更新策略","children":[]},{"level":3,"title":"实现商铺缓存与数据库双写一致","slug":"实现商铺缓存与数据库双写一致","link":"#实现商铺缓存与数据库双写一致","children":[]},{"level":3,"title":"缓存穿透问题的解决思路","slug":"缓存穿透问题的解决思路","link":"#缓存穿透问题的解决思路","children":[]},{"level":3,"title":"编码解决商品查询的缓存穿透问题","slug":"编码解决商品查询的缓存穿透问题","link":"#编码解决商品查询的缓存穿透问题","children":[]},{"level":3,"title":"缓存雪崩问题及解决思路","slug":"缓存雪崩问题及解决思路","link":"#缓存雪崩问题及解决思路","children":[]},{"level":3,"title":"缓存击穿问题及解决思路","slug":"缓存击穿问题及解决思路","link":"#缓存击穿问题及解决思路","children":[]},{"level":3,"title":"对比互斥锁与逻辑删除","slug":"对比互斥锁与逻辑删除","link":"#对比互斥锁与逻辑删除","children":[]},{"level":3,"title":"利用互斥锁解决缓存击穿问题","slug":"利用互斥锁解决缓存击穿问题","link":"#利用互斥锁解决缓存击穿问题","children":[]},{"level":3,"title":"利用逻辑过期解决缓存击穿问题","slug":"利用逻辑过期解决缓存击穿问题","link":"#利用逻辑过期解决缓存击穿问题","children":[]},{"level":3,"title":"封装Redis工具类","slug":"封装redis工具类","link":"#封装redis工具类","children":[]}]},{"level":2,"title":"优惠券秒杀","slug":"优惠券秒杀","link":"#优惠券秒杀","children":[{"level":3,"title":"Redis实现全局唯一ID","slug":"redis实现全局唯一id","link":"#redis实现全局唯一id","children":[]},{"level":3,"title":"添加优惠券","slug":"添加优惠券","link":"#添加优惠券","children":[]},{"level":3,"title":"实现秒杀下单","slug":"实现秒杀下单","link":"#实现秒杀下单","children":[]},{"level":3,"title":"超卖问题","slug":"超卖问题","link":"#超卖问题","children":[]},{"level":3,"title":"一人一单","slug":"一人一单","link":"#一人一单","children":[]},{"level":3,"title":"集群环境下的并发问题","slug":"集群环境下的并发问题","link":"#集群环境下的并发问题","children":[]}]},{"level":2,"title":"分布式锁","slug":"分布式锁","link":"#分布式锁","children":[{"level":3,"title":"基本原理和实现方式对比","slug":"基本原理和实现方式对比","link":"#基本原理和实现方式对比","children":[]},{"level":3,"title":"Redis分布式锁的实现核心思路","slug":"redis分布式锁的实现核心思路","link":"#redis分布式锁的实现核心思路","children":[]},{"level":3,"title":"实现分布式锁","slug":"实现分布式锁","link":"#实现分布式锁","children":[]},{"level":3,"title":"Redis分布式锁误删情况说明","slug":"redis分布式锁误删情况说明","link":"#redis分布式锁误删情况说明","children":[]},{"level":3,"title":"解决Redis分布式锁误删问题","slug":"解决redis分布式锁误删问题","link":"#解决redis分布式锁误删问题","children":[]},{"level":3,"title":"分布式锁的原子性问题","slug":"分布式锁的原子性问题","link":"#分布式锁的原子性问题","children":[]},{"level":3,"title":"Lua脚本解决多条命令原子性问题","slug":"lua脚本解决多条命令原子性问题","link":"#lua脚本解决多条命令原子性问题","children":[]},{"level":3,"title":"利用Java代码调用Lua脚本改造分布式锁","slug":"利用java代码调用lua脚本改造分布式锁","link":"#利用java代码调用lua脚本改造分布式锁","children":[]}]},{"level":2,"title":"分布式锁-Redisson","slug":"分布式锁-redisson","link":"#分布式锁-redisson","children":[{"level":3,"title":"Redisson入门","slug":"redisson入门","link":"#redisson入门","children":[]},{"level":3,"title":"Redisson可重入锁原理","slug":"redisson可重入锁原理","link":"#redisson可重入锁原理","children":[]},{"level":3,"title":"Redisson锁重试和WatchDog机制","slug":"redisson锁重试和watchdog机制","link":"#redisson锁重试和watchdog机制","children":[]},{"level":3,"title":"Redisson锁的MutiLock原理","slug":"redisson锁的mutilock原理","link":"#redisson锁的mutilock原理","children":[]},{"level":3,"title":"小结","slug":"小结","link":"#小结","children":[]}]},{"level":2,"title":"秒杀优化","slug":"秒杀优化","link":"#秒杀优化","children":[{"level":3,"title":"异步秒杀思路","slug":"异步秒杀思路","link":"#异步秒杀思路","children":[]},{"level":3,"title":"Redis完成秒杀资格判断","slug":"redis完成秒杀资格判断","link":"#redis完成秒杀资格判断","children":[]},{"level":3,"title":"基于阻塞队列实现秒杀优化","slug":"基于阻塞队列实现秒杀优化","link":"#基于阻塞队列实现秒杀优化","children":[]},{"level":3,"title":"小结","slug":"小结-1","link":"#小结-1","children":[]}]},{"level":2,"title":"Redis消息队列","slug":"redis消息队列","link":"#redis消息队列","children":[{"level":3,"title":"认识消息队列","slug":"认识消息队列","link":"#认识消息队列","children":[]},{"level":3,"title":"基于List实现消息队列","slug":"基于list实现消息队列","link":"#基于list实现消息队列","children":[]},{"level":3,"title":"基于PubSub的消息队列","slug":"基于pubsub的消息队列","link":"#基于pubsub的消息队列","children":[]},{"level":3,"title":"基于Stream的消息队列","slug":"基于stream的消息队列","link":"#基于stream的消息队列","children":[]},{"level":3,"title":"基于Stream的消息队列—消费者组","slug":"基于stream的消息队列—消费者组","link":"#基于stream的消息队列—消费者组","children":[]},{"level":3,"title":"Stream消息队列实现异步秒杀下单","slug":"stream消息队列实现异步秒杀下单","link":"#stream消息队列实现异步秒杀下单","children":[]}]},{"level":2,"title":"达人探店","slug":"达人探店","link":"#达人探店","children":[{"level":3,"title":"发布探店笔记","slug":"发布探店笔记","link":"#发布探店笔记","children":[]},{"level":3,"title":"查看探店笔记","slug":"查看探店笔记","link":"#查看探店笔记","children":[]},{"level":3,"title":"点赞功能","slug":"点赞功能","link":"#点赞功能","children":[]},{"level":3,"title":"点赞排行榜","slug":"点赞排行榜","link":"#点赞排行榜","children":[]}]},{"level":2,"title":"好友关注","slug":"好友关注","link":"#好友关注","children":[{"level":3,"title":"关注和取消关注","slug":"关注和取消关注","link":"#关注和取消关注","children":[]},{"level":3,"title":"共同关注","slug":"共同关注","link":"#共同关注","children":[]},{"level":3,"title":"Feed流实现方案","slug":"feed流实现方案","link":"#feed流实现方案","children":[]},{"level":3,"title":"推送到粉丝收件箱","slug":"推送到粉丝收件箱","link":"#推送到粉丝收件箱","children":[]},{"level":3,"title":"实现分页查询收件箱","slug":"实现分页查询收件箱","link":"#实现分页查询收件箱","children":[]}]},{"level":2,"title":"附近商户","slug":"附近商户","link":"#附近商户","children":[{"level":3,"title":"GEO数据结构的基本用法","slug":"geo数据结构的基本用法","link":"#geo数据结构的基本用法","children":[]},{"level":3,"title":"导入店铺数据到GEO","slug":"导入店铺数据到geo","link":"#导入店铺数据到geo","children":[]},{"level":3,"title":"实现附近商户功能","slug":"实现附近商户功能","link":"#实现附近商户功能","children":[]}]},{"level":2,"title":"用户签到","slug":"用户签到","link":"#用户签到","children":[{"level":3,"title":"BitMap功能延迟","slug":"bitmap功能延迟","link":"#bitmap功能延迟","children":[]},{"level":3,"title":"实现签到功能","slug":"实现签到功能","link":"#实现签到功能","children":[]},{"level":3,"title":"签到统计","slug":"签到统计","link":"#签到统计","children":[]}]},{"level":2,"title":"UV统计","slug":"uv统计","link":"#uv统计","children":[{"level":3,"title":"HyperLogLog","slug":"hyperloglog","link":"#hyperloglog","children":[]},{"level":3,"title":"测试百万数据的统计","slug":"测试百万数据的统计","link":"#测试百万数据的统计","children":[]}]}],"git":{"createdTime":1709618715000,"updatedTime":1710075968000,"contributors":[{"name":"zhaoshuo","email":"apzs@foxmaill.com","commits":2}]},"readingTime":{"minutes":176.1,"words":52829},"filePathRelative":"back-advance/6.redis/README.md","localizedDate":"2024年3月5日","excerpt":"<blockquote>\\n<p>在此特别感谢黑马程序员提供的Redis课程</p>\\n</blockquote>\\n<p><a href=\\"https://www.bilibili.com/video/BV1cr4y1671t/?vd_source=18a82f96e03508099420ab5613d9d940\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">黑马程序员Redis入门到实战教程，深度透析redis底层原理+redis分布式锁+企业解决方案+黑马点评实战项目_哔哩哔哩_bilibili</a></p>\\n<h2> 初始Redis</h2>\\n<p>Redis是一种键值型的NoSQL数据库，这里有两个关键字</p>","autoDesc":true}');export{l as data};
