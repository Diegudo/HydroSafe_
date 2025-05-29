.slideshow {
    position: relative;
    max-width: 100%;
    margin: auto;
}

.slide {
    display: none;
}

.slide img {
    width: 100%;
    height: 500px;
    object-fit: cover;
}

.prev, .next {
    cursor: pointer;
    position: absolute;
    top: 50%;
    width: auto;
    padding: 16px;
    margin-top: -22px;
    color: white;
    font-weight: bold;
    font-size: 2rem;
    transition: 0.6s ease;
    user-select: none;
    background-color: rgba(0,0,0,0.5);
}

.next {
    right: 0;
}

.prev:hover, .next:hover {
    background-color: rgba(0,0,0,0.8);
}
