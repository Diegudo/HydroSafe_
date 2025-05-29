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


// Quiz Data - 10 questões sobre enchentes e tecnologia de prevenção
const quizData = [
    {
        question: "Qual é o principal objetivo do sistema HydroSafe?",
        options: [
            "Monitorar a qualidade da água potável",
            "Fornecer alertas precoces de enchentes",
            "Controlar o tráfego em áreas urbanas",
            "Gerenciar o abastecimento de energia"
        ],
        answer: "Fornecer alertas precoces de enchentes"
    },
    {
        question: "Quantas horas de antecedência o HydroSafe pode prever enchentes?",
        options: [
            "12 horas",
            "24 horas",
            "48 horas",
            "72 horas"
        ],
        answer: "48 horas"
    },
    {
        question: "Qual tecnologia NÃO é utilizada pelo HydroSafe?",
        options: [
            "Sensores IoT",
            "Inteligência Artificial",
            "Blockchain",
            "Aplicativo móvel"
        ],
        answer: "Blockchain"
    },
    {
        question: "Qual órgão brasileiro já realiza monitoramento similar ao HydroSafe?",
        options: [
            "INPE",
            "CEMADEN",
            "ANA",
            "IBGE"
        ],
        answer: "CEMADEN"
    },
    {
        question: "Qual região do Brasil é MENOS afetada por enchentes?",
        options: [
            "Vale do Itajaí (SC)",
            "Baixada Fluminense (RJ)",
            "Região Metropolitana de SP",
            "Centro-Oeste"
        ],
        answer: "Centro-Oeste"
    },
    {
        question: "Qual destes é um benefício direto do HydroSafe?",
        options: [
            "Redução de mortes por enchentes",
            "Aumento do turismo",
            "Geração de energia limpa",
            "Melhoria na educação"
        ],
        answer: "Redução de mortes por enchentes"
    },
    {
        question: "Quantos brasileiros vivem em áreas de risco de enchentes?",
        options: [
            "500 mil",
            "1 milhão",
            "3.5 milhões",
            "10 milhões"
        ],
        answer: "3.5 milhões"
    },
    {
        question: "Qual destes é um público-alvo do HydroSafe?",
        options: [
            "Agricultores orgânicos",
            "Defesa Civil",
            "Empresas de aviação",
            "Universidades particulares"
        ],
        answer: "Defesa Civil"
    },
    {
        question: "Qual é o prejuízo anual estimado causado por enchentes no Brasil?",
        options: [
            "R$ 500 milhões",
            "R$ 2 bilhões",
            "R$ 8 bilhões",
            "R$ 20 bilhões"
        ],
        answer: "R$ 8 bilhões"
    },
    {
        question: "Qual destas cidades foi gravemente afetada por enchentes em 2024?",
        options: [
            "Canoas (RS)",
            "Florianópolis (SC)",
            "Belo Horizonte (MG)",
            "Fortaleza (CE)"
        ],
        answer: "Canoas (RS)"
    }
];

// Variáveis do Quiz
let currentQuestion = 0;
let score = 0;
let userAnswers = Array(quizData.length).fill(null);

// Elementos DOM
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const currentQuestionElement = document.getElementById('current-question');
const questionCounter = document.getElementById('question-counter');
const nextBtn = document.getElementById('next-btn');
const prevBtn = document.getElementById('prev-btn');
const quizResult = document.querySelector('.quiz-result');
const quizBody = document.querySelector('.quiz-body');
const scorePercent = document.getElementById('score-percent');
const correctAnswers = document.getElementById('correct-answers');
const progressFill = document.getElementById('progress-fill');
const restartBtn = document.getElementById('restart-btn');

// Inicializar Quiz
function initQuiz() {
    showQuestion();
    updateNavigation();
}

// Mostrar questão atual com animação
function showQuestion() {
    // Resetar animação do corpo do quiz
    quizBody.classList.remove('fade-out');
    
    const question = quizData[currentQuestion];
    questionText.textContent = question.question;
    currentQuestionElement.textContent = currentQuestion + 1;
    questionCounter.textContent = `${currentQuestion + 1} de ${quizData.length}`;
    
    optionsContainer.innerHTML = '';
    question.options.forEach((option, index) => {
        const optionBtn = document.createElement('button');
        optionBtn.classList.add('option-btn');
        optionBtn.textContent = option;
        
        // Marcar opção selecionada se existir
        if (userAnswers[currentQuestion] === index) {
            optionBtn.classList.add('selected');
        }
        
        optionBtn.addEventListener('click', () => selectOption(option, index));
        optionsContainer.appendChild(optionBtn);
        
        // Animar as opções com delay
        setTimeout(() => {
            optionBtn.classList.add('show');
        }, 100 * index);
    });
    
    // Animar footer
    document.querySelector('.quiz-footer').style.opacity = '1';
}

