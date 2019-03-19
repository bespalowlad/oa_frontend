$(document).ready(function(){

    var rangePress = document.getElementById('range-slider');

    if(rangePress){

        var scrollPos = 0,
            val = 0,
            containerWidth = $('.press__container').outerWidth() - $('.press__slider').outerWidth();

        $('.press__slider').mousewheel(function(e, delta) {
            this.scrollLeft -= delta;

            if(delta < 0 && scrollPos < 100 || delta > 0 && scrollPos > 0) {
                scrollPos = this.scrollLeft * 100 / containerWidth;
                rangePress.noUiSlider.set(scrollPos);
        
                e.preventDefault();
            }
        });


        var initCoordX = 0,
            deltaCoord = 0,
            slider = $('.press__slider');

        slider.on('touchstart',function(e){ 
            slider.on('touchmove', mouseMove);
            slider.on('touchend', mouseUp);
            
            if(e.type == 'touchstart'){
                initCoordX = e.originalEvent.touches[0].pageX;
            }
        });

        function mouseMove(e){
            if(e.type == 'touchmove'){
                var coordX = initCoordX - e.originalEvent.touches[0].pageX;
                initCoordX = e.originalEvent.touches[0].pageX;
                val += coordX;
            }

            slider.scrollLeft(val);
            scrollPos = val * 100 / containerWidth;
            rangePress.noUiSlider.set(scrollPos);

            return false;
        }
        
        function mouseUp(e){
            slider.off('mousemove', mouseMove);
            slider.off('mouseup', mouseUp);
        }

        noUiSlider.create(rangePress, {
            start: [0],
            range: {
                'min': [0],
                'max': [100]
            },
            step: 1
        });

        rangePress.noUiSlider.on('update', function(){
            var scroll = rangePress.noUiSlider.get(),
                val = scroll * containerWidth / 100;

            $('.press__slider').scrollLeft(val);
        })

    }
})