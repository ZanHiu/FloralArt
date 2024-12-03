// Sticky scrolled
window.onscroll = function () {
  const header = document.querySelector('#header');
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
};