export default class Section {
  constructor(renderer, selector) {
      this._renderer = renderer;
      this._container = document.querySelector(selector);
  }

  rendererItems(items) {
      //Содержит публичный метод, который отвечает за отрисовку всех элементов.
      items.forEach((item) => {
          this._renderer(item);
      });
  }

  addItem(card) {
      //Содержит публичный метод addItem, который принимает DOM-элемент и добавляет его в контейнер.
      this._container.prepend(card);
  }
}
