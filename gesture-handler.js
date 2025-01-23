AFRAME.registerComponent("gesture-handler", {
  schema: {
    enabled: { default: true },
    rotationFactor: { default: 5 },
    minScale: { default: 0.3 },
    maxScale: { default: 8 },
  },

  init: function () {
    this.handleScale = this.handleScale.bind(this);
    this.handleRotation = this.handleRotation.bind(this);

    this.initialScale = this.el.object3D.scale.clone();
    this.scaleFactor = 1;

    this.el.sceneEl.addEventListener("onefingermove", this.handleRotation);
    this.el.sceneEl.addEventListener("twofingermove", this.handleScale);
  },

  remove: function () {
    this.el.sceneEl.removeEventListener("onefingermove", this.handleRotation);
    this.el.sceneEl.removeEventListener("twofingermove", this.handleScale);
  },

  handleRotation: function (event) {
    // Проверяем, что есть данные для изменения
    if (event.detail && event.detail.positionChange) {
      const positionChange = event.detail.positionChange;
      this.el.object3D.rotation.y += positionChange.x * this.data.rotationFactor;
      this.el.object3D.rotation.x += positionChange.y * this.data.rotationFactor;
    }
  },

  handleScale: function (event) {
    // Проверяем, что есть данные для изменения
    if (event.detail && event.detail.spreadChange !== undefined) {
      this.scaleFactor *= 1 + event.detail.spreadChange / event.detail.startSpread;

      // Ограничиваем масштаб в пределах минимального и максимального значений
      this.scaleFactor = Math.min(Math.max(this.scaleFactor, this.data.minScale), this.data.maxScale);

      this.el.object3D.scale.x = this.scaleFactor * this.initialScale.x;
      this.el.object3D.scale.y = this.scaleFactor * this.initialScale.y;
      this.el.object3D.scale.z = this.scaleFactor * this.initialScale.z;
    }
  },
});
