document.addEventListener('DOMContentLoaded', function() {
    // Инициализация карты и GPS
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            let latitude = position.coords.latitude;
            let longitude = position.coords.longitude;

            // Позиция пользователя для маркеров
            console.log(`Ваше текущее местоположение: ${latitude}, ${longitude}`);
        }, function(error) {
            console.error('Ошибка получения GPS данных:', error);
        });
    }
});
