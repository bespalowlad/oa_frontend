$(document).ready(function(){
    var img = $('.poster__arrow'),
        section = $('#description');

    img.click(function(){
        $('html').animate({scrollTop: section.offset().top}, 500);
    });
});