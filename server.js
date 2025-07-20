require('dotenv').config();
const express = require('express');
const app = express();
const db = require('./db');
const cors = require('cors');
const port = process.env.PORT || 3000;
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));


// middleware
app.use(cors()); // 允許跨網域訪問
app.use(express.json()); // 解析JSON格式的請求
app.use(express.static("public"));

app.get('/test-db', (req, res) => {
  db.query('SELECT 1', (err, rows) => {
    if (err) {
      // 當資料庫有錯誤時，回傳 500 錯誤
      return res.status(500).json({ success: false, error: err.message });
    }
    // 如果查詢成功，回傳 success true
    res.json({ success: true });
  });
});

// 首頁API
app.get("/", (req, res) => {
  res.send("🧠 歡迎來到海龜湯 API！請打 /api/question 看題目");
});

// 拿題目API
app.get("/api/question", (req, res)=>{
    db.query("SELECT * FROM questions ORDER BY RAND() LIMIT 1", (err, result)=>{
        if(err) return res.status(500).json({ sucess: false , error: err});
        res.json({ success: true, data: result[0]});
    });
});

app.listen(port , ()=>{
    console.log(`server run on http://localhost:${port}/api/question`);
});

//拿答案API
app.get("/answer/:id", (req,res)=>{
   const {id} = req.params;
   db.query("SELECT answer FROM questions WHERE qId = ?", [id], (err, result)=>{
    if(err) return res.status(500).json({ success: false , error: err});
    if(result.length ===0) return res.status(404).json({ success: true, error: err});
    res.json({ success:true, data: result[0]});
   }); 
});

//拿提示API
app.get("/api/hints/:id", (req,res)=>{
   const {id} = req.params;
   db.query("SELECT hint1, hint2, hint3 FROM questions WHERE qId = ?", [id], (err, result)=>{
    if(err) return res.status(500).json({ success: false , error: err});
    if(result.length ===0) return res.status(404).json({ success: true, error: err});
    res.json({ success:true, data: result[0]});
   }); 
});

//讀取使用者猜測回覆
app.post("/api/guess", (req, res) => {
    const { qId, guess } = req.body;
    if (!qId || !guess) {
        return res.status(400).json({ success: false, error: "缺少參數" });
    }

    db.query("SELECT content, answer FROM questions WHERE qId = ?", [qId], (err, result) => {
        if (err) return res.status(500).json({ success: false, error: err });
        if (result.length === 0) return res.status(404).json({ success: false, error: "找不到題目" });

        const correct = result[0].answer;

        // 送給 Gemini
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;

        const bodyData = JSON.stringify({
            contents: [
                {
                    role: "user",
                    parts: [
                        {
                            text: `猜測：「${guess}」
                            正確答案是：「${correct}」

                            請判斷使用者的猜測是否正確，或接近正確。
                            只回覆：
                            - 正確
                            - 接近
                            - 不相關
                            不要加其他文字。`
                        }
                    ]
                }
            ]
        });

        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json" 
            },
            body: bodyData
        })
            .then(response => response.json())
            .then(json => {
                //console.log("🔥 Gemini 原始回應：", JSON.stringify(json, null, 2));

                const aiReply = json?.candidates?.[0]?.content?.parts?.[0]?.text.trim() || "";
                console.log("Gemini 回應：", aiReply);

                if (aiReply === "正確") {
                res.json({ success: true, result: `✅ 恭喜你答對了！答案是：「${correct}」` });
                } else if (aiReply === "接近") {
                    res.json({ success: true, result: "🧐 你猜得滿接近的喔～" });
                } else if (aiReply === "不相關") {
                    res.json({ success: true, result: "❌ 無關！再想一下～" });
                } else {
                    res.json({ success: true, result: "🤖 AI 沒說清楚，再猜一次吧！" });
                }
            })
            .catch(err => {
                console.error("Gemini API 錯誤：", err);
                res.status(500).json({ success: false, error: "AI 判斷失敗" });
            });
    });
    
});

// 直接顯示答案
app.post("/api/answer", (req, res) => {
    const { qId } = req.body;
    if (!qId) return res.status(400).json({ success: false, error: "缺少題目 ID" });

    db.query("SELECT answer FROM questions WHERE qId = ?", [qId], (err, result) => {
        if (err) return res.status(500).json({ success: false, error: err });
        if (result.length === 0) return res.status(404).json({ success: false, error: "找不到題目" });

        res.json({ success: true, answer: result[0].answer });
    });
});



app.listen(port, "0.0.0.0", () => {
  console.log(`🚀 伺服器已啟動：http://localhost:${port}`);
});