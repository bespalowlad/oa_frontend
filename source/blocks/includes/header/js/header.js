$(document).ready(function(){

    $(window).scroll(function(){
        var scroll = $(window).scrollTop(),
        header = $('#header'),
        logo = header.find('.logo img');

        if(scroll > 1){
            header.css({
                // 'position': 'fixed',
                // 'z-index': '4',
                // 'width': '100%',
                'color': '#000',
                'background': '#fff',
            });
        } else {
            header.css({
                // 'position': 'relative',
                'background': '#fff'
            });
        }
    });
});