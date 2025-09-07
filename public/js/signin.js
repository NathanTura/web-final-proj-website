document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('userForm');

    form.addEventListener('submit', e => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('login', document.getElementById('username-input').value);
        formData.append('password', document.getElementById('password-input').value);

        fetch('../api/signin.php', {
            method: 'POST',
            body: formData
        })
        .then(res => res.json())
        .then(data => {
            if (data.status === "success") {

               
                 setTimeout(() => {
                     document.getElementById('main-container').style.boxShadow = '0px 0px 5px #085f4e'
                }, 50);

                setTimeout(() => {
                    document.getElementById('main-container').style.boxShadow = '0px 0px 5px black'
                }, 3000);
                createpopup("success", data.message);

                
                localStorage.setItem('userId', data.id);
                localStorage.setItem('username' , data.username);

                setTimeout(() => createpopup("success", "Redirecting..."), 2000);
                setTimeout(() => window.location.href = 'http://localhost:8000/public/index.html', 3000);

            } else {
                setTimeout(() => {
                    document.getElementById('main-container').style.boxShadow = '0px 0px 5px #5f0808ff'
                }, 50);

                setTimeout(() => {
                    document.getElementById('main-container').style.boxShadow = '0px 0px 5px black'
                }, 3000);
              
                createpopup("error", data.message);
            }
        })
        .catch(err => {
                setTimeout(() => {
                    document.getElementById('main-container').style.boxShadow = '0px 0px 5px #5f0808ff'
                }, 50);

                setTimeout(() => {
                    document.getElementById('main-container').style.boxShadow = '0px 0px 5px black'
                }, 3000);
            console.error("Fetch Error:", err);
            createpopup("error", "Server error or invalid JSON response");
        });
    });
});
