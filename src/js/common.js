import slick from 'slick-carousel';
import lightcase from 'lightcase';

$(() => {
  $(window).load(() => {
    btnMenu();
    slider();
    modal();
  });
});

function btnMenu() {
  const btn = '.menu-trigger';
  const menu = '.globalNavigation';

  $(btn).on('click', (event) => {
    event.preventDefault();
    $(btn).toggleClass('active');
    $(menu).toggle(400).toggleClass('active');
  });
}

function slider() {
  $('.slider').slick({
    autoplay: true,
    fade: true,
    slidesToShow: 1,
    dots: false,
    arrows: false
  });
}

function modal() {
  $('a[data-rel^=lightcase]').lightcase();
}
