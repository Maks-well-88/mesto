class Section {
  constructor({ items, renderer }, container) {
    this._items = items;
    this._renderer = renderer;
    this._container = container;
  }

  renderItems = (items) => {
    this._renderer(items);
  };

  addItem = (element) => {
    this._container.prepend(element);
  };
}

export default Section;
