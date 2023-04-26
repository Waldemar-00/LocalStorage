export default class Customizator {
  constructor () {
    this.buttonsBlock = document.createElement('div')
    this.colorPicker = document.createElement('input')
    this.cross = document.createElement('div')
    this.index = localStorage.getItem('index') || 1
    this.colorFromStorage = localStorage.getItem('color') || '#FFFFFF'
    this.buttonsBlock.addEventListener('click', (e) => this.scale(e))
    this.colorPicker.addEventListener('input', (e) => this.color(e))
    this.cross.addEventListener('click', () => this.reset())
  }

  createElementStyle () {
    const style = document.createElement('style')
    style.innerHTML = `
      .panel {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        position: fixed;
        top: 10px;
        right: 0;
        border: 1px solid rgba(0,0,0, .2);
        box-shadow: 0 0 20px rgba(0,0,0, .5);
        width: 300px;
        height: 60px;
        background-color: #fff;
      }
      .scale {
        display: flex;
        justify-content: space-around;
        align-items: center;
        width: 100px;
        height: 40px;
      }
      .scale_btn {
        display: block;
        width: 40px;
        height: 40px;
        border: 1px solid rgba(0,0,0, .2);
        border-radius: 4px;
        font-size: 18px;
      }
      .color {
        width: 40px;
        height: 40px;
      }
      .cross {
        width: 40px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        font-size: 40xp;
        font-weight: 600;
        cursor: pointer;
        border-radius: 4px;
      }
      .cross:hover {
        background-color: #F0F0F0;
      }
    `
    document.querySelector('head').append(style)
  }

  scale (e) {
    const body = document.querySelector('body')
    if (e) {
      this.index = +e.target.value.replace(/^\.\D/g, '')
    }
    const recursively = (elem) => {
      elem.childNodes.forEach(node => {
        if (node.nodeName === '#text' && node.nodeValue.replace(/\s+/g, '')) {
          if (!node.parentNode.getAttribute('data-fs')) {
            let font = window.getComputedStyle(node.parentNode, null).fontSize
            font = font.replace(/\D/g, '')
            node.parentNode.setAttribute('data-fs', font)
            node.parentNode.style.fontSize = font * this.index + 'px'
          } else {
            node.parentNode.style.fontSize = node.parentNode.getAttribute('data-fs') * this.index + 'px'
          }
        } else {
          recursively(node)
        }
      })
    }
    recursively(body)
    localStorage.setItem('index', this.index)
  }

  color (e) {
    document.querySelector('body').style.backgroundColor = e.target.value
    localStorage.setItem('color', e.target.value)
  }

  setColor () {
    document.querySelector('body').style.backgroundColor = this.colorFromStorage
    this.colorPicker.value = this.colorFromStorage
  }

  reset () {
    localStorage.clear()
    this.index = 1
    this.colorFromStorage = '#FFFFFF'
    this.setColor()
    this.scale()
  }

  render () {
    this.createElementStyle()
    this.setColor()
    this.scale()
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
    this.cross.innerHTML = 'reset'
    this.cross.classList.add('cross')
    this.buttonsBlock.append(scaleButtonSmall, scaleButtonMedium)
    topPanel.classList.add('panel')
    topPanel.append(this.buttonsBlock, this.colorPicker, this.cross)
    document.querySelector('body').append(topPanel)
    console.log(topPanel)
  }
}
