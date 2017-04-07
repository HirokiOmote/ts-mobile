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
  const winWidth = $(window).width();
  let state = false;
  let timer = false;
  let scrollpos;
  let winWidth_resized;

  $(btn).on('click', (event) => {
    event.preventDefault();

    if(state == false) {
      state = true;
      scrollpos = $(window).scrollTop();
      $(btn).addClass('active');
      $(menu).show(400).addClass('active');
      $('body').toggleClass('no-scroll').css({'top': -scrollpos});
    } else {
      state = false;
      $(btn).removeClass('active');
      $(menu).hide(400).removeClass('active');
      $('body').removeClass('no-scroll').css({'top': 0});
      window.scrollTo(0, scrollpos);
    }

    $(window).resize(() => {
      if (timer !== false) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        winWidth_resized = $(window).width();

        if ( winWidth != winWidth_resized ) {
          $(btn).removeClass('active');
          $(menu).removeClass('active');
          $('body').removeClass('no-scroll').css({'top': 0});
          state = false;
        }
        if( winWidth_resized < 1024 ) {
          $(menu).hide(400);
        } else {
          $(menu).show(400);
        }
      }, 200);
    });
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
