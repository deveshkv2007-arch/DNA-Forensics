
const board = document.getElementById("board");
document.getElementById("next").addEventListener("click", function ()
{
    nextgen();
});
let running = false;
let intervalId = null;

document.getElementById("start").addEventListener("click", function () {
    if (running) return;

    running = true;

    intervalId = setInterval(function () {
        nextgen();
    }, 100); // 100 ms between generations
});

document.getElementById("stop").addEventListener("click", function () {
    running = false;
    clearInterval(intervalId);
});
document.getElementById("clear").addEventListener("click",function(){
    for (let row = 0; row < rows; row++)
{
    for (let col = 0; col < cols; col++)
    {
        gameBoard[row][col] = 0;
    }
}
drawboard()
})
let gameBoard = [];
const rows = 50;
const cols = 50;
let cellElements = [];

for (let row = 0; row < rows; row++)
{
        gameBoard[row] = [];

    for (let col = 0; col < cols; col++)
    {
        gameBoard[row][col] = 0;
    }
}

for (let row = 0; row < 50; row++)
{
    cellElements[row] = [];
    for (let col = 0; col < 50; col++)
    {

        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.row = row;
        cell.dataset.col = col;
        cell.addEventListener("click", function() {
        console.log(cell.dataset.row, cell.dataset.col);
        if(cell.classList.contains("alive"))
            {
                cell.classList.remove("alive")
                gameBoard[cell.dataset.row][cell.dataset.col] = 0;
            }
        else
            {
                cell.classList.add("alive")
                gameBoard[cell.dataset.row][cell.dataset.col] = 1;
            }
        });
        cellElements[row][col] = cell;
        

        board.appendChild(cell);
    }
}



function countneighbours(row, col)
{   
    let n = 0;
    for(let dr=-1;dr<=1;dr++)
        {   
            let tr = row+dr
            for(let dc=-1;dc<=1;dc++)
                {   
                    let tc = col + dc
                    if(dr==0&&dc==0){continue;}
                    if((tr>=0)&&(tr<rows)&&(tc>=0)&&(tc<cols))
                        {
                            if (gameBoard[tr][tc]==1)
                                {
                                    n++;
                                }
                        }
                }
        }
    return n;
}
function drawboard()
{
    for (let row = 0; row < rows; row++)
    {
        for (let col = 0; col < cols; col++)
        {
            let cell = cellElements[row][col];
            if(gameBoard[row][col] == 1)
                {
                    cell.classList.add("alive");
                }
            else
                {
                    cell.classList.remove("alive");
                }
        }
    }
}

function nextgen()
{
    let nextBoard = [];

    for (let row = 0; row < rows; row++)
    {
        nextBoard[row] = [];

        for (let col = 0; col < cols; col++)
        {
            nextBoard[row][col] = 0;
        }
    }
    for (let row = 0; row < rows; row++)
    {
        for (let col = 0; col < cols; col++)
        {
            let neighbours = countneighbours(row, col);
            
            
            if (gameBoard[row][col] == 1)
            {
                if(neighbours<2||neighbours>3)
                {
                    nextBoard[row][col]=0;
                }
                else
                {
                    nextBoard[row][col]=1;
                }
            }
            else
            {
                if(neighbours==3)
                {
                    nextBoard[row][col]=1;
                }
                
            }
        }
    }
    gameBoard = nextBoard;
    drawboard()
}





