document.addEventListener('DOMContentLoaded', () => {
    let formData = new FormData();
    formData.append('userid', localStorage.getItem('userId'));

    fetch('../api/account.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === "success" && data.data.length > 0) {
            const user = data.data[0]; 

            document.getElementById('email').value = user.EmailAddress;
            document.getElementById('uname').value  = user.Username;
            document.getElementById('password').value  = user.Password;
        } else {
            console.error("Error:", data.message);
        }
    })
    .catch(err => console.error("Fetch Error:", err));
});
