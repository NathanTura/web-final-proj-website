document.addEventListener('DOMContentLoaded', () => {

    const link_ = document.getElementById('signup');
    const signuphtml = link_.innerHTML;

    const userid = window.localStorage.getItem('userId');
    const username = window.localStorage.getItem('username');

    if (userid != null && username != null) {
        if (link_) {
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
        }
    } else {
        link_.innerHTML = signuphtml;
    }
});
