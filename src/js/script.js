const open = document.querySelector('.hamburger'),
      menu = document.querySelector('.menu'),
      close = document.querySelectorAll('.menu__close');

open.addEventListener('click', () => {
    menu.classList.add('active');
});

close.forEach((e) => {
    e.addEventListener('click', () => {
        menu.classList.remove('active');
    });
});