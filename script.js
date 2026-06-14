const cursorGlow = document.querySelector('.cursor-glow');
const reveals = document.querySelectorAll('.reveal');
const filters = document.querySelectorAll('.filter');
const projects = document.querySelectorAll('.project-card');
const copyEmailButton = document.getElementById('copyEmail');

const observer = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    },
    { threshold: 0.14 }
);

reveals.forEach(section => observer.observe(section));

document.addEventListener('pointermove', event => {
    if (!cursorGlow) return;
    cursorGlow.style.left = `${event.clientX}px`;
    cursorGlow.style.top = `${event.clientY}px`;
});

filters.forEach(button => {
    button.addEventListener('click', () => {
        filters.forEach(item => item.classList.remove('active'));
        button.classList.add('active');

        const selected = button.dataset.filter;

        projects.forEach(card => {
            const shouldShow = selected === 'all' || card.dataset.category === selected;
            card.style.display = shouldShow ? 'flex' : 'none';
        });
    });
});

if (copyEmailButton) {
    copyEmailButton.addEventListener('click', async () => {
        const email = 'taiyab@example.com';

        try {
            await navigator.clipboard.writeText(email);
            copyEmailButton.textContent = 'Email copied';
            setTimeout(() => {
                copyEmailButton.textContent = 'Copy email';
            }, 1800);
        } catch {
            copyEmailButton.textContent = email;
        }
    });
}