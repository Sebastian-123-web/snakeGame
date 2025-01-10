// TAMAÑO DEL CANVA
const alto = 450
const ancho = 450

// CARACTERISTICAS DE LA SERPIENTE
const snakeW = 10
const snakeH = 10
const snakeSpeed = 150
let snakeMotion = ""
let direction = "RIGHT"
let posX = 40
let posY = 40

// TECLADO
const KEY_LEFT=37;
const KEY_UP=38;
const KEY_RIGHT=39;
const KEY_DOWN=40;

// DEFINIENDO EL CANVA (COLOR DE FONDO Y TAMAÑO)
const scena = document.getElementById("snakegame")
scena.height = alto
scena.width = ancho

// MAIN
const main = () => {
    run()
}

// LA EJECUCION
function run() {
    snakePlayer()
    if (!snakeDead()) {
        setTimeout(run,snakeSpeed)
    }
    motion()
    paint()
    motionSnake()
    snakeEat()
    Eat()
}

// CREANDO COMIDA
let eat = scena.getContext("2d")
let eX = Math.floor((Math.random() * alto)/10) * 10
let eY = Math.floor((Math.random() * alto)/10) * 10
function Eat(){
    eat.fillStyle = "red"
    eat.fillRect(eX,eY,snakeW,snakeH)
}
function positionEatRamdom(){
    eX = Math.floor((Math.random() * alto)/10) * 10
    eY = Math.floor((Math.random() * alto)/10) * 10
}

function showGameOver() {
    eat.fillStyle = "red"; // Fondo semitransparente
    eat.fillRect(0, 0, canvas.width, canvas.height); // Cubre todo el canvas

    eat.fillStyle = "white"; // Color del texto
    eat.font = "bold 48px Arial"; // Fuente y tamaño del texto
    eat.textAlign = "center"; // Alineación horizontal
    eat.textBaseline = "middle"; // Alineación vertical
    eat.fillText("Game Over", canvas.width / 2, canvas.height / 2); // Texto centrado
}

// CREANDO NUESTRA SERPIENTE
let snake = scena.getContext("2d")

let snakeBody = [
    {x:posX,y:posY},
    {x:posX-10,y:posY},
    {x:posX-20,y:posY},
] 

function snakePlayer(){
    snake.fillStyle = "green"
}

// BORRAR RASTRO DEL SNAKE
function paint() {
    snake.clearRect(0,0,scena.width,scena.height)
    for(let snakeB of snakeBody){
        snake.fillRect(snakeB.x,snakeB.y,snakeW,snakeH)
    }
}

// MOVER DE ACUERDO AL TECLADO
function motion() {
    document.addEventListener("keydown", (e)=>{
        snakeMotion = e.key
    })
        if (snakeMotion == "ArrowRight" && direction != "LEFT") {
            direction = "RIGHT"
        }
        if (snakeMotion == "ArrowLeft" && direction != "RIGHT") {
            direction = "LEFT"
        }
        if (snakeMotion == "ArrowUp" && direction != "DOWN") {
            direction = "UP"
        }
        if (snakeMotion == "ArrowDown" && direction != "UP") {
            direction = "DOWN"
        }
}

function motionSnake() {
    let addHead = {...snakeBody[0]}
    if (direction == "RIGHT") {
        addHead.x += 10
    }
    if (direction == "LEFT") {
        addHead.x -= 10
    }
    if (direction == "UP") {
        addHead.y -= 10
    }
    if (direction == "DOWN") {
        addHead.y += 10
    }
    snakeBody.unshift(addHead)
    snakeBody.pop()
}

function snakeEat(){
    //console.log("EX: "+eX+" SX: "+snakeBody[0].x +" | EY: "+eY+" SY: "+snakeBody[0].y)
    if (snakeBody[1].x == eX && snakeBody[1].y == eY) {
        snakeBody.push({x:snakeBody[snakeBody.length - 1] - 10,y:posY})
        positionEatRamdom()
    }
}

function snakeDead(){
    if (snakeBody[0].x <= -1 || snakeBody[0].x >= ancho || snakeBody[0].y <= -1 || snakeBody[0].y >= alto) {
        console.log("SNAKE DEAD")
        return true
    }
    return false
}

main()