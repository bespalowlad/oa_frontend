$(document).ready(function(){

  var rangeProjects = document.getElementById('range-all-projects');

    if(rangeProjects){

        var scrollPos = 0,
            val = 0,
            containerWidth = $('.projects__container').outerWidth() - $('.projects__slider').outerWidth();

        $('.projects__slider').mousewheel(function(e, delta) {
                this.scrollLeft -= delta;

                if(delta < 0 && scrollPos < 100 || delta > 0 && scrollPos > 0) {
                    scrollPos = this.scrollLeft * 100 / containerWidth;
                    rangeProjects.noUiSlider.set(scrollPos);
            
                    e.preventDefault();
                }
        });


        var initCoordX = 0,
            deltaCoord = 0,
            slider = $('.projects__slider');

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
            rangeProjects.noUiSlider.set(scrollPos);

            return false;
        }
        
        function mouseUp(e){
            slider.off('mousemove', mouseMove);
            slider.off('mouseup', mouseUp);
        }

        // create range
        noUiSlider.create(rangeProjects, {
            start: [0],
            range: {
                'min': [0],
                'max': [100]
            },
            step: 1
        });

        rangeProjects.noUiSlider.on('update', function(){
            var scroll = rangeProjects.noUiSlider.get();
            val = scroll * containerWidth / 100;

            $('.projects__slider').scrollLeft(val);
        })

    }
})
