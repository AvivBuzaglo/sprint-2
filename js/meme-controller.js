'use strict'

let gElCanvas
let gCtx
let gCurrShape = 'text'

function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')

    renderMeme()
    // drawImg()
}

function renderMeme() {
    const MEME = getMeme()
    const TEXT = document.querySelector('input[name="text"]').value
    setLineTxt(TEXT)
    
    
    drawImg(MEME.img)
    setTimeout(() => drawText(TEXT || MEME.text, MEME.pos.x, MEME.pos.y), 100)    
}

function drawImg(img) {
    const elImg = new Image()
    elImg.src = img
    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
    }
}

function drawText(text, x = 200, y = 200) {
    gCtx.lineWidth = 2
    gCtx.strokeStyle = 'brown'
    gCtx.fillStyle = 'black'
    gCtx.font = '40px Arial'
    gCtx.textAlign = 'center'
    gCtx.textBaseLine = 'middle'

    gCtx.strokeText(text, x, y)
}