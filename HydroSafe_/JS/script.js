document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.slide-dot');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentSlide = 0;
    const totalSlides = slides.length;
    let slideInterval;

    // Mostrar slide inicial
    showSlide(currentSlide);
    startAutoPlay();

    // Função para mostrar um slide específico
    function showSlide(n) {
        // Esconder todos os slides
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Remover classe 'active' de todos os dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Ajustar o índice se for maior que o total ou menor que 0
        currentSlide = (n + totalSlides) % totalSlides;
        
        // Mostrar slide atual
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    // Avançar para o próximo slide
    function nextSlide() {
        showSlide(currentSlide + 1);
        resetAutoPlay();
    }

    // Voltar para o slide anterior
    function prevSlide() {
        showSlide(currentSlide - 1);
        resetAutoPlay();
    }

    // Iniciar autoplay
    function startAutoPlay() {
        slideInterval = setInterval(nextSlide, 2000);
    }

    // Reiniciar autoplay
    function resetAutoPlay() {
        clearInterval(slideInterval);
        startAutoPlay();
    }

    // Event listeners
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    // Navegação pelos dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
            resetAutoPlay();
        });
    });

    // Pausar autoplay quando o mouse estiver sobre o slideshow
    const slideshowContainer = document.querySelector('.slideshow-container');
    slideshowContainer.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });

    slideshowContainer.addEventListener('mouseleave', () => {
        startAutoPlay();
    });

    // Navegação por teclado
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
            nextSlide();
        } else if (e.key === 'ArrowLeft') {
            prevSlide();
        }
    });
});