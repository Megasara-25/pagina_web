function initMap() {
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 12,
        center: { lat: 4.7110, lng: -74.0721 }, // Coordenadas de Bogotá
    });

    const locations = [
        { lat: 4.7110, lng: -74.0721, title: "Punto 1" },
        { lat: 4.7120, lng: -74.0731, title: "Punto 2" },
        // Añade más puntos según sea necesario
    ];

    locations.forEach(location => {
        new google.maps.Marker({
            position: location,
            map: map,
            title: location.title,
        });
    });
}

document.querySelectorAll('.btn-conocer-mas').forEach(button => {
    button.addEventListener('click', function() {
        const videoName = this.getAttribute('data-video');
        const videoPath = `Videos/${videoName}`;
        const videoContainer = document.createElement('div');
        videoContainer.innerHTML = `
            <div class="video-overlay">
                <video controls autoplay>
                    <source src="${videoPath}" type="video/mp4">
                    Tu navegador no soporta la reproducción de video.
                </video>
                <button class="close-video">Cerrar</button>
            </div>
        `;
        document.body.appendChild(videoContainer);

        document.querySelector('.close-video').addEventListener('click', function() {
            videoContainer.remove();
        });
    });
});