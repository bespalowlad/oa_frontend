$(document).ready(function(){
    $(window).scroll(function(){
        var scroll = $(window).scrollTop(),
        headerId = $('#main-header'),
        logo = headerId.find('.logo img');

        if(scroll > 1){
            headerId.css({
                'background': '#ffffff',
                'color': '#000'
            });
            logo.attr('src', '../img/logo-black.svg');
        } else {
            headerId.css({
                'background': 'transparent',
                'color': '#fff'
            });
            logo.attr('src', '../../../img/logo.svg');
        }
    });
});