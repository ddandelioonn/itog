AFRAME.registerComponent('gesture-detector', {
  init: function () {
    this.el.addEventListener('pinch', this.onPinch.bind(this));
    this.el.addEventListener('rotate', this.onRotate.bind(this));
  },

  onPinch: function (event) {
    // Масштабирование модели
    const scaleFactor = event.detail.scale;
    const model = document.querySelector('#bowser-model');
    model.setAttribute('scale', `${scaleFactor} ${scaleFactor} ${scaleFactor}`);
  },

  onRotate: function (event) {
    // Вращение модели
    const rotation = event.detail.rotation;
    const model = document.querySelector('#bowser-model');
    model.setAttribute('rotation', `${rotation} 0 0`);
  }
});
