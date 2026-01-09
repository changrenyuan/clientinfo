# 联系人记录簿

一个功能完整的联系人管理系统，支持创建、读取、更新和删除联系人信息。

## 功能特性

- ✅ 完整的 CRUD 操作（创建、读取、更新、删除）
- ✅ 实时搜索功能（支持姓名、电话、邮箱）
- ✅ 分页浏览
- ✅ 响应式设计，支持移动端
- ✅ 数据持久化存储
- ✅ 美观的现代化 UI

## 数据库字段

- **ID** - 自动生成的 UUID
- **姓名** - 必填
- **性别** - 选填（男/女/其他）
- **年龄** - 选填
- **电话** - 必填
- **身份证号** - 选填
- **邮箱** - 选填
- **公司** - 选填
- **地址** - 选填
- **备注** - 选填
- **创建时间** - 自动记录
- **更新时间** - 自动记录

## 技术栈

- **前端**: Next.js 16 (App Router), React 19, TypeScript 5, Tailwind CSS 4
- **后端**: Next.js API Routes
- **数据库**: PostgreSQL (Vercel Neon)
- **ORM**: Drizzle ORM

## 环境配置

数据库连接已配置为使用 Vercel Neon 数据库：

```
PGDATABASE_URL=postgresql://neondb_owner:npg_jHA5l3TvMcWp@ep-orange-art-a1hbh3b9-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require
```

## 开发命令

### 安装依赖
```bash
pnpm install
```

### 启动开发服务器
```bash
pnpm dev
```

应用将在 http://localhost:5000 上运行

### 构建生产版本
```bash
pnpm build
```

### 启动生产服务器
```bash
pnpm start
```

### 数据库操作

同步数据库模型到本地：
```bash
coze-coding-ai db generate-models
```

将本地模型变更推送到数据库：
```bash
coze-coding-ai db upgrade
```

## API 端点

### 获取联系人列表
```
GET /api/contacts?page=1&limit=10&search=关键词
```

### 创建联系人
```
POST /api/contacts
Content-Type: application/json

{
  "name": "张三",
  "gender": "男",
  "age": 30,
  "phone": "13800138000",
  "email": "zhangsan@example.com",
  "company": "ABC公司",
  "address": "北京市朝阳区"
}
```

### 获取单个联系人
```
GET /api/contacts/:id
```

### 更新联系人
```
PUT /api/contacts/:id
Content-Type: application/json

{
  "name": "张三更新",
  "age": 31
}
```

### 删除联系人
```
DELETE /api/contacts/:id
```

## 数据库架构

表名：`contacts`

| 字段名 | 类型 | 约束 |
|--------|------|------|
| id | varchar(36) | PRIMARY KEY |
| name | varchar(128) | NOT NULL |
| gender | varchar(10) | - |
| age | integer | - |
| phone | varchar(20) | NOT NULL |
| id_card | varchar(18) | - |
| address | text | - |
| email | varchar(255) | - |
| company | varchar(255) | - |
| notes | text | - |
| created_at | timestamp | NOT NULL, DEFAULT NOW() |
| updated_at | timestamp | - |

索引：
- `contacts_name_idx` - 姓名索引
- `contacts_phone_idx` - 电话索引

## 使用说明

1. 打开应用后，您将看到联系人列表页面
2. 点击"添加联系人"按钮创建新联系人
3. 使用搜索框快速查找联系人
4. 点击"编辑"按钮修改联系人信息
5. 点击"删除"按钮移除联系人（会有确认提示）

## 部署说明

应用已配置为使用 Vercel Neon 数据库，可以直接部署到 Vercel 或其他平台。确保在部署环境中设置 `PGDATABASE_URL` 环境变量。
