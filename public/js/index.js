document.addEventListener('DOMContentLoaded', () => {
    const link_ = document.getElementById('signup');
    const signuphtml = link_.innerHTML;

    const userid = window.localStorage.getItem('userId');
    const username = window.localStorage.getItem('username');

    if (userid && username && link_) {
        link_.style.display = 'flex';
        link_.style.alignItems = 'center';
        link_.style.gap = '0.5rem';
        link_.style.flexWrap = 'nowrap';
        link_.style.whiteSpace = 'nowrap';
        link_.style.minWidth = 'fit-content';

        link_.innerHTML = `
            <img id="profileImg" src="assets/profile_pic2.png" alt="profile">
            <p>Welcome ${username}</p>
        `;

        const profileImg = document.getElementById('profileImg');

        profileImg.addEventListener('mouseenter', () => {
            profileImg.src = 'assets/profile_pic.png';
        });
        profileImg.addEventListener('mouseleave', () => {
            profileImg.src = 'assets/profile_pic2.png';
        });

        profileImg.addEventListener('click', profile_display);
    } else {
        link_.innerHTML = signuphtml;
    }
});

function profile_display(e) {
    e.stopPropagation();


    const existing = document.getElementById('profileDropdown');
    if (existing) existing.remove();

    const dropdown = document.createElement('div');
    dropdown.id = 'profileDropdown';
    dropdown.innerHTML = `
        <a href="account.html">Account</a>
        <a href="#" id="logoutBtn">Logout</a>
    `;

    dropdown.style.left = (e.clientX + 10) + 'px';
    dropdown.style.top = (e.clientY + 10) + 'px';

    document.body.appendChild(dropdown);

    dropdown.classList.add('show')

    document.getElementById('logoutBtn').addEventListener('click', () => {
        localStorage.removeItem('userId');
        localStorage.removeItem('username');
        window.location.reload();
    });

    document.addEventListener('click', () => {
        dropdown.classList.remove('show');
        setTimeout(() => dropdown.remove(), 300); // match transition
    }, { once: true });
}
