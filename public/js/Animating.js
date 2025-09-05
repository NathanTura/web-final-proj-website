
// Video controller 
document.querySelectorAll('.Create-container').forEach(container => {
    const video = container.querySelector('video');

    container.addEventListener('mouseenter', () => {
      video.currentTime = 0;   
      video.play();            
    });
  });

  document.querySelectorAll('.Automate-container').forEach(container => {
    const video = container.querySelector('video');

    container.addEventListener('mouseenter', () => {
      video.currentTime = 0;   
      video.play();            
    });
  });

  document.querySelectorAll('.Manage-Container').forEach(container => {
    const video = container.querySelector('video');

    container.addEventListener('mouseenter', () => {
      video.currentTime = 0;   
      video.play();            
    });
  });


  // containter animation

// menu controller 

window.addEventListener("resize", () => {
    const m_list = document.getElementById('menulists')
    if (window.innerWidth > 769) {
        m_list.style.display = 'flex'
    }
    else {
        m_list.style.display = 'none'
        isshowing = false
    }
})



var isshowing = false
function showmenu() {
    const m_list = document.getElementById('menulists')
    if (!isshowing) {

        m_list.style.display = 'flex'
        isshowing = !isshowing
    }
    else {

        m_list.style.display = 'none'
        isshowing = !isshowing
    }
}


const myInterval = setInterval(loadimages, 300);
let count = 0;

const images = document.querySelectorAll('.image-group > img');

function loadimages() {
    if (count === 0) {
        const slogan = document.getElementById('slogan');
        slogan.style.transform = 'translateY(0px)';
        slogan.style.opacity = '1';
        images[2].style.opacity = '1'; // laptop
        images[2].style.top = '60%';
    } 
    else if (count === 1) {
        images[0].style.opacity = '1'; // phone 1
        images[0].style.left = '0';
    } 
    else if (count === 2) {
        images[1].style.opacity = '1'; // phone 2
        images[1].style.left = '50%';
        clearInterval(myInterval); 
    }

    count++;
}

const article = document.getElementById('article')
const setup_guide = document.getElementById('setup-guide')
const main = document.getElementById('main')

setTimeout(() => {
    article.style.transform = 'translateY(0)';
    setup_guide.style.transform = 'translateY(0)';
}, 1500);


const handleScroll = () => {
  if (window.scrollY > 50) {
 
    main.style.transform = 'translateY(-100vh)';
    article.style.transform = 'translateY(-40vh)';
    setup_guide.style.transform = 'translateY(-40vh)';
  } else {
   
    main.style.transform = 'translateY(0)';
    article.style.transform = 'translateY(0)';
    setup_guide.style.transform = 'translateY(0)';
  }
};