function checkOffset() {
    var a=$(document).scrollTop()+window.innerHeight;
    var b=$('footer').offset().top;
    if (a<b) {
      $('#calculator').css('top', '4.8rem');
    } else {
      $('#calculator').css('top', (-.6*(a-b-10))+'px');
    }
  }

$(document).ready(checkOffset);

$(document).scroll(checkOffset);