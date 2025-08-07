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