const domHelper = (function () {

  function insert(insertedNode, parentSelector, insertBeforeIndex) {
    let parent = document.querySelector(parentSelector);
    let elem;
    if (!insertBeforeIndex) {
      elem = parent.appendChild(insertedNode);
    } else {
      elem = parent.insertBefore(insertedNode, parent.children[insertBeforeIndex])
    }
    return elem;
  }

  /** */
  function removeAllChildren(parentSelector) {
    let element = document.querySelector(parentSelector);
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  }

  /**
   * filter
   * @param {stirng} fieldName fieldName
   * @param {array} array array
   */
  function filter(filterString, array) {

    array.forEach((item) => {
      const classList = item.classList;

      filterString !== 'all' ? (classList.contains(filterString) ?
          classList.toggle('hidden', false) :
          classList.toggle('hidden', true)) :
        classList.toggle('hidden', false);
    });
  }

  function click(parentClass, childClass, callback) {

    document.querySelector('.' + parentClass).addEventListener("click", (e) => {
      let target = e.target;
      let parent = e.target;
      while (!target.classList.contains(parentClass)) {
        if (target.classList.contains(childClass)) {
          callback({
            target,
            parent
          });
          return;
        }
        target = target.parentNode;
      }
    });

  }

  return {
    insert,
    filter,
    click,
    removeAllChildren,

  }
})()

export default domHelper;