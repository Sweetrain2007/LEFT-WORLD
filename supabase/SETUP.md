# 留言墙上线前配置（当前未联网）

## 需要的真实配置
1. 在你自己的 Supabase 项目 SQL Editor 执行 `migrations/202610020001_message_wall.sql`。如果已有 messages 表先核对结构，勿删除已有表强行运行。
2. 在 Authentication 设置中开启 Anonymous Sign-Ins。保留现有匿名 session，不要在每次刷新时强制 sign out。
3. 把项目 URL 和 **publishable key（或 legacy anon key）**填入 `assets/message-wall/supabase-config.js`。绝不能填 secret/service_role 或数据库密码。
4. 也可设置环境变量 SUPABASE_URL、SUPABASE_PUBLISHABLE_KEY，然后手动运行 `node assets/message-wall/configure.mjs`。这是纯静态项目，Netlify 环境变量不会自动出现在浏览器；本任务没有修改构建/部署配置。
5. 在 SQL Editor 执行 `tests/messages_rls.sql`，验证两种身份及匿名请求的权限。测试包含临时记录，事务最后 rollback。

浏览器 SDK 固定为 @supabase/supabase-js 2.57.4，经 jsDelivr 加载。SDK/网络不可用会报轻量错误，不回退到本地假成功。

## 数据与审核
messages: id uuid, author_id uuid → auth.users, content 1–500 字, visibility public/private, status approved/pending/rejected, created_at timestamptz, x/y 0–100。

未发现旧屏蔽词实现，因此没有虚构屏蔽词。可由管理员向 message_wall_private.blocked_words 添加真实词条；before-insert trigger 在数据库内拒绝命中的留言（包括绕过前端的 API 请求）。词表不向浏览器开放。现阶段通过词表检查后 approved，public 可立即跨设备读取；这不是人工/AI审核。以后如要先审后发，修改服务器触发器赋值为 pending，并由可信后台审核，不要开放客户端 status 修改权限。

公开列表仅查询 public + approved，不筛作者；我的列表按当前 uid 查询，RLS 决定其能读哪些行。公开 SELECT 也允许未登录 anon；INSERT 仅 authenticated 且 author_id=auth.uid()。没有客户端 UPDATE/DELETE 权限。匿名身份属于 authenticated 数据库角色。

旧 localStorage 留言不再读取、不自动上传，不删除旧数据。仅 Supabase auth session 使用浏览器持久化。清除站点数据/换浏览器/换设备可能失去旧身份；没有身份恢复功能。

## 跨浏览器验收（配置好真实测试项目以后）
1. 普通浏览器 A 打开留言墙，发一条标注测试的 PUBLIC；无痕或另一浏览器 B 打开同一站点，点击小花，确认 PUBLIC 列表能看到它。
2. A 再发 PRIVATE；A 的 MY 应有两条；B 的 PUBLIC、MY 都不应包含该 PRIVATE。
3. A 刷新后 MY 仍识别 A。B 用 Network 的 API 请求直接按该私密 id 查询也应为空；勿向他人分享 A 的访问令牌。
4. A/B 的 MY 中，公共条目也只能属于各自身份。验证加载更多、网络失败保留草稿、不播放成功动画。
5. 验证数据库屏蔽词命中时没有 INSERT 结果、没有花朵；移除测试词后重试。
6. 测试记录由项目管理员在后台清理。前端没有删除权限。本任务未创建真实测试用户/留言。

当前测试限制：无真实 URL/key，未执行远程 migration，未实际完成 A/B 联网及真实 RLS 验收。`node supabase/tests/store.test.cjs` 只验证查询/提交流程，不等价于 RLS 或跨设备测试。

官方参考：https://supabase.com/docs/guides/auth/auth-anonymous
https://supabase.com/docs/guides/database/postgres/row-level-security
