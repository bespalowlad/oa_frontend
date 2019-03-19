var animations = {

    init: function() {
    
      var th = animations;
      th.$splitLetters = $("[data-split-letters]");
      th.$splitLines = $("[data-split-lines]");
    
      th.prepareElements();
    
    },
    prepareElements: function() {
    
      var th = animations;
    
      th.$splitLetters.each(function(){
    
        var $letters = $(this);
      
        splitLines($letters);
      
        var $lines = $letters.find('.line');
      
        var isSpace = 0;
      
        $lines.each(function() {
          var $l = $(this);
          var arrayLetters = $l.text().split('');
          var string = '';
          var delay = 0;
          var step = .05;
          var tr = .5;
          var trStep = .03;
      
          for (i = 0; i < arrayLetters.length; i++) {
      
          var transition = 'transition: transform '+(tr+trStep)+'s ease ' + (delay+step) + 's, opacity '+(tr+trStep)+'s ease ' + (delay+step) + 's; -webkit-transition: transform '+(tr+trStep)+'s ease ' + (delay+step) + 's, opacity '+(tr+trStep)+'s ease ' + (delay+step) + 's;';
          delay = delay+step;
          tr = tr+trStep;
      
          var element = '<span class="letter" style="'+transition+'">'+ arrayLetters[i] +'</span>';
          var next = i+1;
      
          if (next < arrayLetters.length && arrayLetters[next] == ' ') {
            element = '<span class="letter" style="'+transition+'">'+ arrayLetters[i] +'&nbsp;</span>';
          }
      
          if (arrayLetters[i] == ' ') {
            element = '';
          }
      
          string += element;
      
          };
      
          $l.html(string);
      
        });
    
      });
    
      th.$splitLines.each(function(){
    
        var $letters = $(this);
      
        splitLines($letters);
    
      });
    
    }
};
    
    
    
function splitLines($block) {
    
    var text = $block.html(function(i, h){
      return h.replace(/(\S+\s*)/g, '<span>$1</span>');
    });
    
    var  pt = 0,
    obj = {},
    curPt = 0,
    k = 0,
    output = '';
    
    $('span', $block).each(function(i, el){
      curPt = $(el).offset().top;
      var text = $(this).html();
    
      if(curPt > pt) {
      pt = curPt;
      obj[++k] = [];
      };
    
      try {
      obj[k].push(text);
      } catch(error) {}
    
    });
    
    var layout = "";
    
    $.each(obj, function(i, line){
      layout += '<span class="line">' +  line.join('')  + '</span>';
    });
    
    $block.html(layout);
    
};
    
    
var scrollAnimations = function() {
    
    var $blocks = $('[data-split-letters], [data-split-lines], .has-animation');

    if (client.isMobile) {
        $('[data-animation-delay]').each(function() {
            $(this).attr('data-animation-delay', '0');
        });
    }

    var k = client.isMobile ? 1 : 1.2;
    
    
    var check = function() {
    
        var s = $(window).scrollTop();
    
        // $titles.each(function() {
        //     var $th = $(this);
    
        //     if ($th.offset().top - s < client.windowH) {
        //         $th.addClass('show');
        //     }
        // });
    
        $blocks.each(function() {
            var $th = $(this);
            var delay = $th.data("animation-delay");

            if (delay && $th.offset().top - s < client.windowH/k && !$th.hasClass('animation-complete')) {
              setTimeout(function(){
                $th.addClass('animation-complete');
              }, delay)
            }
            if (!delay && $th.offset().top - s < client.windowH/k && !$th.hasClass('animation-complete')) {
                $th.addClass('animation-complete');
            }
        });
    
    };
    
    var events = function() {
        $(window).on('scroll', function() {
            check();
        });
    };
    
    var init = function() {
        events();
        setTimeout(function() {
          check();
        }, 200);
    };
    
    //init();
    
    return {
        check: check,
        init: init
    }
};

modules.add('scrollAnimations');