module.exports = () => {

  const domNode = document.createElement('div')

  domNode.setAttribute('contenteditable', true)

  return domNode

}
