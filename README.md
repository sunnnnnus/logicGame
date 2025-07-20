# 🧠 Logic Game - 海龜湯互動小遊戲

這是一個以 Node.js 建立的互動式小遊戲專案，靈感來自經典推理遊戲「海龜湯」
使用者可以透過前端頁面與後端互動，每次點擊會獲得一題隨機的推理題目（從 MySQL 資料庫中抽出）

---

## 🚀 功能介紹

- 後端使用 Node.js + Express 框架開發
- 使用 MySQL 資料庫儲存海龜湯題庫
- 前端使用 HTML/CSS/JavaScript 打造互動介面
- 按下按鈕後即顯示一題隨機題目
- 支援 API 串接，可未來擴充為多人答題等遊戲模式

---

## 🧰 使用技術

| 類別 | 技術 |
|------|------|
| 前端 | HTML / CSS / JavaScript |
| 後端 | Node.js / Express |
| 資料庫 | MySQL |
| 開發工具 | Visual Studio Code / Postman / Ngrok |
| 版本控制 | Git + GitHub |

---

## 📂 專案結構

logic-game/
├── public/ # 靜態前端檔案
│ └── index.html
├── server.js # Node.js 伺服器啟動主程式
├── db.js # 資料庫連線設定
├── routes/
│ └── question.js # API 路由
├── .env # 環境變數（請勿上傳）
├── package.json
└── README.md


---


## 🖼️ 畫面預覽


[遊戲主畫面]<br/>
<img width="600" height="480" alt="截圖 2025-07-21 上午3 25 28" src="https://github.com/user-attachments/assets/607e17ae-0c49-4657-8bf3-99cb4cb30a7f" />
<br/>
[顯示題目]<br/>
<img width="600" height="480" alt="截圖 2025-07-21 上午3 25 07" src="https://github.com/user-attachments/assets/fbe8d9c4-2a71-4a42-a01a-8d459f0ac084" />
<br/>


目前尚未部署至線上平台，因此僅支援本地執行。
未來可考慮搭配 Render / Vercel / PlanetScale 等平台進行完整部署。

🙋‍♀️ 開發者

唯瑄
GitHub｜正在努力轉職成為全端工程師 🧑‍💻
歡迎交流與指教！
