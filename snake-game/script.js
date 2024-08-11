const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const gridSize = 20; // 每个方块的大小
canvas.width = canvas.height = 400; // 画布的大小

let snake = [{x: gridSize * 2, y: gridSize * 2}];
let direction = {x: gridSize, y: 0}; // 初始方向向右
let food = {x: gridSize * 5, y: gridSize * 5}; // 初始食物位置
let gameOver = false;

// 监听键盘事件以改变方向
document.addEventListener('keydown', (e) => {
    switch(e.key) {
        case 'ArrowUp':
            if (direction.y === 0) direction = {x: 0, y: -gridSize};
            break;
        case 'ArrowDown':
            if (direction.y === 0) direction = {x: 0, y: gridSize};
            break;
        case 'ArrowLeft':
            if (direction.x === 0) direction = {x: -gridSize, y: 0};
            break;
        case 'ArrowRight':
            if (direction.x === 0) direction = {x: gridSize, y: 0};
            break;
    }
});

// 更新游戏状态
function update() {
    if (gameOver) return;

    // 移动蛇
    const newHead = {x: snake[0].x + direction.x, y: snake[0].y + direction.y};
    snake.unshift(newHead);

    // 检查是否吃到食物
    if (newHead.x === food.x && newHead.y === food.y) {
        // 生成新的食物
        food = {
            x: Math.floor(Math.random() * canvas.width / gridSize) * gridSize,
            y: Math.floor(Math.random() * canvas.height / gridSize) * gridSize
        };
    } else {
        // 如果没有吃到食物，移除蛇的最后一节
        snake.pop();
    }

    // 检查是否撞到墙或自己
    if (
        newHead.x < 0 || newHead.x >= canvas.width ||
        newHead.y < 0 || newHead.y >= canvas.height ||
        snake.slice(1).some(segment => segment.x === newHead.x && segment.y === newHead.y)
    ) {
        gameOver = true;
    }
}

// 绘制游戏画面
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 画蛇
    snake.forEach(segment => {
        ctx.fillStyle = 'lime';
        ctx.fillRect(segment.x, segment.y, gridSize, gridSize);
    });

    // 画食物
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, gridSize, gridSize);

    // 显示游戏结束信息
    if (gameOver) {
        ctx.fillStyle = 'white';
        ctx.font = '40px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Game Over', canvas.width / 2, canvas.height / 2);
    }
}

// 游戏循环
function gameLoop() {
    update();
    draw();
    if (!gameOver) {
        setTimeout(gameLoop, 100); // 控制游戏速度
    }
}

// 开始游戏
gameLoop();
