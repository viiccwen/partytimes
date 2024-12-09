# PartyTimes 都不揪？

[![Next](https://img.shields.io/badge/nextjs-v14.1.4-black)](https://nextjs.org/)
[![Bun](https://img.shields.io/badge/Bun-v1.1.34-white)](https://bun.sh/)
[![Docker](https://img.shields.io/badge/Docker-Enabled-blue)](https://www.docker.com/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

揪團神器：視覺化輕鬆揪團、決定會議時間。

<img src="https://imgur.com/ghYB7u2.png">

---

## 功能 Features

### **功能 1**：視覺化投票、決定時間。

<img src="https://imgur.com/ZMbMEuJ.png">
<img src="https://imgur.com/LJ6KkGS.png">


### **功能 2**：使用者無需登入即可使用（僅創建者需登入）。
<img src="https://imgur.com/8ISy8EO.png">

### **功能 3**：支援 Oauth (Google, GitHub), Dark Mode。
<img src="https://imgur.com/NsfrdSu.png">
<img src="https://imgur.com/o7Jrrra.png">


## 快速開始 Quick Start

### 直接使用
Click Here 👉 https://partytimes.org/

### 本地使用

#### 需求條件 Prerequisites
- Bun
- Docker

#### 安裝 Installation

1. 克隆專案至本地：
   ```bash
   git clone https://github.com/viiccwen/partytimes.git
   cd partytimes
   ```

2. 安裝依賴：
   ```bash
   # for frontend
   cd frontend
   bun install

   # for backend
   cd backend
   bun install
   ```

3. 配置環境變數：
   - 複製 `.env.example` 並命名為 `.env`：
   - 修改 `.env` 文件中的相關配置。

4. 啟動應用程式：
   ```bash
   # for frontend
   cd frontend
   bun run dev # It's already on turbo mode

   # for backend
   cd backend
   bun run index.ts
   ```


## 文件結構 Project Structure

參閱 `/frontend` 和 `/backend` 資料夾內的 `README.md`


## 貢獻指南 Contributing

歡迎任何形式的貢獻！請遵循以下步驟：

1. Fork 此專案

2. 創建新的分支：
   ```bash
   git checkout -b {feature, bugfix, docs}/branch-name
   ```

3. 提交更改：
   ```bash
   git commit -m "{feature, bugfix, docs}: something"
   ```

4. 推送分支：
   ```bash
   git push origin feature/your-feature-name
   ```
   
5. 提交 Pull Request：
    1. 請詳細撰寫標題、簡介。
    2. 程式碼請簡潔易懂，能加上段落註解是最好。



## 常見問題 FAQ

**Q:** Technology Stack 是啥

* Next.js 14 - Frontend Framework (Not 15)
* TypeScript - Frontend Language
* Bun - Frontend/backend runtime
* Express.js - Backend Framwork
* Shadcn/ui - UI Package
* Lucide, simple icon - Icon Package
* supabase - Database
* Google Cloud Platform (Cloud Run) - Cloud Platform, Server
* Docker

## 授權 License

本專案採用 [MIT](LICENSE) 授權。

## 聯繫方式 Contact

- LinkedIn: [Guan Hua Wen](https://www.linkedin.com/in/guan-hua-wen-625bb0270/)
- GitHub: [viiccwen](https://github.com/viiccwen)