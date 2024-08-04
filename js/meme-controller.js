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
    const TEXT1 = document.querySelector('input[name="text1"]').value
    const TEXT2 = document.querySelector('input[name="text2"]').value
    
    if (TEXT1 === "") {
        setLine1Txt('Hello World')
    } else {
        setLine1Txt(TEXT1)
    }

    if(MEME.secondLine) {
        if (TEXT2 === "") {
            setLine2Txt('Bye World')
        } else {
            setLine2Txt(TEXT2)
        }
    }
    
    drawImg(MEME.img)
    setTimeout(() => drawText(TEXT1 || MEME.text.line1, MEME.pos.line1.x, MEME.pos.line1.y, MEME.color.outline, MEME.color.fill, MEME.fontSize), 100)
    if(MEME.secondLine) setTimeout(() => drawText(TEXT2 || MEME.text.line2, MEME.pos.line2.x, MEME.pos.line2.y, MEME.color.outline, MEME.color.fill, MEME.fontSize), 100)
    
    if(MEME.selectedLine === 'line1') setTimeout(() => drawRect(MEME.pos.line1.x, MEME.pos.line1.y), 110)
    if(MEME.selectedLine === 'line2') setTimeout(() => drawRect(MEME.pos.line2.x, MEME.pos.line2.y), 110)
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

function drawRect(x, y) {
    gCtx.beginPath()
    gCtx.strokeStyle = 'black'
    gCtx.lineWidth = 2
    gCtx.rect(x - 110, y - 37, 220, 50)
    gCtx.stroke()
}

function onDraw(ev) {
    const {offsetX, offsetY} = ev
    const MEME = getMeme()
    const line1 = MEME.pos.line1
    const line2 = MEME.pos.line2
    // console.log('offset x: ', offsetX, '\n', 'offset y: ', offsetY)
    
    if((line1.x - 100) <= offsetX && (line1.x + 100) >= offsetX && (line1.y - 30) <= offsetY && line1.y >= offsetY) {
        setSelectedByClick('line1')
        renderMeme()
    }
    if((line2.x - 100) <= offsetX && (line2.x + 100) >= offsetX && (line2.y - 30) <= offsetY && line2.y >= offsetY) {
        if(!MEME.secondLine) return 
        setSelectedByClick('line2')
        renderMeme()
    }
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

function onAddLine(elAddBtn) {
    const MEME = getMeme()
    const elLabel = document.querySelector('.second-line')
    const elInput = document.querySelector('.second-line-input')
    const elRemoveBtn = document.querySelector('.remove-line')
    
    MEME.secondLine = true
    elAddBtn.classList.add('hidden')
    elLabel.classList.remove('hidden')
    elInput.classList.remove('hidden')
    elRemoveBtn.classList.remove('hidden')

    if(MEME.selectedLine === 'line1') {
        onSwitchSelectedLine()
    }
    renderMeme()
}

function onRemoveLine(elRemoveBtn) {
    const MEME = getMeme()
    const elLabel = document.querySelector('.second-line')
    const elInput = document.querySelector('.second-line-input')
    const elAddBtn = document.querySelector('.add-line')
    
    MEME.secondLine = false
    elRemoveBtn.classList.add('hidden')
    elLabel.classList.add('hidden')
    elInput.classList.add('hidden')
    elAddBtn.classList.remove('hidden')

    if(MEME.selectedLine === 'line2') {
        onSwitchSelectedLine()
    }
    renderMeme()
}

function onSwitchSelectedLine() {
    setSelectedLine()
    renderMeme()
}

function onDownloadImg(elLink) {
    const dataURL = gElCanvas.toDataURL()
    elLink.href = dataURL
    elLink.download = 'My-Meme'
}
