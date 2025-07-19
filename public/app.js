let currentId = null;
let currentHintIndex = 0;
let hints = [];

const startBtn = document.getElementById("startBtn");
const hintBtn = document.getElementById("hintBtn");

// 開始出題
startBtn.addEventListener("click", ()=>{
    startBtn.innerText="下一題";
    response.innerText = "";
    fetch("/api/question")
      .then(res =>res.json())
      .then(({ data }) =>{
        currentId = data.qId;
        document.getElementById("qText").innerText=data.content;
        document.getElementById("qBox").style.display="block";
        currentHintIndex=0;
        hints=[data.hint1, data.hint2, data.hint3];
        document.getElementById("hintList").innerHTML="";
        console.log(data);
      })
      .catch(err => console.log(err));
});

// 提示按鈕
hintBtn.addEventListener("click", ()=>{
    if(currentHintIndex < hints.length){
        const li = document.createElement("li");
        li.innerText= hints[currentHintIndex];
        document.getElementById("hintList").appendChild(li);
        currentHintIndex++;
    }else{
        alert("沒有更多提示了！");
    }
});

// 送出按鈕讀使用者輸入
const input = document.getElementById("input");
const btn = document.getElementById("btn");
const response = document.getElementById("response");

btn.addEventListener("click", ()=>{
    const guess = input.value;
    if(!guess){
        alert("請輸入你的猜測");
        return;
    }

    response.innerText = "";

    //送猜測到後端
    fetch("/api/guess", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            qId: currentId,
            guess: guess
        })
    })
      .then(res => res.json())
      .then(json => {
        if (json.success) {
            response.innerText = json.result;
        } 
      })
      .catch(err =>{
        console.log(err);
        response.innerText="連線錯誤";
      });
      input.value="";
});

// 直接顯示答案
const showAnswerBtn = document.getElementById("showAnswerBtn");

showAnswerBtn.addEventListener("click", () => {
    fetch("/api/answer", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ qId: currentId })
    })
    .then(res => res.json())
    .then(json => {
        response.innerText = `💡 正確解答是：「${json.answer}」`;
    })
    .catch(err => {
        console.log(err);
        response.innerText = "⚠️ 無法取得答案";
    });
});
