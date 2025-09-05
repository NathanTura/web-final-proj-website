document.getElementById('userForm').addEventListener('submit', function (e) {
    e.preventDefault();  // Prevent default form submit
    //Normally, when a form is submitted, the browser reloads the page and sends the form data to the server
    const formData = new FormData(this);
    formData.append('action', 'create');
    //action: create //This tells the server what we want to do (for example: create a new user).

    // Submit to PHP via AJAX
    /**
     * 
     * Instead of submitting a form and the whole page refreshing, 
     * we use JavaScript (fetch, XMLHttpRequest, etc.) to send the form data, wait for a reply, 
     * and update the page in the background.
     */
    document.getElementById('userForm').addEventListener('submit', function (e) {
        e.preventDefault();

        const formData = new FormData(this);
        formData.append('action', 'create');

        fetch('../api/signup.php', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                const messageEl = document.getElementById('message');

                if (data.status === 'success') {
          
                    messageEl.style.color = 'green';
                    messageEl.innerText = `${data.message}`;

                    localStorage.setItem('userId', data.id);
                    localStorage.setItem('username' , data.username);

                    setTimeout(() => {
                        messageEl.innerText = 'Redirecting...';
                    }, 2000);

                    setTimeout(() => {
                        window.location.href = 'http://localhost:8000/public/index.html';
                    }, 3000);

                } else {
        
                    messageEl.style.color = 'red';
                    messageEl.innerText = data.message;
                }
            })
            .catch(err => {
                const messageEl = document.getElementById('message');
                messageEl.style.color = 'red';
                messageEl.innerText = 'Error with database';
                console.error(err);
            });
    });

});