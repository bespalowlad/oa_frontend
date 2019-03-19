$('.main-poster__slider').on("init", function(event, slick){
    $('.slick-prev').hide();
    
});

$('.main-poster__slider').on("afterChange", function(event, slick){
    if(slick.currentSlide == 0){
        $('.slick-prev').hide();
    } else {
        $('.slick-prev').show();
    }
    if(slick.currentSlide == slick.slideCount - 1){
        $('.slick-next').hide();
    } else {
        $('.slick-next').show();
    }
});

$('.main-poster__slider').slick({
    arrows: true,
    dots: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    // infinite: false,
    // autoplay: true,
    // autoplaySpeed: 5000,
});



