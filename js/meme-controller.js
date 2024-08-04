'use strict'

let gElCanvas
let gCtx
let gCurrShape = 'text'

function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')

    renderGallery()
    renderMeme()
}

function renderMeme() {
    clearCanvas()
    const MEME = getMeme()
    const TEXT = document.querySelector('input[name="text"]').value
    
    if (TEXT === "" || TEXT === NaN) {
        setLineTxt('Hello World')
    } else {
        setLineTxt(TEXT)
    }
    
    
    
    drawImg(MEME.img)
    setTimeout(() => drawText(TEXT || MEME.text, MEME.pos.x, MEME.pos.y, MEME.color.outline, MEME.color.fill, MEME.fontSize), 100)    
}

function clearCanvas() {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
}

function drawImg(img) {
    const elImg = new Image()
    elImg.src = img
    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
    }
}

function drawText(text, x = 0, y = 0 , outlineColor = 'black', fillColor = 'white', fontSize = '40px Arial') {
    gCtx.lineWidth = 2
    gCtx.strokeStyle = outlineColor
    gCtx.fillStyle = fillColor
    gCtx.font = fontSize 
    gCtx.textAlign = 'center'
    gCtx.textBaseLine = 'middle'

    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
}

function onImgSelect(imgUrl) {
    setImg(imgUrl)
    renderMeme()
}

function onOutLineColor(elOutline) {
    const COLOR = elOutline.value
    setOutlineColor(COLOR)
}

function onFillColor(elFill) {
    const COLOR = elFill.value
    setFillColor(COLOR)
}

function onFontSize(elFontSize) {
    const SIZE = elFontSize.value + 'px'
    setFontSize(SIZE)
}

function onDownloadImg(elLink) {
    const dataURL = gElCanvas.toDataURL()
    elLink.href = dataURL
    elLink.download = 'My-Meme'
}
