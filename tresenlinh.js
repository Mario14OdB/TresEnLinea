const ganador = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [6, 4, 2]]
let juega = ""
const donde = document.getElementsByClassName("casilla")
let n = 0
let finaliza = false

function evaluacion() {
  for (let i = 0; i < 8; i++) {
    if (donde[ganador[i][0]].textContent == donde[ganador[i][1]].textContent && donde[ganador[i][0]].textContent == donde[ganador[i][2]].textContent && donde[ganador[i][0]].textContent != "") {
      donde[ganador[i][0]].style.backgroundColor = "yellow"
      donde[ganador[i][1]].style.backgroundColor = "yellow"
      donde[ganador[i][2]].style.backgroundColor = "yellow"
      document.getElementById("mensaje").style.display = "block"
      return
    }
  }
}

function casigano() {
  for (let i = 0; i < 8; i++) {
    let aaa = 0
    let bbb = -1
    for (let j = 0; j < 3; j++) {
      if (donde[ganador[i][j]].textContent == "O") {
        aaa++
      } else if (donde[ganador[i][j]].textContent == "") {
        bbb = ganador[i][j]
      }
    }
    if (aaa == 2 && bbb != -1) {
      donde[bbb].textContent = juega
      finaliza = true
      return
    }
  }
}
function casipierdo() {
  for (let i = 0; i < 8; i++) {
    let aaa = 0
    let bbb = -1
    for (let j = 0; j < 3; j++) {
      if (donde[ganador[i][j]].textContent == "X") {
        aaa++
      } else if (donde[ganador[i][j]].textContent == "") {
        bbb = ganador[i][j]
      }
    }
    if (aaa == 2 && bbb != -1) {
      donde[bbb].textContent = juega
      finaliza = true
      return
    }
  }
}
function ataco() {
  for (let i = 0; i < 8; i++) {
    let aaa = 0
    let bbb = 0
    for (let j = 0; j < 3; j++) {
      if (donde[ganador[i][j]].textContent == "O") {
        aaa++
      } else if (donde[ganador[i][j]].textContent == "") {
        bbb++
      }
    }
    if (aaa == 1 && bbb == 2) {
      if (donde[ganador[i][0]].textContent == "") {
        donde[ganador[i][0]].textContent = juega
      } else {
        donde[ganador[i][2]].textContent = juega
      }
      return
    }
  }
}
function quitala() {
  for (let i = 0; i < 8; i++) {
    let aaa = 0
    let bbb = 0
    for (let j = 0; j < 3; j++) {
      if (donde[ganador[i][j]].textContent == "O") {
        aaa++
      } else if (donde[ganador[i][j]].textContent == "X") {
        bbb++
      }
    }
    if (aaa == 1 && bbb < 2) {
      if (donde[ganador[i][0]].textContent == "O") {
        donde[ganador[i][0]].textContent = ""
      } else if (donde[ganador[i][1]].textContent == "O") {
        donde[ganador[i][1]].textContent = ""
      } else {
        donde[ganador[i][2]].textContent = ""
      }
      n--
      return
    }
  }
}

function reinicio() {
  n = 0
  juega = ""
  for (let i = 0; i < donde.length; i++) {
    donde[i].textContent = ""
    donde[i].style.backgroundColor = "white"
    donde[i].removeEventListener("click", marca)
  }
  document.getElementById("mensaje").style.display = "none"

  document.getElementById("jugador1").style.backgroundColor = "white"
  document.getElementById("jugador2").style.backgroundColor = "white"
  document.getElementById("jugador1").addEventListener("click", inicio)
  document.getElementById("jugador2").addEventListener("click", inicio)
}

function marca(evv) {
  if (n == 6) {
    if (evv.currentTarget.textContent == juega) {
      evv.currentTarget.textContent = ""
      n--
      console.log(juega, n)
    }
  } else {
    if (evv.currentTarget.textContent == "") {
      evv.currentTarget.textContent = juega
      n++
      console.log(juega, n)
      //alert("")
      if (juega == "X") {
        juega = "O"
        document.getElementById("jugador1").style.backgroundColor = "white"
        document.getElementById("jugador2").style.backgroundColor = "green"
        automatico()
      }
      document.getElementById("jugador1").style.backgroundColor = "red"
      document.getElementById("jugador2").style.backgroundColor = "white"
      evaluacion()
    }
  }
}

function automatico() {
  finaliza = false
  n++
  if (n == 2) {
    if (donde[4].textContent == "") {
      donde[4].textContent = juega
    } else {
      donde[0].textContent = juega
    }
  } else if (n == 3) {
    if (donde[0].textContent == "X" || donde[5].textContent == "X" || donde[8].textContent == "X") {
      donde[2].textContent = juega
    } else if (donde[1].textContent == "X" || donde[2].textContent == "X" || donde[3].textContent == "X" || donde[6].textContent == "X") {
      donde[0].textContent = juega
    } else {
      donde[6].textContent = juega
    }
  } else {
    if (n > 6) {
      quitala()
    }
    casigano()
    if (!finaliza) {
      casipierdo()
      if (!finaliza) {
        ataco()
      }
    }
  } 
  console.log(juega, n)
  juega = "X"
}

function inicio(eee) {
  const aaa = eee.currentTarget.id
  for (let i = 0; i < donde.length; i++) {
    donde[i].textContent = ""
    donde[i].addEventListener("click", marca)
  }
  if (aaa == "jugador2") {
    juega = "O"
    donde[4].textContent = juega
    n++
  }
  console.log(juega, n)

  juega = "X"

  document.getElementById("jugador1").style.backgroundColor = "red"
  document.getElementById("jugador2").style.backgroundColor = "white"


  document.getElementById("jugador1").removeEventListener("click", inicio)
  document.getElementById("jugador2").removeEventListener("click", inicio)
}


document.getElementById("jugador1").addEventListener("click", inicio)
document.getElementById("jugador2").addEventListener("click", inicio)
document.getElementById("reinicia").addEventListener("click", reinicio)