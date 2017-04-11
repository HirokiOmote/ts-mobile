import lightcase from 'lightcase';
import fatNav from './jquery.fatNav';

$(() => {
  $(window).load(() => {
    modal();
    menu();
  });
});

function menu() {
  $.fatNav();

  const menu = '.fat-nav';
  const btn = '.hamburger';
  let state = false;
  let currentWidth = window.innerWidth;

  $(btn).on('click', () => {
    if (!state) {
      $(window).on('touchmove.noScroll', (e) => {
        e.preventDefault();
      });
      state = true;
    } else {
      $(window).off('.noScroll');
      state = false;
    }
  });

  window.addEventListener("resize", () => {
    if (currentWidth == window.innerWidth) {
      return;
    }
    if(currentWidth <= 1200) {
      $(menu).hide();
    } else {
      $(menu).show();
    }

    currentWidth = window.innerWidth;
    state = false;
    $(menu).removeClass('active');
    $(btn).removeClass('active');
    $(window).off('.noScroll');
  });
}

function modal() {
  $('a[data-rel^=lightcase]').lightcase();
}
