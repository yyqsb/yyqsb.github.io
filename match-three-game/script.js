const gameBoard = document.getElementById('game-board');
const scoreDisplay = document.getElementById('score');
const width = 8;
const tiles = [];
const colors = ['red', 'yellow', 'orange', 'green', 'blue', 'purple'];
let score = 0;

// 创建游戏板
function createBoard() {
    for (let i = 0; i < width * width; i++) {
        const tile = document.createElement('div');
        tile.setAttribute('draggable', true);
        tile.setAttribute('id', i);
        let randomColor = Math.floor(Math.random() * colors.length);
        tile.style.backgroundColor = colors[randomColor];
        gameBoard.appendChild(tile);
        tiles.push(tile);
    }
}

createBoard();

// 拖拽功能
let colorBeingDragged;
let colorBeingReplaced;
let tileIdBeingDragged;
let tileIdBeingReplaced;

tiles.forEach(tile => tile.addEventListener('dragstart', dragStart));
tiles.forEach(tile => tile.addEventListener('dragend', dragEnd));
tiles.forEach(tile => tile.addEventListener('dragover', dragOver));
tiles.forEach(tile => tile.addEventListener('dragenter', dragEnter));
tiles.forEach(tile => tile.addEventListener('dragleave', dragLeave));
tiles.forEach(tile => tile.addEventListener('drop', dragDrop));

function dragStart() {
    colorBeingDragged = this.style.backgroundColor;
    tileIdBeingDragged = parseInt(this.id);
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
}

function dragLeave() {}

function dragDrop() {
    colorBeingReplaced = this.style.backgroundColor;
    tileIdBeingReplaced = parseInt(this.id);
    this.style.backgroundColor = colorBeingDragged;
    tiles[tileIdBeingDragged].style.backgroundColor = colorBeingReplaced;
}

function dragEnd() {
    let validMoves = [
        tileIdBeingDragged - 1,
        tileIdBeingDragged - width,
        tileIdBeingDragged + 1,
        tileIdBeingDragged + width
    ];
    let validMove = validMoves.includes(tileIdBeingReplaced);

    if (tileIdBeingReplaced && validMove) {
        tileIdBeingReplaced = null;
    } else if (tileIdBeingReplaced && !validMove) {
        tiles[tileIdBeingReplaced].style.backgroundColor = colorBeingReplaced;
        tiles[tileIdBeingDragged].style.backgroundColor = colorBeingDragged;
    } else {
        tiles[tileIdBeingDragged].style.backgroundColor = colorBeingDragged;
    }
}

// 检查匹配
function checkRowForThree() {
    for (let i = 0; i < 61; i++) {
        let rowOfThree = [i, i + 1, i + 2];
        let decidedColor = tiles[i].style.backgroundColor;
        const isBlank = tiles[i].style.backgroundColor === '';

        if (rowOfThree.every(index => tiles[index].style.backgroundColor === decidedColor && !isBlank)) {
            score += 3;
            scoreDisplay.textContent = score;
            rowOfThree.forEach(index => {
                tiles[index].style.backgroundColor = '';
            });
        }
    }
}

function checkColumnForThree() {
    for (let i = 0; i < 47; i++) {
        let columnOfThree = [i, i + width, i + width * 2];
        let decidedColor = tiles[i].style.backgroundColor;
        const isBlank = tiles[i].style.backgroundColor === '';

        if (columnOfThree.every(index => tiles[index].style.backgroundColor === decidedColor && !isBlank)) {
            score += 3;
            scoreDisplay.textContent = score;
            columnOfThree.forEach(index => {
                tiles[index].style.backgroundColor = '';
            });
        }
    }
}

function moveDown() {
    for (let i = 0; i < 55; i++) {
        if (tiles[i + width].style.backgroundColor === '') {
            tiles[i + width].style.backgroundColor = tiles[i].style.backgroundColor;
            tiles[i].style.backgroundColor = '';
            const firstRow = [0, 1, 2, 3, 4, 5, 6, 7];
            const isFirstRow = firstRow.includes(i);
            if (isFirstRow && tiles[i].style.backgroundColor === '') {
                let randomColor = Math.floor(Math.random() * colors.length);
                tiles[i].style.backgroundColor = colors[randomColor];
            }
        }
    }
}

function checkForMatches() {
    checkRowForThree();
    checkColumnForThree();
    moveDown();
}

window.setInterval(() => {
    checkForMatches();
}, 100);
