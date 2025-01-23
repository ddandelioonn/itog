// Добавляем обработку жестов для вращения и масштабирования модели
document.addEventListener("DOMContentLoaded", () => {
  const model = document.querySelector("#moai");

  model.addEventListener("gesturemove", (event) => {
    const gesture = event.detail.action;

    // Масштабирование (pinch)
    if (gesture === "scale") {
      const currentScale = model.getAttribute("scale");
      const newScale = currentScale.x + event.detail.spreadChange / 200;
      if (newScale > 0.1 && newScale < 2) {
        model.setAttribute("scale", {
          x: newScale,
          y: newScale,
          z: newScale,
        });
      }
    }

    // Вращение (rotate)
    if (gesture === "rotate") {
      const currentRotation = model.getAttribute("rotation");
      model.setAttribute("rotation", {
        x: currentRotation.x,
        y: currentRotation.y + event.detail.angleChange,
        z: currentRotation.z,
      });
    }
  });
});
