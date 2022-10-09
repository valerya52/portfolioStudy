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


const persent = document.querySelectorAll('.item-range__percent'),
      rangeLine = document.querySelectorAll('.item-range__inner-line');

console.log(persent);

persent.forEach( (e, i) => {
    console.log(e);
    rangeLine[i].style.width = e.innerHTML;
});
