window.addEventListener('DOMContentLoaded', () => {
  const body = document.querySelector('body')
  function recursilely (elem) {
    console.log(elem) //! here, you can get all elements from a page
    elem.childNodes.forEach(node => {
      if (elem.childNodes.lenght > 1) { //! you get all nodes from the page, here
        recursilely(node)
      }
    })
  }
  recursilely(body)
})
