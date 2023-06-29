const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
//getContext() method會回傳一個canvas的drawing context
//drawing context可以用來在canvas內畫圖

const unit = 20; // 蛇大小
const row = canvas.height / unit; // 400 / 20 = 20 
const colum = canvas.width / unit; // 400 / 20 = 20

let snake = []; // array中的每個元素，都是一個物件
// 物件的工作，儲存身體x,y座標，初始設定4格身體
snake[0] = {
    x: 80,
    y: 0,
};

snake[1] = {
    x: 60,
    y: 0,
};

snake[2] = {
    x: 40,
    y: 0,
};

snake[3] = {
    x: 20,
    y: 0,
};


// 建立果實類別
class Fruit {
    constructor() {
        this.x = Math.floor(Math.random() * colum) * unit;
        this.y = Math.floor(Math.random() * row) * unit;
    }

    drawFruit() {
        ctx.fillStyle = "blue";
        ctx.fillRect(this.x, this.y, unit, unit);
    }

    //新位置
    pickAlocation() {
        let overlapping = false;
        let new_x;
        let new_y;

        // 避免與蛇重疊位置
        function checkOverlap(new_x, new_y) {
            for (let i = 0; i < snake.length; i++) {
                if (new_x == snake[i].x && new_y == snake[i].y) {
                    // console.log("overlapping...");
                    overlapping = true;
                    return true;
                }
                else {
                    overlapping = false;
                }
            }
        }

        do {
            new_x = Math.floor(Math.random() * colum) * unit;
            new_y = Math.floor(Math.random() * row) * unit;
            // console.log("果實可能的新座標", new_x, new_y);
            checkOverlap(new_x, new_y);
        } while (overlapping);
        this.x = new_x;
        this.y = new_y;
    }
}

// 建立果實物件
let fruits1 = new Fruit();
let CurrentScore = 0;
let HighScore = 0;

//監聽上下左右方向鍵事件
let direction = "ArrowRight";
window.addEventListener('keydown', (e) => {
    if ((e.key == "ArrowRight") && (direction != "ArrowLeft")) {
        // console.log("你正在案右鍵");
        direction = "ArrowRight";
    }
    else if ((e.key == "ArrowDown") && (direction != "ArrowUp")) {
        // console.log("你正在案下鍵");
        direction = "ArrowDown";
    }
    else if ((e.key == "ArrowLeft") && (direction != "ArrowRight")) {
        // console.log("你正在案左鍵");
        direction = "ArrowLeft";
    }
    else if ((e.key == "ArrowUp") && (direction != "ArrowDown")) {
        // console.log("你正在案上鍵");
        direction = "ArrowUp";
    }
});



function draw() {
    document.querySelector('#CurrentScore').innerHTML = "當前分數：" + CurrentScore;
    if (localStorage.getItem("HighScore") == null) {
        localStorage.setItem("HighScore", 0);
    }
    document.querySelector('#HighScore').innerHTML = "歷史高分：" + localStorage.getItem("HighScore");

    // 判斷蛇自殺
    for (let i = 1; i < snake.length; i++) {
        if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            // console.log("蛇死了");
            HighScoreUpdate();
            clearInterval(myGame);
            alert("蛇死了! 遊戲結束!");
            return;
        }
    }

    // 背景清除方法一
    // ctx.clearRect(0, 0, canvas.width, canvas.height); //清除畫布

    // 背景清除方法二
    ctx.fillStyle = "aqua";  //給背景顏色;
    ctx.fillRect(0, 0, canvas.width, canvas.height); //填滿空間


    fruits1.drawFruit();
    // 畫出蛇
    for (let i = 0; i < snake.length; i++) {
        if (i == 0) {
            ctx.fillStyle = "red";
        }
        else {
            ctx.fillStyle = "green";  //畫布填滿的顏色
        }
        ctx.strokeStyle = "white"; //外框顏色


        // 蛇穿牆  座標超出畫布外 設定在另一邊的初始值
        if (snake[i].x >= canvas.width) {
            snake[i].x = 0;
        }
        else if (snake[i].x < 0) {
            snake[i].x = canvas.width;
        }
        else if (snake[i].y >= canvas.height) {
            snake[i].y = 0;
        }
        else if (snake[i].y < 0) {
            snake[i].y = canvas.height;
        }


        // .fillRect畫實心長方形
        // 填入參數 x, y, width, height
        ctx.fillRect(snake[i].x, snake[i].y, unit, unit); //實心
        ctx.strokeRect(snake[i].x, snake[i].y, unit, unit); // 外框
    }

    // 以目前的direction變數方向，決定蛇的下一帪要放在哪個座標
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
    if (direction == "ArrowLeft") {
        snakeX -= unit;
    }
    else if (direction == "ArrowUp") {
        snakeY -= unit;
    }
    else if (direction == "ArrowRight") {
        snakeX += unit;
    }
    else if (direction == "ArrowDown") {
        snakeY += unit;
    }

    // 蛇頭下一個位置
    let newHead = {
        x: snakeX,
        y: snakeY,
    };

    //確認蛇頭是否有吃到果實
    if (snake[0].x == fruits1.x && snake[0].y == fruits1.y) {
        fruits1.pickAlocation();  // 重新選出新的隨機位置，畫出新果實
        CurrentScore++; // 更新分數
    } else {
        snake.pop();
    }
    snake.unshift(newHead);
}

// 歷史高分紀錄更新
function HighScoreUpdate() {
    if (CurrentScore > localStorage.getItem("HighScore")) {
        HighScore = CurrentScore;
        localStorage.setItem("HighScore", HighScore);
        document.querySelector('#HighScore').innerHTML = "歷史高分：" + localStorage.getItem("HighScore");
    }
}

let myGame = setInterval(draw, 100); //100 = 0.1秒，持續執行function