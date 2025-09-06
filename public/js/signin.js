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
                createpopup("success", data.message);

              
                localStorage.setItem('userId', data.id);
                localStorage.setItem('username' , data.username);

                setTimeout(() => createpopup("success", "Redirecting..."), 2000);
                setTimeout(() => window.location.href = 'http://localhost:8000/public/index.html', 3000);

            } else {
                createpopup("error", data.message);
            }
        })
        .catch(err => {
            console.error("Fetch Error:", err);
            createpopup("error", "Server error or invalid JSON response");
        });
    });
});
