# 联系人记录簿

一个功能完整的联系人管理系统，支持创建、读取、更新和删除联系人信息。

## 功能特性

- ✅ 完整的 CRUD 操作（创建、读取、更新、删除）
- ✅ 实时搜索功能（支持姓名、电话、邮箱）
- ✅ 智能粘贴识别 - 自动提取姓名、电话、地址
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

数据库连接已配置为使用 Vercel Neon 数据库。需要在环境变量中配置 `PGDATABASE_URL`。

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
3. **智能粘贴识别**：
   - 先复制联系人信息（如：`收货人:小可爱\n手机号码:18062591917\n地址信息: 山东省 青岛市...`）
   - 点击模态框右上角的"粘贴识别"按钮
   - 系统会自动提取并填入姓名、电话和地址
4. 使用搜索框快速查找联系人
5. 点击"编辑"按钮修改联系人信息
6. 点击"删除"按钮移除联系人（会有确认提示）

### 支持的粘贴格式

粘贴识别功能支持多种格式，自动提取以下信息：

- **姓名识别**：`收货人:`、`联系人:`、`姓名:`、`名字:`
- **电话识别**：11位手机号（1开头）、`手机号码:`、`电话:`、`联系方式:`
- **地址识别**：`地址信息:`、`收货地址:`、`地址:`、`详细地址:`

**示例格式**：
```
收货人:小可爱
手机号码:18062591917
地址信息: 山东省 青岛市 李沧区 浮山路街道 台柳路637号河南庄北小区12号楼4单元502
```

或者：
```
姓名：张三
电话：13800138000
地址：北京市朝阳区某某街道123号
```

## 部署说明

### Vercel 部署

应用已配置为使用 Vercel Neon 数据库，可以直接部署到 Vercel。

#### 环境变量配置

在 Vercel 项目设置中添加以下环境变量：

```
PGDATABASE_URL=postgresql://<username>:<password>@<host>/<database>?sslmode=require
```

请替换为实际的数据库连接信息。

#### 构建配置

项目已包含 `vercel.json` 配置文件，自动配置了正确的构建输出目录。

#### 部署步骤

1. 将代码推送到 GitHub
2. 在 Vercel 中导入项目
3. 配置环境变量 `PGDATABASE_URL`
4. 点击 Deploy

### 其他平台部署

确保在部署环境中设置 `PGDATABASE_URL` 环境变量。
