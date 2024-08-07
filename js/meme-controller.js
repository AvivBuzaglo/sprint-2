'use strict'

let gElCanvas
let gCtx
let gStartPos
let gCurrShape = 'text'

function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')

    addMouseListeners()
    addTouchListener()
    renderGallery()
}

function renderMeme() {
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
    
    setTimeout(clacTextSize, 108)
    if(MEME.selectedLine === 'line1') setTimeout(() => drawRect(MEME.pos.line1.x, MEME.pos.line1.y, MEME.textSize.line1.width, MEME.textSize.line1.height), 110)
    if(MEME.selectedLine === 'line2') setTimeout(() => drawRect(MEME.pos.line2.x, MEME.pos.line2.y, MEME.textSize.line2.width, MEME.textSize.line2.height), 110)
}

function renderMyMeme() {
    const MEME = getMeme()
    // const TEXT = document.querySelector('input[name="text"]').value

    drawImg(MEME.img)

    setTimeout(() => drawText(MEME.text.line1, MEME.pos.line1.x, MEME.pos.line1.y, MEME.color.outline, MEME.color.fill, MEME.fontSize), 100)
    if(MEME.secondLine) setTimeout(() => drawText(MEME.text.line2, MEME.pos.line2.x, MEME.pos.line2.y, MEME.color.outline, MEME.color.fill, MEME.fontSize), 100)
    setTimeout(clacTextSize, 108)
    if(MEME.selectedLine === 'line1') setTimeout(() => drawRect(MEME.pos.line1.x, MEME.pos.line1.y, MEME.textSize.line1.width, MEME.textSize.line1.height), 110)
    if(MEME.selectedLine === 'line2') setTimeout(() => drawRect(MEME.pos.line2.x, MEME.pos.line2.y, MEME.textSize.line2.width, MEME.textSize.line2.height), 110)
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

function check() {
    console.log('hey');
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

function drawRect(x, y, lineWidth, lineHeight) {
    gCtx.beginPath()
    gCtx.strokeStyle = 'black'
    gCtx.lineWidth = 2
    gCtx.rect(x - (lineWidth / 2) - 15, y - lineHeight, lineWidth + 30, lineHeight + 10)
    gCtx.stroke()
}

function onDraw(ev) {
    const {offsetX, offsetY} = ev
    const MEME = getMeme()
    const line1 = MEME.pos.line1
    const line2 = MEME.pos.line2
    const line1_size = MEME.textSize.line1
    const line2_size = MEME.textSize.line2
    const line1_x_calc = {left: line1.x - (line1_size.width / 2), right: line1.x + (line1_size.width / 2)} 
    const line1_y_calc = {up: line1.y - line1_size.height, down: gElCanvas.height - line1.y} 
    const line2_x_calc = {left: line2.x - (line2_size.width / 2), right: line2.x + (line2_size.width / 2)} 
    const line2_y_calc = {up: line2.y - line2_size.height, down: gElCanvas.height - line2.y}

    setTextSize(line1_size.width, line2_size.width)
     
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
}

function onImgSelect(imgUrl) {
    setImg(imgUrl)
    hiddenToggle()
    renderMeme()
}

function onMyImgSelect(imgUrl) {
    const elEditor = document.querySelector('.editor')
    const elCanvas = document.querySelector('.canvas-container')
    const elMyGallery = document.querySelector('.my-meme-gallery')
    elCanvas.classList.toggle('hidden')
    elEditor.classList.toggle('hidden')
    elMyGallery.classList.toggle('hidden')
    setImg(imgUrl)
    renderMyMeme()
}

function onMyMemesBtn() {
    showMyGallery()
    renderMyMemes()
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
    clacTextSize()
    renderMeme()
}

function onFontSizeDecrease() {
    const currSize = getFontSize()
    const sizeCalc = currSize - 1
    const newSize = sizeCalc.toString() + 'px'
    setFontSize(newSize)
    clacTextSize()
    renderMeme()
}

function clacTextSize() {
    const MEME = getMeme()
    const text1 = MEME.text.line1
    const text2 = MEME.text.line2
    const text1_size = gCtx.measureText(text1).width
    const text2_size = gCtx.measureText(text2).width
    setTextSize(text1_size, text2_size)
}

function onAddLine() {
    const MEME = getMeme()
    if(MEME.secondLine) return
    
    MEME.secondLine = true

    if(MEME.selectedLine === 'line1') {
        onSwitchSelectedLine()
    }
    renderMeme()
}

function onRemoveLine() {
    const MEME = getMeme()
    if(!MEME.secondLine) return

    MEME.secondLine = false

    if(MEME.selectedLine === 'line2') {
        onSwitchSelectedLine()
    }
    renderMeme()
}

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
    const elMyGallery = document.querySelector('.my-meme-gallery')
    
    if(!elMyGallery.classList.contains('hidden')) {
        elGallery.classList.toggle('hidden')
        elGalleryNav.classList.toggle('hidden')
        elCategories.classList.toggle('hidden')
        elMyGallery.classList.toggle('hidden')
        return
    }

    elGallery.classList.toggle('hidden')
    elGalleryNav.classList.toggle('hidden')
    elCategories.classList.toggle('hidden')
    elEditor.classList.toggle('hidden')
    elCanvas.classList.toggle('hidden')
}

function showMyGallery() {
    const elGallery = document.querySelector('.gallery')
    const elGalleryNav = document.querySelector('.gallery-nav')
    const elEditor = document.querySelector('.editor')
    const elCanvas = document.querySelector('.canvas-container')
    const elCategories = document.querySelector('.categories')
    const elMyGallery = document.querySelector('.my-meme-gallery')

    if(elGallery.classList.contains('hidden')) {
        elEditor.classList.add('hidden')
        elCanvas.classList.add('hidden')
    } else {
        elGallery.classList.add('hidden')
        elGalleryNav.classList.add('hidden')
        elCategories.classList.add('hidden')
    }
    elMyGallery.classList.remove('hidden')
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListener() {
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchend', onUp)
}

function onDown(ev) {
    const pos = getEvPos(ev)
    
    if(!isLineClicked(pos)) return
    
    gStartPos = pos
    
    document.body.style.cursor = 'grabbing'
}

function onUp() {
    setLineDragOff()
    document.body.style.cursor = 'grab'
}


function onMove(ev) {
    const MEME = getMeme()
    const line1_isDrag = MEME.isDrag.line1
    const line2_isDrag = MEME.isDrag.line2 
    if (!line1_isDrag && !line2_isDrag) return

    if(line1_isDrag) {
        const pos = getEvPos(ev)
        const dx = pos.x - gStartPos.x
        const dy = pos.y - gStartPos.y

        moveLine1(dx, dy)
        gStartPos = pos
        renderMeme()
    }

    if(line2_isDrag){
        const pos = getEvPos(ev)
        const dx = pos.x - gStartPos.x
        const dy = pos.y - gStartPos.y

        moveLine2(dx, dy)
        gStartPos = pos
        renderMeme()
    }
}

function getEvPos(ev) {
    let pos = {
        x: ev.offsetX,
        y: ev.offsetY,
    }
        if (['touchstart', 'touchmove', 'touchend'].includes(ev.type)) {
            ev.preventDefault()
            ev = ev.changedTouches[0]
            pos = {
                x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
                y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
            }
        }
    return pos
}

function onSaveMeme() {
    saveMeme()
}
