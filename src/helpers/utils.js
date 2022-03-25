export function get_url_params() {
  if (window.location.search.length > 0)
    return Object.fromEntries(new URLSearchParams(window.location.search.substring(1)))
  return []
}

export function download_base64(b64Data, fileName) {
    let fileURL = window.URL.createObjectURL(
      b64toBlob(b64Data, 'application/stream')
    )
    const fileLink = document.createElement('a')
    fileLink.href = fileURL
    fileLink.setAttribute('download', fileName)
    document.body.appendChild(fileLink)
    fileLink.click()
    fileLink.remove()
    fileURL = ''
}

const b64toBlob = (b64Data, contentType = '', sliceSize = 512) => {
    const byteCharacters = atob(b64Data)
    const byteArrays = []

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize)

      const byteNumbers = new Array(slice.length)
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i)
      }

      const byteArray = new Uint8Array(byteNumbers)
      byteArrays.push(byteArray)
    }

    const blob = new Blob(byteArrays, { type: contentType })
    return blob
  }

String.prototype.getTextWidth = function(font) {
  let canvas = document.createElement("canvas");
  let context = canvas.getContext("2d");
  context.font = font;
  let width = context.measureText(this).width;
  return width;
}
