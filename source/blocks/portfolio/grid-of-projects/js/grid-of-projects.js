$(document).ready(function(){
    var filter = $('.filter'),
        all = $('.all-projects__category'),
        visible = false;

    $(document).on('click', function(event){
         var elem = $(event.target);

         if(elem.is('h3.all-projects__category') == all.is('h3.all-projects__category') && visible == false) showFilter();
         else if (elem.is('h3.all-projects__category') == all.is('h3.all-projects__category') && visible == true) hideFilter();
         else if (elem.closest('div') !== $('.filter')) hideFilter();
    });

    function showFilter(){
        filter.css({
            'transform': 'scale(1)',
            'opacity': 1
        });
        $('.all-projects__category img').css('transform', 'scale(1, -1)');
        visible = true;
    }

    function hideFilter(){
        filter.css({
            'transform': 'scale(0)',
            'opacity': 0
        });
        $('.all-projects__category img').css('transform', 'scale(-1, 1)');
        visible = false;
    }


    $('.filter__link').on('click', function(event){
        event.preventDefault();
        var elem = $(event.target),
            getId = elem.attr('id'),
            getCurrent = $('.grid-projects__item.' + getId);

        //show or hide item
        $('.grid-projects__item').not(getCurrent).hide();
        getCurrent.show();

        //delete or add check
        if(elem.hasClass('filter__checked')) {
            elem.removeClass('filter__checked');
            all.html('All projects' + ' <img src="img/filter-arrow.svg">');
        } else {
            $('.filter__link').removeClass('filter__checked');      //delete all check
            elem.addClass('filter__checked');
            all.html(elem.html() + ' <img src="img/filter-arrow.svg">');
        }

        //if user didn't choose, then show all item
        if($('.filter__checked').length == 0) $('.grid-projects__item').show();
    })

    $('.filter__footer').on('click', function(){
        $('.filter__link').removeClass('filter__checked'); //Delete all check mark
        $('.grid-projects__item').show();
        all.html('All projects' + '<img src="img/filter-arrow.svg">');
    });
});

// function loadMore()
// {
//    console.log("More loaded");
//     $("body").append("<img src='img/projects-1.jpg'>");
//    $(window).bind('scroll', bindScroll);
//  }

//  function bindScroll(){
//    if($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
//        $(window).unbind('scroll');
//        loadMore();
//    }
// }

// $(window).scroll(bindScroll);