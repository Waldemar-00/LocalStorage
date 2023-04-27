window.addEventListener('DOMContentLoaded', () => {
  const body = document.querySelector('body')
  const headers = []
  function recursilely (elem) {
    elem.childNodes.forEach(node => {
      if (node.nodeName.match(/^H\d/)) {
        const object = {
          header: node.nodeName,
          content: node.textContent.trim()
        }
        headers.push(object)
      } else {
        recursilely(node)
      }
    })
  }
  recursilely(body)
  console.log(headers)
  fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(headers)
  })
    .then(response => response.json())
    .then(json => console.log(json))
})
