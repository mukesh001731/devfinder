document.addEventListener('DOMContentLoaded', (event) => {
    const modeToggle = document.getElementById('modeToggle');
    const icon = document.getElementById('icon');

    modeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        if (document.body.classList.contains('dark-mode')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
            modeToggle.style.color = 'white';
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
            modeToggle.style.color = 'black';
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.querySelector('.searchbtn');
    const inputField = document.querySelector('.searchText input');

    searchButton.addEventListener('click', () => {
        const username = inputField.value.trim();
        if (username) {
            fetchGitHubUserProfile(username);
        }
    });

    async function fetchGitHubUserProfile(username) {
        const url = `https://api.github.com/users/${username}`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('User not found');
            }
            const userProfile = await response.json();
            updateProfile(userProfile);
        } catch (error) {
            console.error('Error fetching GitHub user profile:', error);
            alert('GitHub user not found. Please try again.');
        }
    }

    function updateProfile(userProfile) {
        document.querySelector('.mainImg img').src = userProfile.avatar_url;
        document.querySelector('.githubUser').textContent = userProfile.name || 'N/A';
        document.querySelector('.githubUserName a').textContent = `@${userProfile.login}`;
        document.querySelector('.githubUserName a').href = userProfile.html_url;
        document.querySelector('.githubJoinedDate').textContent = `Joined ${new Date(userProfile.created_at).toDateString()}`;
        document.querySelector('.githubBio').textContent = userProfile.bio || 'No bio available';
        document.querySelector('.repoTotal').textContent = userProfile.public_repos;
        document.querySelector('.followerTotal').textContent = userProfile.followers;
        document.querySelector('.followingTotal').textContent = userProfile.following;
        document.querySelector('.locations').textContent = userProfile.location || 'No location';
        document.querySelector('.twit').textContent = userProfile.twitter_username ? `@${userProfile.twitter_username}` : 'No Twitter';
        document.querySelector('.websites').textContent = userProfile.blog || 'No website';
        document.querySelector('.websites').href = userProfile.blog ? `http://${userProfile.blog}` : '#';
        document.querySelector('.companies').textContent = userProfile.company || 'No company';
    }
});
