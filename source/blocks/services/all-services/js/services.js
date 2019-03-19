// $(document).ready(function(){
    // $('.services__text').each(function(){
    //     var fullReview = $(this).html(),
    //         review = fullReview;

    //     console.log('length ', review.length);
    //     console.log('full ', fullReview);

    //     if(review.length > 150) {
    //         review = review.substring(0, 150);
    //         $(this).html(review + '...' + '<div class="services__show-more">Show more</div>');
    //     }
    //     $(this).append('<div class="full_text" style="display: none;">' + fullReview + '</div>');

    //     $('.services__show-more').click(function(e){
    //         e.preventDefault();
    //         $(this).parent().html($(this).parent().find('.full_text').html());
    //     });
    // });
// });

$(window).load(function(){
    $('.services__text').readmore({
        speed: 75,
        collapsedHeight: 100,
        moreLink: '<span>Show more</span>',
        lessLink: '<span>Hide</span>'
    });
})