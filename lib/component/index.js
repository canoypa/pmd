class component {
  constructor(node) {
    this.root = node;
  }
  addListener(t, f, o) {
    this.root.addEventListener(t, f, o);
  }
}

export { component };
