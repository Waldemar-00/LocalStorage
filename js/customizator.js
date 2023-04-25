export default class Customizator {
  constructor () {
    this.buttonsBlock = document.createElement('div')
    this.buttonsBlock.addEventListener('click', (e) => { this.scale(e) })
    this.colorPicker = document.createElement('input')
    this.colorPicker.addEventListener('input', (e) => { this.color(e) })
  }

  scale (e) {
    let index
    const body = document.querySelector('body')
    if (e.target.value) {
      index = +e.target.value.replace(/^\.\D/g, '')
    }
    function recursively (elem) {
      elem.childNodes.forEach(node => {
        if (node.nodeName === '#text' && node.nodeValue.replace(/\s+/g, '')) {
          if (!node.parentNode.getAttribute('data-fs')) {
            let font = window.getComputedStyle(node.parentNode, null).fontSize
            font = font.replace(/\D/g, '')
            node.parentNode.setAttribute('data-fs', font)
            node.parentNode.style.fontSize = font * index + 'px'
          } else {
            node.parentNode.style.fontSize = node.parentNode.getAttribute('data-fs') * index + 'px'
          }
        } else {
          recursively(node)
        }
      })
    }
    recursively(body)
  }

  color (e) {
    document.querySelector('body').style.backgroundColor = e.target.value
  }

  render () {
    const scaleButtonSmall = document.createElement('input')
    const scaleButtonMedium = document.createElement('input')
    const topPanel = document.createElement('div')
    this.buttonsBlock.classList.add('scale')
    scaleButtonSmall.classList.add('scale_btn')
    scaleButtonMedium.classList.add('scale_btn')
    scaleButtonSmall.setAttribute('type', 'button')
    scaleButtonMedium.setAttribute('type', 'button')
    scaleButtonSmall.value = '1'
    scaleButtonMedium.value = '1.5'
    this.colorPicker.classList.add('color')
    this.colorPicker.setAttribute('type', 'color')
    this.colorPicker.setAttribute('value', '#FFB35C')
    this.colorPicker.style.border = '1px solid rgba(0,0,0, .2)'
    this.colorPicker.style.borderRadius = '4px'
    this.buttonsBlock.append(scaleButtonSmall, scaleButtonMedium)
    topPanel.classList.add('panel')
    topPanel.append(this.buttonsBlock, this.colorPicker)
    document.querySelector('body').append(topPanel)
    console.log(topPanel)
  }
}