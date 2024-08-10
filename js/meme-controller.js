'use strict'

let gElCanvas
let gCtx
let gStartPos
let gCurrShape = 'text'
let gInlineEdit = false

function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')

    addMouseListeners()
    addTouchListener()
    addKeyboardListener()
    addStickersEvListeners()
    renderGallery()
}

function renderMeme() {
    const MEME = getMeme()
    const stickers = getStickers()
    const TEXT = document.querySelector('input[name="text"]').value
    document.querySelector('input[name="text"]').value = ''

    drawImg(MEME.img)

    if(MEME.selectedLine === 'none') {
        setTimeout(() => drawText(MEME.text.line1, MEME.pos.line1.x, MEME.pos.line1.y, MEME.color.outline, MEME.color.fill, MEME.fontSize), 100)
        if(MEME.secondLine) setTimeout(() => drawText(MEME.text.line2, MEME.pos.line2.x, MEME.pos.line2.y, MEME.color.outline, MEME.color.fill, MEME.fontSize), 100)
        alert('Please selcet the line you want to edit first')
    }
    
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
    
    if(MEME.stickers.sticker1.isDragged) {
        setTimeout(() => drawSticker(stickers[MEME.stickers.sticker1.idx].value, MEME.stickers.sticker1.pos, stickers[MEME.stickers.sticker1.idx].fontSize), 100);
        
        if(MEME.stickers.sticker2.isDragged) {
            setTimeout(() => drawSticker(stickers[MEME.stickers.sticker2.idx].value, MEME.stickers.sticker2.pos, stickers[MEME.stickers.sticker2.idx].fontSize), 100);
        
            if(MEME.stickers.sticker3.isDragged){
                setTimeout(() => drawSticker(stickers[MEME.stickers.sticker3.idx].value, MEME.stickers.sticker3.pos, stickers[MEME.stickers.sticker3.idx].fontSize), 100);

                if(MEME.stickers.sticker4.isDragged) {
                    setTimeout(() => drawSticker(stickers[MEME.stickers.sticker4.idx].value, MEME.stickers.sticker4.pos, stickers[MEME.stickers.sticker4.idx].fontSize), 100);
                }
            }
        }
    }
}

