'use strict'

function onUploadImg() {
    const imgDataUrl = gElCanvas.toDataURL('image/jpeg')

    function onSuccess(uploadImgUrl) {
        const url = encodeURIComponent(uploadImgUrl)
        window.open(`https://www.facebook.com/sharer.php?u=${url}&t=${url}`)
    }

    doUploadImg(imgDataUrl, onSuccess)
}

function doUploadImg(imgDataUrl, onSuccess) {
    const formData = new FormData()
    formData.append('img', imgDataUrl)

    const XHR = new XMLHttpRequest()
    XHR.onreadystatechange = () => {
        if(XHR.readyState !== XMLHttpRequest.DONE) return
        if(XHR.status !== 200) return console.error('Error sharing the image')
        const { responseText: url } = XHR

        console.log('Got back live url:', url)
        onSuccess(url)
    }
    XHR.onerror = (req, ev) => {
        console.error('Error connecting to server')
    }
    XHR.open('POST', '//ca-upload.com/here/upload.php')
    XHR.send(formData)
}