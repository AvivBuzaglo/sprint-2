'use strict'

let gElCanvas
let gCtx
let gCurrShape = 'text'

function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')

    renderGallery()
    // renderMeme()
}

function renderMeme() {
    clearCanvas()
    const MEME = getMeme()
    const TEXT = document.querySelector('input[name="text"]').value

    drawImg(MEME.img)

    if(MEME.selectedLine === 'line1') {
        (TEXT === '') ? setLine1Txt(MEME.text.line1) : setLine1Txt(TEXT)
    }

    if(MEME.selectedLine === 'line2') {
        (TEXT === '') ? setLine2Txt(MEME.text.line2) : setLine2Txt(TEXT)
    }

    if(MEME.secondLine && MEME.selectedLine === 'line2') {
        setTimeout(() => drawText(MEME.text.line1, MEME.pos.line1.x, MEME.pos.line1.y, MEME.color.outline, MEME.color.fill, MEME.fontSize), 100)
        setTimeout(() => drawText(TEXT || MEME.text.line2, MEME.pos.line2.x, MEME.pos.line2.y, MEME.color.outline, MEME.color.fill, MEME.fontSize), 100)
    } 
    if(MEME.secondLine && MEME.selectedLine === 'line1') {
        setTimeout(() => drawText(TEXT || MEME.text.line1, MEME.pos.line1.x, MEME.pos.line1.y, MEME.color.outline, MEME.color.fill, MEME.fontSize), 100)
        setTimeout(() => drawText(MEME.text.line2, MEME.pos.line2.x, MEME.pos.line2.y, MEME.color.outline, MEME.color.fill, MEME.fontSize), 100)
    }
    if(MEME.selectedLine === 'line1' && !MEME.secondLine) {
        setTimeout(() => drawText(TEXT || MEME.text.line1, MEME.pos.line1.x, MEME.pos.line1.y, MEME.color.outline, MEME.color.fill, MEME.fontSize), 100)
    }
    
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
    console.log(offsetX, offsetY);
    
    const MEME = getMeme()
    const line1 = MEME.pos.line1
    const line2 = MEME.pos.line2
    const line1_size = MEME.textSize.line1
    const line2_size = MEME.textSize.line2
    const line1_x_calc = {left: line1.x - (line1_size.width / 2), right: line1.x + (line1_size.width / 2)} 
    const line1_y_calc = {up: line1.y - line1_size.height, down: gElCanvas.height - line1.y} 
    const line2_x_calc = {left: line2.x - (line2_size.width / 2), right: line2.x + (line2_size.width / 2)} 
    const line2_y_calc = {up: line2.y - line2_size.height, down: gElCanvas.height - line2.y}
    console.log('line 1: ' ,line1_x_calc, '\n', line1_y_calc);
    console.log('line 2: ' ,line2_x_calc, '\n', line2_y_calc);
     
    if((line1_x_calc.left <= offsetX) && (offsetX <= line1_x_calc.right) && (line1_y_calc.up <= offsetY) && (offsetY <= line1.y)) {
        setSelectedByClick('line1')
        document.querySelector('input[name="text"]').value = ''
        renderMeme()
        return
    }
    else if((line2_x_calc.left <= offsetX) && (offsetX <= line2_x_calc.right) && (line2_y_calc.up <= offsetY) && (offsetY <= line2.y)) {
        if(!MEME.secondLine) return 
        setSelectedByClick('line2')
        document.querySelector('input[name="text"]').value = ''
        renderMeme()
        return
    }

    // if((line1.x - 100) <= offsetX && (line1.x + 100) >= offsetX && (line1.y - 30) <= offsetY && line1.y >= offsetY) {
    //     setSelectedByClick('line1')
    //     document.querySelector('input[name="text"]').value = ''
    //     renderMeme()
    // }
    // if((line2.x - 100) <= offsetX && (line2.x + 100) >= offsetX && (line2.y - 30) <= offsetY && line2.y >= offsetY) {
    //     if(!MEME.secondLine) return 
    //     setSelectedByClick('line2')
    //     document.querySelector('input[name="text"]').value = ''
    //     renderMeme()
    // }
}

