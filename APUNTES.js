// Simulación de estado de autenticación de usuario
let isAuthenticated = false;
let userName = "Usuario Registrado";

// Función para alternar la visibilidad del menú móvil
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenu.classList.toggle('hidden');
}

/**
 * Muestra un mensaje en un modal personalizado (en reemplazo de alert/confirm).
 * @param {string} message - El mensaje a mostrar.
 * @param {string} title - El título del modal (opcional).
 */
function showMessage(message, title = 'Atención') {
    document.getElementById('modal-title').textContent = title;
    document.getElementById('modal-message').textContent = message;
    document.getElementById('custom-modal').classList.remove('hidden');
    document.getElementById('custom-modal').classList.add('flex');
}

/**
 * Oculta el modal de mensajes personalizado.
 */
function hideMessage() {
    document.getElementById('custom-modal').classList.add('hidden');
    document.getElementById('custom-modal').classList.remove('flex');
}

/**
 * Muestra una sección y oculta las demás (Lógica de SPA simple).
 * @param {string} sectionId - El ID de la sección a mostrar.
 */
function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.add('hidden');
        section.classList.remove('flex'); // Quita flex para secciones que lo usan
    });

    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        // Aplica 'flex' para las secciones que necesitan centrado (login, registro, descarga)
        if (['login', 'registro', 'descargar_app'].includes(sectionId)) {
            targetSection.classList.remove('hidden');
            targetSection.classList.add('flex');
        } else {
            targetSection.classList.remove('hidden');
        }
        
        // Lógica de protección para la sección de descarga (RF4)
        if (sectionId === 'descargar_app') {
            updateDownloadSection();
        }
        
        // Ocultar menú móvil si está visible
        const mobileMenu = document.getElementById('mobile-menu');
        if (!mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
        }

        // Desplazar al inicio de la página para la nueva sección
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

/**
 * Maneja la presentación de la sección de descarga (protegida).
 */
function updateDownloadSection() {
    const downloadContent = document.getElementById('download-content');
    const accessRequired = document.getElementById('access-required');
    const userDisplay = document.getElementById('user-display-name');

    if (isAuthenticated) {
        userDisplay.textContent = userName;
        downloadContent.classList.remove('hidden');
        accessRequired.classList.add('hidden');
    } else {
        downloadContent.classList.add('hidden');
        accessRequired.classList.remove('hidden');
    }
}

/**
 * Simula el envío de formularios de autenticación (Login/Registro).
 * @param {Event} event - Evento de envío del formulario.
 * @param {string} type - Tipo de formulario ('login' o 'registro').
 */
function handleAuthSubmit(event, type) {
    event.preventDefault();
    const statusElement = document.getElementById(`${type}-status`);
    statusElement.classList.remove('hidden', 'text-green-600', 'text-red-600');

    // Obtención de valores
    const email = document.getElementById(`${type}-email`).value;
    const password = document.getElementById(`${type}-password`).value;
    const name = type === 'registro' ? document.getElementById('register-name').value : null;

    if (email && password) {
        // Simulación de éxito
        statusElement.textContent = `¡${type === 'registro' ? 'Registro exitoso' : 'Inicio de sesión exitoso'}! Redirigiendo...`;
        statusElement.classList.add('text-green-600');
        
        // Simulación de login exitoso
        isAuthenticated = true;
        userName = name || email; // Usa el nombre si es registro, si no, el email

        setTimeout(() => {
            // Limpiar formulario
            event.target.reset();
            // Redirigir a la sección de descarga protegida
            showSection('descargar_app');
        }, 1500);
    } else {
        // Simulación de error (aunque los campos son required, es un fallback)
        statusElement.textContent = 'Error: Por favor, completa todos los campos.';
        statusElement.classList.add('text-red-600');
    }
    statusElement.classList.remove('hidden');
}

/**
 * Simula el envío del formulario de contacto (RF5).
 * @param {Event} event - Evento de envío del formulario.
 */
function handleContactSubmit(event) {
    event.preventDefault();
    const statusElement = document.getElementById('contact-message-status');
    statusElement.classList.remove('hidden', 'text-green-600', 'text-red-600');

    // Simulación de envío exitoso
    statusElement.textContent = '¡Mensaje enviado con éxito! Pronto nos pondremos en contacto contigo.';
    statusElement.classList.add('text-green-600');
    statusElement.classList.remove('hidden');
    
    // Limpiar formulario después de 3 segundos
    setTimeout(() => {
        event.target.reset();
        statusElement.classList.add('hidden');
    }, 3000);
}

// Asegura que la sección de inicio se muestre al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    // Si la URL tiene un hash (ej: #contacto), la muestra, si no, muestra 'inicio'
    const initialSectionId = window.location.hash.substring(1) || 'inicio';
    showSection(initialSectionId);
});