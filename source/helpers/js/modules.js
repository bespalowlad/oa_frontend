
var modules = {
    isInited: false,
    data: {
		all: []
	},
    init: function() {
		if (modules.isInited) return;

		console.log(modules.data.all);

		modules.data.all.forEach(function(item) {
			window[item] = window[item]();
		});
		
		var page = document.body.getAttribute('data-page');
		if (!page) return;

		var activeArray = modules.data[page];

		if (!activeArray) {
			modules.isInited = true;
			return;
		}

		activeArray.forEach(function(item) {
			window[item] = window[item]();
		});
        
		modules.isInited = true;
		
    },
    add: function(module, pages) {

		if (!pages) {
			modules.data.all.push(module);
			return;
		}

		pages.forEach(function(page) {
			if (!modules.data.hasOwnProperty(page)) {
				modules.data[page] = [];
			}
	
			modules.data[page].push(module);
		});

		
    }
};