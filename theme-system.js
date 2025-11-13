// theme-system.js - Sistema unificado de temas para NeoStudy

let currentMode = 'normal';

function toggleThemeMode() {
    if (currentMode === 'normal') {
        setThemeMode('oscuro');
    } else if (currentMode === 'oscuro') {
        setThemeMode('estudio');
    } else {
        setThemeMode('normal');
    }
}

function setThemeMode(mode) {
    document.body.classList.remove('study-mode', 'dark-mode');
    
    if (mode === 'estudio') {
        document.body.classList.add('study-mode');
    } else if (mode === 'oscuro') {
        document.body.classList.add('dark-mode');
    }
    
    currentMode = mode;
    
    // Actualizar todos los botones de tema en la página
    const themeButtons = document.querySelectorAll('.theme-toggle-btn, .btn-primary');
    const icons = {
        'normal': 'fas fa-sun',
        'oscuro': 'fas fa-moon', 
        'estudio': 'fas fa-graduation-cap'
    };
    const texts = {
        'normal': 'Modo Normal',
        'oscuro': 'Modo Oscuro',
        'estudio': 'Modo Estudio'
    };
    
    themeButtons.forEach(btn => {
        if (btn.innerHTML.includes('fa-moon') || btn.innerHTML.includes('fa-sun') || btn.innerHTML.includes('fa-graduation-cap')) {
            btn.innerHTML = `<i class="${icons[mode]}"></i> ${texts[mode]}`;
        }
    });
    
    showNotification(`${texts[mode]} activado`, 'info');
    localStorage.setItem('neoStudyTheme', mode);
}

function showNotification(message, type = 'info') {
    // Eliminar notificación existente si hay una
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Crear nueva notificación
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.style.background = 
        type === 'success' ? '#28a745' :
        type === 'warning' ? '#ffc107' :
        type === 'danger' ? '#dc3545' : '#17a2b8';
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Estilos para la notificación
    notification.style.position = 'fixed';
    notification.style.top = '100px';
    notification.style.right = '20px';
    notification.style.background = notification.style.background;
    notification.style.color = 'white';
    notification.style.padding = '1rem 1.5rem';
    notification.style.borderRadius = '10px';
    notification.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
    notification.style.zIndex = '10000';
    notification.style.animation = 'fadeIn 0.3s ease';
    
    // Remover después de 3 segundos
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 3000);
}

// Aplicar estilos CSS necesarios para los modos
function injectThemeStyles() {
    if (!document.querySelector('#theme-styles')) {
        const style = document.createElement('style');
        style.id = 'theme-styles';
        style.textContent = `
            .study-mode {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
            }
            .study-mode .header,
            .study-mode .desktop-header,
            .study-mode .mobile-header {
                background: rgba(0,0,0,0.2);
            }
            .study-mode .sidebar,
            .study-mode .create-post,
            .study-mode .post,
            .study-mode .live-classes,
            .study-mode .card {
                background: rgba(255,255,255,0.1);
                backdrop-filter: blur(10px);
                color: white;
                border: 1px solid rgba(255,255,255,0.2);
            }
            .study-mode .post-input,
            .study-mode input,
            .study-mode textarea {
                background: rgba(255,255,255,0.1);
                color: white;
                border-color: rgba(255,255,255,0.3);
            }
            .study-mode .post-input::placeholder,
            .study-mode input::placeholder {
                color: rgba(255,255,255,0.7);
            }
            .dark-mode {
                background: #1a1a1a;
                color: #f0f0f0;
            }
            .dark-mode .header,
            .dark-mode .desktop-header,
            .dark-mode .mobile-header {
                background: linear-gradient(135deg, #2c3e50, #34495e);
            }
            .dark-mode .sidebar,
            .dark-mode .create-post,
            .dark-mode .post,
            .dark-mode .live-classes,
            .dark-mode .card {
                background: #2d2d2d;
                color: #f0f0f0;
                border: 1px solid #3d3d3d;
            }
            .dark-mode .post-input,
            .dark-mode input,
            .dark-mode textarea {
                background: #3d3d3d;
                color: #f0f0f0;
                border-color: #444;
            }
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
            }
        `;
        document.head.appendChild(style);
    }
}

// Inicializar tema al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    injectThemeStyles();
    const savedTheme = localStorage.getItem('neoStudyTheme') || 'normal';
    setThemeMode(savedTheme);
});