// Selecionar opção
function selectOption(option, index) {
    // Remover seleção anterior
    const options = document.querySelectorAll('.option-btn');
    options.forEach(opt => opt.classList.remove('selected', 'correct', 'incorrect'));
    
    // Marcar nova seleção
    options[index].classList.add('selected');
    userAnswers[currentQuestion] = index;
    
    updateNavigation();
}

// Atualizar navegação
function updateNavigation() {
    prevBtn.disabled = currentQuestion === 0;
    nextBtn.disabled = userAnswers[currentQuestion] === null;
    nextBtn.textContent = currentQuestion === quizData.length - 1 ? "Finalizar" : "Próxima";
}

// Mostrar resultado com animação
function showResult() {
    // Animação de saída do quiz
    quizBody.classList.add('fade-out');
    
    setTimeout(() => {
        // Calcular pontuação final
        score = 0;
        for (let i = 0; i < quizData.length; i++) {
            if (userAnswers[i] !== null) {
                const selectedOption = quizData[i].options[userAnswers[i]];
                if (selectedOption === quizData[i].answer) {
                    score++;
                }
            }
        }

        const percentage = Math.round((score / quizData.length) * 100);
        scorePercent.textContent = percentage;
        correctAnswers.textContent = score;
        
        // Mostrar resultado com animação
        quizResult.classList.add('show');
        
        // Animar a barra de progresso
        setTimeout(() => {
            progressFill.style.width = `${percentage}%`;
        }, 300);
    }, 300); // Tempo da animação de fade-out
}

// Event Listeners
nextBtn.addEventListener('click', () => {
    if (currentQuestion < quizData.length - 1) {
        // Animação de transição para próxima pergunta
        quizBody.classList.add('fade-out');
        setTimeout(() => {
            currentQuestion++;
            showQuestion();
            updateNavigation();
        }, 300);
    } else {
        showResult();
    }
});

prevBtn.addEventListener('click', () => {
    if (currentQuestion > 0) {
        // Animação de transição para pergunta anterior
        quizBody.classList.add('fade-out');
        setTimeout(() => {
            currentQuestion--;
            showQuestion();
            updateNavigation();
        }, 300);
    }
});

restartBtn.addEventListener('click', () => {
    // Animação de saída do resultado
    quizResult.classList.remove('show');
    
    setTimeout(() => {
        currentQuestion = 0;
        score = 0;
        userAnswers = Array(quizData.length).fill(null);
        
        // Resetar progress bar
        progressFill.style.width = '0%';
        
        // Mostrar primeira pergunta
        showQuestion();
        updateNavigation();
    }, 300);
});

// Iniciar o quiz quando a página carregar
document.addEventListener('DOMContentLoaded', initQuiz);


// Menu Hambúrguer (substitua o existente)
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const themeSwitcher = document.querySelector('.theme-switcher-btn');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    themeSwitcher.classList.toggle('active');
});

// Fechar menu ao clicar em um item
document.querySelectorAll('.nav-menu a').forEach(item => {
    item.addEventListener('click', () => {
        navMenu.classList.remove('active');
        themeSwitcher.classList.remove('active');
    });
});

// Alterna o menu ao clicar no ícone
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});







// Troca de Temas
const themeBtn = document.querySelector('.theme-switcher-btn');
let currentTheme = 'light'; // Tema padrão

// Função para aplicar o tema
function applyTheme(theme) {
    document.body.setAttribute('data-theme', theme);
    
    // Atualiza o ícone do botão
    const icon = themeBtn.querySelector('i');
    if (theme === 'dark') {
        icon.classList.replace('fa-moon', 'fa-sun');
    } else if (theme === 'blue') {
        icon.classList.replace('fa-sun', 'fa-droplet');
    } else {
        icon.classList.replace('fa-droplet', 'fa-moon');
    }
    
    // Salva no localStorage
    localStorage.setItem('theme', theme);
}

// Alternar entre temas
function toggleTheme() {
    const themes = ['light', 'dark', 'blue'];
    currentTheme = themes[(themes.indexOf(currentTheme) + 1) % themes.length];
    applyTheme(currentTheme);
}

// Carregar tema salvo
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    currentTheme = savedTheme;
}
applyTheme(currentTheme);

// Evento de clique
themeBtn.addEventListener('click', toggleTheme);