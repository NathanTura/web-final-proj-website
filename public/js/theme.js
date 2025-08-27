const modeSlider = document.getElementById('modeSlider');
const sliderCircle = document.getElementById('sliderCircle');

modeSlider.onclick = () => {
    const currentTheme = document.body.getAttribute('data-theme');
    if (currentTheme === 'light') {
        document.body.setAttribute('data-theme', 'dark');
        sliderCircle.style.transform = 'translateX(26px)';
       
    } else {
        document.body.setAttribute('data-theme', 'light');
        sliderCircle.style.transform = 'translateX(0px)';
      
    }
};
