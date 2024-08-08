'use strict'

let gMeme = {
    img: 'meme-imgs/meme-imgs-(square)/17.jpg',
    text: {line1: 'hello world', line2: 'Bye World'},
    secondLine: false,
    selectedLine: 'line1',
    color: {outline: 'black', fill: 'white'},
    fontSize: '40px Arial',
    pos: {line1: {x: 225, y: 40}, line2: {x: 225, y: 425}},
    textSize: {line1: {width: 192, height: 40}, line2: {width: 184, height: 40}},
    isDrag: {line1: false, line2: false},
    galleryDisplay: ''
}


function getMeme() {
    return gMeme
}

function getFontSize() {
    const sizeArr = gMeme.fontSize.split('')
    const size = sizeArr[0] + sizeArr[1]
    const sizeNum = +size
    return sizeNum
}

function setLine1Txt(txt) {
    gMeme.text.line1 = txt
}

function setLine2Txt(txt) {
    gMeme.text.line2 = txt
}

function resetLine2Pos() {
    gMeme.pos.line2.x = 225
    gMeme.pos.line2.y = 425
}

function setImg(imgUrl) {
    resetMeme()
    gMeme.img = imgUrl
}

function setOutlineColor(color) {
    gMeme.color.outline = color
}

function setFillColor(color) {
    gMeme.color.fill = color
}

function setFontSize(size) {
    gMeme.fontSize = size + ' Arial'
}

function setSelectedLine() {
    if(!gMeme.secondLine) {
        gMeme.selectedLine = 'line1'
        return
    }
    if(gMeme.selectedLine === 'line1') {
        gMeme.selectedLine = 'line2'
    } else gMeme.selectedLine = 'line1'
}

function setSelectedByClick(line) {
    gMeme.selectedLine = line
}

function setTextSize(line1Width, line2Width) {
    gMeme.textSize.line1.width = line1Width
    gMeme.textSize.line1.height = getFontSize()

    gMeme.textSize.line2.width = line2Width
    gMeme.textSize.line2.height = getFontSize()
}

function resetMeme() {
    gMeme = {
        img: 'meme-imgs/meme-imgs-(square)/17.jpg',
        text: {line1: 'hello world', line2: 'Bye World'},
        secondLine: false,
        selectedLine: 'line1',
        color: {outline: 'black', fill: 'white'},
        fontSize: '40px Arial',
        pos: {line1: {x: 225, y: 40}, line2: {x: 225, y: 425}},
        textSize: {line1: {width: 192, height: 40}, line2: {width: 184, height: 40}},
        isDrag: {line1: false, line2: false},
        galleryDisplay: ''
    }
}

function isLineClicked(clickedPos) {
    const line1 = gMeme.pos.line1
    const line2 = gMeme.pos.line2
    const line1_size = gMeme.textSize.line1
    const line2_size = gMeme.textSize.line2
    const line1_x_calc = {left: line1.x - (line1_size.width / 2), right: line1.x + (line1_size.width / 2)} 
    const line1_y_calc = {up: line1.y - line1_size.height, down: gElCanvas.height - line1.y} 
    const line2_x_calc = {left: line2.x - (line2_size.width / 2), right: line2.x + (line2_size.width / 2)} 
    const line2_y_calc = {up: line2.y - line2_size.height, down: gElCanvas.height - line2.y}

    if((line1_x_calc.left <= clickedPos.x) && (clickedPos.x <= line1_x_calc.right) && (line1_y_calc.up <= clickedPos.y) && (clickedPos.y <= line1.y)) {
        gMeme.isDrag.line1 = true
        return true
    }
    if((line2_x_calc.left <= clickedPos.x) && (clickedPos.x <= line2_x_calc.right) && (line2_y_calc.up <= clickedPos.y) && (clickedPos.y <= line2.y)) {
        gMeme.isDrag.line2 = true
        return true
    }
    return false
}

function setLineDragOff() {
    gMeme.isDrag.line1 = false
    gMeme.isDrag.line2 = false
}

function moveLine1(dx, dy){
    gMeme.pos.line1.x += dx
    gMeme.pos.line1.y += dy
}

function moveLine2(dx, dy) {
    gMeme.pos.line2.x += dx
    gMeme.pos.line2.y += dy
}

function setMyMeme(id) {
    console.log(id);
    const MY_MEMES = getMyMemes()
    const FindMyMeme = MY_MEMES.filter((meme) => meme.id === id)
    const myMeme = FindMyMeme[0]

    gMeme = myMeme

    // gMeme.text = myMeme.text
    // gMeme.secondLine = myMeme.secondLine
    // gMeme.selectedLine = myMeme.selectedLine
    // gMeme.color = myMeme.color
    // gMeme.fontSize = myMeme.fontSize
    // gMeme.pos = myMeme.pos
    // gMeme.textSize = myMeme.textSize
    // gMeme.isDrag = myMeme.isDrag
    // gMeme.galleryDisplay = myMeme.galleryDisplay
}




