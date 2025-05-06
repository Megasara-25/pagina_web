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

// Manejo del formulario de registro
document.getElementById('registerForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    
    fetch('register.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert(data.message);
            window.location.href = 'iniciar-sesion.html';
        } else {
            alert(data.message);
        }
    });
});

// Manejo del formulario de inicio de sesión
document.getElementById('loginForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    
    fetch('login.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert(data.message);
            localStorage.setItem('nombreUsuario', data.nombre); // ← Guardar nombre
            window.location.href = 'bienvenida.html';
        }
        else {
            alert(data.message);
        }
    });
});

// Manejo del formulario de contacto
document.getElementById('contactForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    
    fetch('contact.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert(data.message);
            this.reset();
        } else {
            alert(data.message);
        }
    });
});