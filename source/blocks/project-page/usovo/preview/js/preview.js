$(document).ready(function(){

    var range = document.getElementById('range-preview');

    if(range) {

        var scrollPos = 0,
            val = 0,
            containerWidth = $('.preview__container').outerWidth() - $('.preview__slider').outerWidth();

        $('.preview__slider').mousewheel(function(e, delta) {
            this.scrollLeft -= delta;
            
            if(delta < 0 && scrollPos < 100 || delta > 0 && scrollPos > 0) {
                scrollPos = this.scrollLeft * 100 / containerWidth;
                range.noUiSlider.set(scrollPos);
        
                e.preventDefault();
            }
        });

        var initCoordX = 0,
            deltaCoord = 0,
            slider = $('.preview__slider');

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
            range.noUiSlider.set(scrollPos);

            return false;
        }
        
        function mouseUp(e){
            slider.off('mousemove', mouseMove);
            slider.off('mouseup', mouseUp);
        }

        noUiSlider.create(range, {
            start: [0],
            range: {
                'min': [0],
                'max': [100]
            },
            step: 1
        });

        range.noUiSlider.on('update', function(){
            var scroll = range.noUiSlider.get(),
                val = scroll * containerWidth / 100;

            $('.preview__slider').scrollLeft(val);
        })

    }
})


