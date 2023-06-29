const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
//getContext() method會回傳一個canvas的drawing context
//drawing context可以用來在canvas內畫圖

const unit = 20; // 蛇大小
const row = canvas.heght / unit; // 400 / 20 = 20 
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

let direction = "";
window.addEventListener('keydown', (e) => {
    if (e.key == "ArrowLeft") {
        console.log("你正在案左鍵");
        direction = "ArrowLeft";
    }
    else if (e.key == "ArrowUp") {
        console.log("你正在案上鍵");
        direction = "ArrowUp";
    }
    else if (e.key == "ArrowRight") {
        console.log("你正在案右鍵");
        direction = "ArrowRight";
    }
    else if (e.key == "ArrowDown") {
        console.log("你正在案下鍵");
        direction = "ArrowDown";
    }
});



function draw() {
    // 背景清除方法一
    // ctx.clearRect(0, 0, canvas.width, canvas.height); //清除畫布

    // 背景清除方法二
    ctx.fillStyle = "aqua";  //給背景顏色;
    ctx.fillRect(0, 0, canvas.width, canvas.height); //填滿空間

    // 畫出蛇
    for (let i = 0; i < snake.length; i++) {
        if (i == 0) {
            ctx.fillStyle = "red";
        }
        else {
            ctx.fillStyle = "green";  //畫布填滿的顏色
        }
        ctx.strokeStyle = "white"; //外框顏色

        // .fillRect畫實心長方形
        // 填入參數 x, y, width, height
        ctx.fillRect(snake[i].x, snake[i].y, unit, unit); //實欣新
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
    snake.pop();
    console.log(snake.length);
    snake.unshift(newHead);
}

let myGame = setInterval(draw, 100); //100 = 0.1秒，持續執行function