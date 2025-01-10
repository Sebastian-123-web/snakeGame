// TAMAÑO DEL CANVA
const alto = 450
const ancho = 450

const scena = document.getElementById("snakegame")
scena.height = alto
scena.width = ancho

let ctx = scena.getContext("2d")

// INICIAR JUEGO
const enter = document.getElementById("start-game")
document.addEventListener("keydown",(e)=>{
    if (e.key == "Enter") {
        main()
    }
})

function main(){
    console.log("juego iniciado")
    enter.style.display = "none"
}

function run(){
    
}