function onImgSelect(imgUrl) {
    setImg(imgUrl)
    hiddenToggle()
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

function onFontSizeIncrease() {
    const currSize = getFontSize()
    const sizeCalc = currSize + 1
    const newSize = sizeCalc.toString() + 'px'
    setFontSize(newSize)
    renderMeme()
}

function onFontSizeDecrease() {
    const currSize = getFontSize()
    const sizeCalc = currSize - 1
    const newSize = sizeCalc.toString() + 'px'
    setFontSize(newSize)
    renderMeme()
}

function onFontSize(elFontSize) {
    const SIZE = elFontSize.value + 'px'
    setFontSize(SIZE)
}

function addLine() {
    const MEME = getMeme()
    if(MEME.secondLine) return
    
    MEME.secondLine = true

    if(MEME.selectedLine === 'line1') {
        onSwitchSelectedLine()
    }
    renderMeme()
}

function removeLine() {
    const MEME = getMeme()
    if(!MEME.secondLine) return

    MEME.secondLine = false

    if(MEME.selectedLine === 'line2') {
        onSwitchSelectedLine()
    }
    renderMeme()
}

// function onAddLine(elAddBtn) {
//     const MEME = getMeme()
//     const elLabel = document.querySelector('.second-line')
//     const elInput = document.querySelector('.second-line-input')
//     const elRemoveBtn = document.querySelector('.remove-line')
    
//     MEME.secondLine = true
//     elAddBtn.classList.add('hidden')
//     elLabel.classList.remove('hidden')
//     elInput.classList.remove('hidden')
//     elRemoveBtn.classList.remove('hidden')

//     if(MEME.selectedLine === 'line1') {
//         onSwitchSelectedLine()
//     }
//     renderMeme()
// }

// function onRemoveLine(elRemoveBtn) {
//     const MEME = getMeme()
//     const elLabel = document.querySelector('.second-line')
//     const elInput = document.querySelector('.second-line-input')
//     const elAddBtn = document.querySelector('.add-line')
    
//     MEME.secondLine = false
//     elRemoveBtn.classList.add('hidden')
//     elLabel.classList.add('hidden')
//     elInput.classList.add('hidden')
//     elAddBtn.classList.remove('hidden')

//     if(MEME.selectedLine === 'line2') {
//         onSwitchSelectedLine()
//     }
//     renderMeme()
// }

function onSwitchSelectedLine() {
    document.querySelector('input[name="text"]').value = ''
    setSelectedLine()
    renderMeme()
}

function onDownloadImg(elLink) {
    const dataURL = gElCanvas.toDataURL()
    elLink.href = dataURL
    elLink.download = 'My-Meme'
}

function hiddenToggle() {
    const elGallery = document.querySelector('.gallery')
    const elGalleryNav = document.querySelector('.gallery-nav')
    const elEditor = document.querySelector('.editor')
    const elCanvas = document.querySelector('.canvas-container')
    const elCategories = document.querySelector('.categories')
    
    elGallery.classList.toggle('hidden')
    elGalleryNav.classList.toggle('hidden')
    elEditor.classList.toggle('hidden')
    elCanvas.classList.toggle('hidden')
    elCategories.classList.toggle('hidden')
}

function calcLines() {
    const MEME = getMeme()
    const line1 = MEME.pos.line1
    const line2 = MEME.pos.line2
    const line1_size = MEME.textSize.line1
    const line2_size = MEME.textSize.line2
    const line1_x_calc = {left: line1.x - (line1_size.width / 2), right: line1.x + (line1_size.width / 2)} 
    const line1_y_calc = {up: line1.y - line1_size.height, down: gElCanvas.height - line1.y} 
    const line2_x_calc = {left: line2.x - (line2_size.width / 2), right: line2.x + (line2_size.width / 2)} 
    const line2_y_calc = {up: line2.y - line2_size.height, down: gElCanvas.height - line2.y}

    setTextSize(line1_size, line2_size)
}

