document.addEventListener('DOMContentLoaded', () => {

    const pathParts = window.location.pathname.split("/").filter(p => p);
    const hostname = pathParts.pop();
    console.log("Current page:", hostname);

    if (hostname.includes('account')) {
        const formData = append_form('account-display', hostname);
        apicall('account-display', formData);

        document.querySelectorAll('input[type="button"][value="Edit"]').forEach(button => {
            button.addEventListener('click', (e) => {
                const parent = e.target.closest('.output-group');
                const input = parent.querySelector('input:not([type="button"])');

                input.disabled = false;
                input.focus();
                button.style.display = "none";

                function handleClickOutside(event) {
                    if (!input.contains(event.target)) {
                        lockField();
                    }
                }

      
                function handleEnter(event) {
                    if (event.key === "Enter") {
                        lockField();
                    }
                }

                function lockField() {
                    append_form('update' , )
                    input.disabled = true;
                    button.style.display = "block";
                    document.removeEventListener("click", handleClickOutside);
                    input.removeEventListener("keydown", handleEnter);
                }

                setTimeout(() => {
                    document.addEventListener("click", handleClickOutside);
                    input.addEventListener("keydown", handleEnter);
                }, 0);
            });
        });
    }
    else if (hostname.includes('signin')) {
        const form = document.getElementById('userForm');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = append_form('signin', hostname);
            apicall('signin', formData);
        });
    }
    else if (hostname.includes('signup')) {
        const form = document.getElementById('userForm');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = append_form('signup', hostname);
            apicall('signup', formData);
        });
    }
});

function append_form(action_, hostname) {
    let formData = new FormData();

    if (hostname.includes('account')) {
        formData.append('userid', localStorage.getItem('userId'));
        formData.append('action', action_);
    }
    else if (hostname.includes('signin')) {
        formData.append('login', document.getElementById('username-input').value);
        formData.append('password', document.getElementById('password-input').value);
        formData.append('action', action_);
    }
    else if (hostname.includes('signup')) {
        formData.append('Email', document.querySelector('[name="Email"]').value);
        formData.append('Uname', document.querySelector('[name="Uname"]').value);
        formData.append('password', document.querySelector('[name="password"]').value);
        formData.append('confirmpassword', document.querySelector('[name="confirmpassword"]').value);
        formData.append('action', action_);
    }

    return formData;
}

function apicall(action, formdata) {
    fetch('../api/app.php', {
        method: 'POST',
        body: formdata
    })
        .then(res => res.json())
        .then(data => {
          
            if (action.includes('account-display')) {
                if (data.status === "success" && data.data.length > 0) {
                    const user = data.data[0];
                    document.getElementById('email').value = user.EmailAddress;
                    document.getElementById('uname').value = user.Username;
                    document.getElementById('password').value = user.Password;
                } else {
                    console.error("Error:", data.message);
                    createpopup("error", data.message);
                }
            }
            else if (action.includes('signin')) {
                if (data.status === "success") {
                    setTimeout(() => {
                        document.getElementById('main-container').style.boxShadow = '0px 0px 5px #085f4e';
                    }, 50);
                    setTimeout(() => {
                        document.getElementById('main-container').style.boxShadow = '0px 0px 5px black';
                    }, 3000);

                    createpopup(data.status, data.message);

                    localStorage.setItem('userId', data.id);
                    localStorage.setItem('username', data.username);

                    setTimeout(() => createpopup(data.status, "Redirecting..."), 2000);
                    setTimeout(() => window.location.href = 'http://localhost:8000/public/index.html', 3000);
                } else {
                    setTimeout(() => {
                        document.getElementById('main-container').style.boxShadow = '0px 0px 5px #5f0808ff';
                    }, 50);
                    setTimeout(() => {
                        document.getElementById('main-container').style.boxShadow = '0px 0px 5px black';
                    }, 3000);

                    createpopup("error", data.message);
                }
            }
            else if (action.includes('signup')) {
                if (data.status === "success") {
                    setTimeout(() => {
                        document.getElementById('main-container').style.boxShadow = '0px 0px 5px #085f4e';
                    }, 50);
                    setTimeout(() => {
                        document.getElementById('main-container').style.boxShadow = '0px 0px 5px black';
                    }, 3000);

                    createpopup(data.status, data.message);

                    setTimeout(() => createpopup(data.status, "Redirecting to Sign in..."), 2000);
                    setTimeout(() => window.location.href = 'signin.html', 3000);
                } else {
                    setTimeout(() => {
                        document.getElementById('main-container').style.boxShadow = '0px 0px 5px #5f0808ff';
                    }, 50);
                    setTimeout(() => {
                        document.getElementById('main-container').style.boxShadow = '0px 0px 5px black';
                    }, 3000);

                    createpopup("error", data.message);
                }
            }
        })
        .catch(err => {
            setTimeout(() => {
                document.getElementById('main-container').style.boxShadow = '0px 0px 5px #5f0808ff';
            }, 50);
            setTimeout(() => {
                document.getElementById('main-container').style.boxShadow = '0px 0px 5px black';
            }, 3000);

            console.error("Fetch Error:", err);
            createpopup("error", "Server error or invalid JSON response");
        });
}

