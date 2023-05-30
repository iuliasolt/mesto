export default class Section {
  constructor({ items, renderer }, selector) {
      //объявим класс, который в конструктор принимает items и renderer
      this._items = items;
      this._renderer = renderer; //renderer — это функция
      this._selector = selector;
      this._container = document.querySelector(".cards");
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
