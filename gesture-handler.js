AFRAME.registerComponent('gesture-handler', {
  init: function () {
    this.el.addEventListener('mousedown', this.startGesture.bind(this));
    this.el.addEventListener('touchstart', this.startGesture.bind(this));
    this.el.addEventListener('mousemove', this.handleGesture.bind(this));
    this.el.addEventListener('touchmove', this.handleGesture.bind(this));
    this.el.addEventListener('mouseup', this.endGesture.bind(this));
    this.el.addEventListener('touchend', this.endGesture.bind(this));
  },

  startGesture: function (event) {
    // Инициализация жеста
    this.isGesturing = true;
    this.initialDistance = event.touches ? event.touches[0].clientX : event.clientX;
  },

  handleGesture: function (event) {
    if (!this.isGesturing) return;
    const distance = event.touches ? event.touches[0].clientX : event.clientX;
    const scale = (distance - this.initialDistance) * 0.01;
    this.el.emit('pinch', { scale });
  },

  endGesture: function () {
    this.isGesturing = false;
  }
});
