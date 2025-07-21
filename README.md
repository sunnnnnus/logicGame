# 🐢 海龜湯邏輯猜謎遊戲（Logic Guessing Game）

這是一個互動式的邏輯猜謎遊戲平台，玩家可根據題目提示進行提問與猜測，系統會結合 AI 回應進行判斷，讓遊戲更具互動性與智慧性。

本專案採用 Node.js 開發後端，搭配 MySQL 作為資料庫，前端使用原生 JavaScript 串接 API，實現即時互動功能，並整合 Gemini API 進行邏輯答案判斷。

---

## 🌐 線上 Demo

👉 [點我立即體驗 Logic Game]([https://logicgame.onrender.com)

（建議用桌機或手機瀏覽器開啟）

---

## 🚀 專案特色

- 題庫儲存在 MySQL 資料庫，包含題幹、解答與敘述提示
- 玩家輸入猜測，系統將透過 Gemini AI 回傳答案回饋
- 回饋類型包括：「正確」、「接近」、「不相關」
- 支援題目輪播、答題紀錄與基本遊戲 UI
  
---

## 🤖 Gemini API 整合說明

- 當使用者輸入猜測內容時，伺服器會呼叫 Gemini API 並將題目敘述與答案一併傳入 prompt
- Gemini 回傳的語意判斷結果會被解析為三種分類：
  - `正確`：回答符合正解邏輯
  - `接近`：邏輯方向正確但內容尚不完整
  - `不相關`：完全偏離主題

---

## 🛠️ 使用技術

| 技術項目 | 說明 |
|----------|------|
| Node.js | 開發伺服器與 API |
| Express | 建立 RESTful 路由與中介處理 |
| MySQL | 儲存題庫資料與玩家紀錄 |
| JavaScript | 前端互動與 API 串接 |
| Gemini API | 使用 Google Gemini 進行 AI 回答判斷 |
| Railway | 專案部署平台（後端） |
---

## 🧰 使用技術

| 類別 | 技術 |
|------|------|
| 前端 | HTML / CSS / JavaScript |
| 後端 | Node.js / Express |
| 資料庫 | MySQL |
| Gemini API | 使用 Google Gemini 進行 AI 回答判斷 |
| 開發工具 | Visual Studio Code / Postman / Ngrok |
| 版本控制 | Git + GitHub |

---

## 📂 專案結構

logic-game/<br/>
├── public/ # 靜態前端檔案<br/>
│ └── index.html<br/>
├── server.js # Node.js 伺服器啟動主程式<br/>
├── db.js # 資料庫連線設定<br/>
├── routes/<br/>
│ └── question.js # API 路由<br/>
├── .env # 環境變數（請勿上傳）<br/>
├── package.json<br/>
└── README.md<br/>


---


## 🖼️ 畫面預覽


[遊戲主畫面]<br/>
<img width="600" height="480" alt="截圖 2025-07-21 上午3 25 28" src="https://github.com/user-attachments/assets/607e17ae-0c49-4657-8bf3-99cb4cb30a7f" />
<br/>
[顯示題目]<br/>
<img width="600" height="480" alt="截圖 2025-07-21 上午3 25 07" src="https://github.com/user-attachments/assets/fbe8d9c4-2a71-4a42-a01a-8d459f0ac084" />
<br/>

---

🙋‍♀️ 開發者

Jamie
GitHub｜正在努力轉職成為全端工程師 🧑‍💻
歡迎交流與指教！