function renderMyMeme() {
    const MEME = getMeme()
    const stickers = getStickers()

    drawImg(MEME.img)

    setTimeout(() => drawText(MEME.text.line1, MEME.pos.line1.x, MEME.pos.line1.y, MEME.color.outline, MEME.color.fill, MEME.fontSize), 100)
    if(MEME.secondLine) setTimeout(() => drawText(MEME.text.line2, MEME.pos.line2.x, MEME.pos.line2.y, MEME.color.outline, MEME.color.fill, MEME.fontSize), 100)
    setTimeout(clacTextSize, 108)
    if(MEME.selectedLine === 'line1') setTimeout(() => drawRect(MEME.pos.line1.x, MEME.pos.line1.y, MEME.textSize.line1.width, MEME.textSize.line1.height), 110)
    if(MEME.selectedLine === 'line2') setTimeout(() => drawRect(MEME.pos.line2.x, MEME.pos.line2.y, MEME.textSize.line2.width, MEME.textSize.line2.height), 110)
    
    if(MEME.stickers.sticker1.isDragged) {
        setTimeout(() => drawSticker(stickers[MEME.stickers.sticker1.idx].value, MEME.stickers.sticker1.pos, stickers[MEME.stickers.sticker1.idx].fontSize), 100);
        
        if(MEME.stickers.sticker2.isDragged) {
            setTimeout(() => drawSticker(stickers[MEME.stickers.sticker2.idx].value, MEME.stickers.sticker2.pos, stickers[MEME.stickers.sticker2.idx].fontSize), 100);
        
            if(MEME.stickers.sticker3.isDragged){
                setTimeout(() => drawSticker(stickers[MEME.stickers.sticker3.idx].value, MEME.stickers.sticker3.pos, stickers[MEME.stickers.sticker3.idx].fontSize), 100);

                if(MEME.stickers.sticker4.isDragged) {
                    setTimeout(() => drawSticker(stickers[MEME.stickers.sticker4.idx].value, MEME.stickers.sticker4.pos, stickers[MEME.stickers.sticker4.idx].fontSize), 100);
                }
            }
        }
    }
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

function drawSticker(sticker,pos = {x , y}, fontSize = '40px') {
    gCtx.lineWidth = 2
    gCtx.font = fontSize 
    gCtx.textAlign = 'center'
    gCtx.textBaseLine = 'middle'
    
    gCtx.strokeText(sticker, pos.x, pos.y)
}

function toggleInlineEdit() {
    (gInlineEdit) ? gInlineEdit = false : gInlineEdit = true
}

function inlineEditing(ev) {
    if(!gInlineEdit) return
    
    const meme = getMeme()
    const { selectedLine } = meme

    if(selectedLine === 'none') return
    
    switch (ev.key) {
        case "ArrowDown":
            if(selectedLine === 'line1'){
                moveLine1(0,1)
                renderMeme()
            } 
            if(selectedLine === 'line2') moveLine2(0,1)
            break;
        case "ArrowUp":
            if(selectedLine === 'line1') moveLine1(0,-1)
            if(selectedLine === 'line2') moveLine2(0,-1)
            break;
        case "ArrowLeft":
            if(selectedLine === 'line1') moveLine1(-1,0)
            if(selectedLine === 'line2') moveLine2(-1,0)
            break;
        case "ArrowRight":
            if(selectedLine === 'line1') moveLine1(1,0)
            if(selectedLine === 'line2') moveLine2(1,0)
            break;
        case "Enter":
            return;
        case " ":
            if(selectedLine === 'line1') editText(' ', 'line1')
            if(selectedLine === 'line2') editText(' ', 'line2')
            break;
        case "Escape":
            return;
        case "Backspace":
            if(selectedLine === 'line1') editText('BackSpace', 'line1')
            if(selectedLine === 'line2') editText('BackSpace', 'line2')
            break;
        case "a": 
        case "b":
        case "c":
        case "d":
        case "e":
        case "f":
        case "g":
        case "h":
        case "i":
        case "j":
        case "k":
        case "l":
        case "m":
        case "n":
        case "o":
        case "p":
        case "q":
        case "r":
        case "s":
        case "t":
        case "u":
        case "v":
        case "w":
        case "x":
        case "y":
        case "z":
            if(selectedLine === 'line1') editText(ev.key, 'line1')
            if(selectedLine === 'line2') editText(ev.key, 'line2')
            break;
        case "A": 
        case "B":
        case "C":
        case "D":
        case "E":
        case "F":
        case "G":
        case "H":
        case "I":
        case "J":
        case "K":
        case "L":
        case "M":
        case "N":
        case "O":
        case "P":
        case "Q":
        case "R":
        case "S":
        case "T":
        case "U":
        case "V":
        case "W":
        case "X":
        case "Y":
        case "Z":
            if(selectedLine === 'line1') editText(ev.key, 'line1')
            if(selectedLine === 'line2') editText(ev.key, 'line2')
            break;
    }
}

function editText(latter, line) {
    const meme = getMeme()
    if(line === 'line1') {
        const ogTxt = meme.text.line1
        if(latter === 'BackSpace') {
            const txtArr = [...ogTxt]
            txtArr.pop()
            const newTxt = txtArr.join('')
            setLine1Txt(newTxt)
            renderMeme()
            return
        }
        const newTxt = ogTxt + latter    
        setLine1Txt(newTxt)
        renderMeme()
        return
    }
    if(line === 'line2') {
        const ogTxt = meme.text.line2
        if(latter === 'BackSpace') {
            const txtArr = [...ogTxt]
            txtArr.pop()
            const newTxt = txtArr
            setLine2Txt(newTxt)
            renderMeme()
            return
        }
        const newTxt = ogTxt + latter
        setLine2Txt(newTxt)
        renderMeme()
        return
    }
}

function drawRect(x, y, lineWidth, lineHeight) {
    gCtx.beginPath()
    gCtx.strokeStyle = 'black'
    gCtx.lineWidth = 2
    gCtx.rect(x - (lineWidth / 2) - 15, y - lineHeight, lineWidth + 30, lineHeight + 10)
    gCtx.stroke()
}

function undrawRect(currMeme) {
    clearCanvas()
    drawImg(currMeme.img)
    setTimeout(() => drawText(currMeme.text.line1, currMeme.pos.line1.x, currMeme.pos.line1.y, currMeme.color.outline, currMeme.color.fill, currMeme.fontSize), 100)
    if(currMeme.secondLine) setTimeout(() => drawText(currMeme.text.line2, currMeme.pos.line2.x, currMeme.pos.line2.y, currMeme.color.outline, currMeme.color.fill, currMeme.fontSize), 100)
    setSelectedLineToNone()
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
        if(MEME.selectedLine === 'line1'){
            undrawRect(MEME)
            document.querySelector('input[name="text"]').value = ''
            return
        }
        setSelectedByClick('line1')
        document.querySelector('input[name="text"]').value = ''
        renderMeme()
        return
    }
    else if((line2_x_calc.left <= offsetX) && (offsetX <= line2_x_calc.right) && (line2_y_calc.up <= offsetY) && (offsetY <= line2.y)) {
        if(!MEME.secondLine) return 
        if(MEME.selectedLine === 'line2'){
            undrawRect(MEME)
            document.querySelector('input[name="text"]').value = ''
            return
        }
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

function onMyImgSelect(imgUrl, id) {
    const elEditor = document.querySelector('.editor')
    const elCanvas = document.querySelector('.canvas-container')
    const elMyGallery = document.querySelector('.my-meme-gallery')
    elCanvas.classList.toggle('hidden')
    elEditor.classList.toggle('hidden')
    elMyGallery.classList.toggle('hidden')
    setImg(imgUrl)
    setMyMeme(id)
    renderMyMeme()
}

function onMyMemesBtn() {
    showMyGallery()
    renderMyMemes()
}

function onAglinLeft() {
    const meme = getMeme()
    if(meme.selectedLine === 'none') return
    aglinLeft()
    renderMeme()
}

function onAglinCenter() {
    const meme = getMeme()
    if(meme.selectedLine === 'none') return
    aglinCenter()
    renderMeme()
}

function onAglinRight() {
    const meme = getMeme()
    if(meme.selectedLine === 'none') return
    aglinRight()
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

function addKeyboardListener() {
    window.addEventListener('keydown', inlineEditing)
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
    document.body.style.cursor = 'default'
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
    const id = prompt('Please enter a name for your meme')
    saveMeme(id)
}

function addStickersEvListeners() {
    const elDraggables = document.querySelectorAll('.draggable')
    const elDroppable = document.querySelector('.droppable')

    elDraggables.forEach(elem => {
        elem.addEventListener("dragstart", onDragStart)
    })
    elDroppable.addEventListener("dragover", onDragOver)
    elDroppable.addEventListener("drop", onDrop)
}

function onDragStart(ev) {
    ev.dataTransfer.setData("text", ev.target.id)
}

function onDragOver(ev) {
    ev.preventDefault()
}

function onDrop(ev) {
    ev.preventDefault()
    const elDraggableData = ev.dataTransfer.getData("text")
    const sticker = getStickerById(elDraggableData)
    const evPos = {x: ev.offsetX, y: ev.offsetY}
    
    drawSticker(sticker.value, evPos)
    setStickerPos(sticker.idx, ev.offsetX, ev.offsetY)
    setIsDragged(sticker.idx)

    setStickerOnMeme(sticker)

    const draggbleElement = document.getElementById(elDraggableData)
    console.log(draggbleElement);
    draggbleElement.classList.add('dragged')
    draggbleElement.setAttribute('draggable', 'false')
}