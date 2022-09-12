class Section {
  constructor({ container, renderer }) {
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
