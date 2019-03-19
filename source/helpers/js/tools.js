'use strict';

var tools = {
	init: function(params) {

		this.client();

		if (params == undefined) return;

		var i = 0;
		var paramsLen = params.length;

		for (i; i < paramsLen; i++) {
			tools[params[i]]();
		}

	},
	client: function() {

		window.client = {
			get: function() {
				this.$document = $(document);
				this.$window = $(window);
				this.windowW = this.$window.width();
				this.windowH = this.$window.height();
				this.isMobile = this.windowW <= 1200;
				this.scrollW = this.getScrollWidth();
				this.isRetina = this.checkRetina();
			},
			getScrollWidth: function() {
				var outer = document.createElement("div");
				outer.style.visibility = "hidden";
				outer.style.width = "100px";
				outer.style.msOverflowStyle = "scrollbar";
				document.body.appendChild(outer);
				var widthNoScroll = outer.offsetWidth;
				outer.style.overflow = "scroll";
				var inner = document.createElement("div");
				inner.style.width = "100%";
				outer.appendChild(inner);
				var widthWithScroll = inner.offsetWidth;
				outer.parentNode.removeChild(outer);
				return widthNoScroll - widthWithScroll;
			},
			checkRetina: function() {
				if (window.matchMedia) {
		            var mq = window.matchMedia("only screen and (min--moz-device-pixel-ratio: 1.3), only screen and (-o-min-device-pixel-ratio: 2.6/2), only screen and (-webkit-min-device-pixel-ratio: 1.3), only screen  and (min-device-pixel-ratio: 1.3), only screen and (min-resolution: 1.3dppx)");
		            return (mq && mq.matches || (window.devicePixelRatio > 1));
		        }
			},
		};

		client.get();

		client.$window.on('resize', function() {
			client.get();
		});
	},
	backgrounds: function() {

		var backgrounds = document.querySelectorAll('[data-bg-src]');
		var backgroundsLen = backgrounds.length;
		var i = 0;

		for (i; i < backgroundsLen; i++) {
			var block = backgrounds[i];

			var src = block.getAttribute("data-bg-src") || "";
			var size = block.getAttribute("data-bg-size") || "cover";
			var pos = block.getAttribute("data-bg-pos") || "center center";
			var repeat = "no-repeat";

			block.style.background = "url(" + src + ") " + pos + " / " + size + " " + repeat;
		}
	},
	tabs: function() {

		window.tabs = {
			init: function() {
					var ctrl = this;

					var elements = document.querySelectorAll("[data-tabs]");
					var classInitialized = "tabs_initialized";

					ctrl.classTabActive = "tabs__tab_active";
					ctrl.classBtnActive = "tabs__btn_active";
					ctrl.tagTab = "[data-tab]";
					ctrl.tagBtn = "[data-open-tab]";

					var i = 0;
					var elementsLen = elements.length;

					for (i; i < elementsLen; i++) {
						var block = elements[i];

						var firstTabId = block.querySelector("[data-tab]").getAttribute("data-tab");
						ctrl.open(block, firstTabId);
						block.classList.add(classInitialized);
					}

					ctrl.events();
				},
				open: function(block, id) {
					var ctrl = this;

					var elements = block.querySelectorAll(ctrl.tagTab);
					var i = 0;
					var elementsLen = elements.length;

					for (i; i < elementsLen; i++) {
						var currentTab = elements[i];
						currentTab.classList.remove(ctrl.classTabActive);
					}

					block.querySelector("[data-tab='" + id + "']").classList.add(ctrl.classTabActive);

					var btns = block.querySelectorAll(ctrl.tagBtn);
					var t = 0;
					var btnsLen = btns.length;

					for (t; t < btnsLen; t++) {
						var currentBtn = btns[t];
						currentBtn.classList.remove(ctrl.classBtnActive);
					}

					block.querySelector("[data-open-tab='" + id + "']").classList.add(ctrl.classBtnActive);
				},
				events: function() {
					var ctrl = this;

					client.$document.on('click', '[data-open-tab]', function() {
						var btn = $(this);
						var block = btn.closest('.tabs');
						var id = btn.data('open-tab');

						ctrl.open(block[0], id);
					});

				}
		};

		tabs.init();

	},
	modals: function() {

		window.modals = {
			init: function() {
				var ctrl = this;

				ctrl.container = document.querySelector("[data-modals]");

                ctrl.tagBtnClose = "[data-modal-close]";
                ctrl.tagBtnCloseAll = "[data-modal-close-all]";
				ctrl.tagBtnOpen = "[data-modal-open]";
				ctrl.classModalActive = "modal_active";

				ctrl.countOpened = 0;

				ctrl.events();

			},
			open: function(id, callback) {
				var ctrl = modals;

				var currentModal = document.querySelector("[data-modal='" + id + "']");
				if (currentModal === null) {
					return;
				}
				ctrl.hideOverflow();
				currentModal.classList.add(ctrl.classModalActive);

				ctrl.countOpened++;

				$(currentModal).trigger('modalOpened');

				if (callback) callback(currentModal);

			},
			close: function(id, callback) {

				var ctrl = this;

				if (!ctrl.countOpened) return;

				var currentModal = document.querySelector("[data-modal='" + id + "']");
				if (currentModal === null) {
					return;
				}
				currentModal.classList.remove(ctrl.classModalActive);

				ctrl.countOpened--;

				if (!ctrl.countOpened) {
					setTimeout(function() {
						ctrl.showOverflow();
					}, 500);
				}

				$(currentModal).trigger('modalClosed');

                if (callback) callback(currentModal);
                
                $("[data-modal]").find("iframe").attr("src", "");

			},
			closeAll: function(callback) {
				var ctrl = this;

				var elements = ctrl.container.querySelectorAll("[data-modal]");
				var i = 0;
				var elementsLen = elements.length;

				for (i; i < elementsLen; i++) {
					var el = elements[i];
					el.classList.remove(ctrl.classModalActive);
				}

				ctrl.countOpened = 0;

				setTimeout(function() {
					ctrl.showOverflow();
				}, 500);

                if (callback) callback();
                $("[data-modal]").find("iframe").attr("src", "");

			},
			hideOverflow: function() {

				var ctrl = this;

				//document.body.style.overflowY = "hidden";
				//document.body.style.paddingRight = client.scrollW+"px";

			},
			showOverflow: function() {
				var ctrl = this;

				//document.body.style.overflowY = "auto";
				//document.body.style.paddingRight = "0";

			},
			events: function() {
				var ctrl = this;

                client.$document.on('click', ctrl.tagBtnCloseAll, function(e) {
					e.preventDefault();
					ctrl.closeAll();

                });
                
				client.$document.on('click', ctrl.tagBtnClose, function(e) {
					e.preventDefault();

					var id = $(this).closest('.modal').data('modal');

					ctrl.close(id);

				});

				client.$document.on('click', ctrl.tagBtnOpen, function(e) {
					e.preventDefault();

					var id = $(this).data('modal-open');
					// console.log("id", id);

					ctrl.open(id);

				});

			}
		};

		modals.init();

	},
	preloader: function() {

		window.preloader = {
			init: function() {
				var ctrl = this;

				ctrl.urls = ctrl.getUrls();

				ctrl.loadImages(ctrl.urls);

			},
			getUrls: function() {
				var ctrl = this;

				var urls = [];

				var images = document.getElementsByTagName('img');
				var imagesLen = images.length;
				var i = 0;

				var backgrounds = document.querySelectorAll('[data-bg-src]');
				var backgroundsLen = backgrounds.length;
				var k = 0;

				for (i; i < imagesLen; i++) {
					var url = images[i].getAttribute('src');
					urls.push(url);
				}

				for (k; k < backgroundsLen; k++) {
					var url = backgrounds[k].getAttribute('data-bg-src');
					urls.push(url);
				}

				ctrl.total = imagesLen+backgroundsLen;
				ctrl.loaded = 0;

				return urls;
			},
			loadImages: function(arr) {
				var ctrl = this;

				var i = 0;
				var arrLen = arr.length;

				for (i; i < arrLen; i++) {
					var url = arr[i];

					var img = new Image();
					img.src = url;

					img.addEventListener('load', function() {
						ctrl.loaded++;
						ctrl.check();
					});

					img.addEventListener('error', function() {
						ctrl.loaded++;
						ctrl.check();
					});
				}
			},
			getProgress: function() {
				var ctrl = this;

				return (ctrl.loaded/ctrl.total).toFixed(2);
			},
			check: function() {
				var ctrl = this;

				if (ctrl.loaded === ctrl.total)
					ctrl.done();
			},
			done: function() {
				/*var event = new CustomEvent("preloaderDone");
				document.dispatchEvent(event);*/

				var event; // The custom event that will be created

				if (document.createEvent) {
					event = document.createEvent("HTMLEvents");
					event.initEvent("preloaderDone", true, true);
				} else {
					event = document.createEventObject();
					event.eventType = "preloaderDone";
				}

				event.eventName = "preloaderDone";

				if (document.createEvent) {
					document.dispatchEvent(event);
				} else {
					document.fireEvent("on" + event.eventType, event);
				}
			}
		}

		preloader.init();

	},
	select: function() {

		window.customSelect = {
		  init: function() {

		    var _this = this;

		    _this.html = {
		      $elements: $("[data-custom-select]")
		    };

		    _this.render();

		    _this.events();

		  },
		  render: function() {

		    var _this = this;

		    _this.html.$elements.each(function() {

		      var $el = $(this);
		      var $select = $el.find("select");
		      var options = [];

		      $select.find("option").each(function() {
		        var $option = $(this);
		        var val = $option.val();
		        var text = $option.text();
		        var isSelected = $option.prop("selected");

		        options.push({
		          value: val,
		          text: text,
		          isSelected: isSelected
		        });

		      });

		      var html = _this.build(options);

		      $el.append(html);

		    });

		  },
		  build: function(options) {

		    var currentText = '';

		    var itemsList = '';

		    var i = 0, len = options.length;
		    for (i; i < len; i++) {
		      var val = options[i].value;
		      var text = options[i].text;
		      var isSelected = options[i].isSelected;

		      if (val.length && !isSelected) {
		        var item = '<button class="custom-select__item" data-select-item-value="' + val + '" data-select-item-text="' + text + '">' + text + '</button>';
		        itemsList += item;
		      }

		      if (val.length && isSelected) {
		        var item = '<button class="custom-select__item custom-select__item_hide" data-select-item-value="' + val + '" data-select-item-text="' + text + '">' + text + '</button>';
		        itemsList += item;
		      }

		      if (isSelected) {
		      	$(this).addClass('custom-select__item_hide');
		        currentText = text;
		      }
		    }

		    var totalHtml = '<div class="custom-select__outer">' +
		                        '<button class="custom-select__head">' +
		                          '<div class="custom-select__value">' +
		                            currentText +
		                          '</div>' +
		                        '</button>' +
		                        '<div class="custom-select__body">' +
		                          '<div class="custom-select__list">' +
		                            itemsList +
		                          '</div>' +
		                        '</div>' +
		                      '</div>';

		    return totalHtml;

		  },
		  setActiveItem: function($customSelect, $select, val, text) {

		    var _this = this;

		    $customSelect.find(".custom-select__value").text(text);
		    $select.val(val);
		    _this.close($customSelect);
		    $select.trigger('change');

		  },
		  open: function($customSelect) {

		    $customSelect.find(".custom-select__body").slideDown(300);
		    $customSelect.addClass('custom-select_opened');

		  },
		  close: function($customSelect) {

		    $customSelect.find(".custom-select__body").slideUp(300);
		    $customSelect.removeClass('custom-select_opened');

		  },
		  closeAll: function() {

		    var _this = this;

		    _this.html.$elements.each(function() {
		      var $el = $(this);

		      $el.find(".custom-select__body").slideUp(300);
		      $el.removeClass('custom-select_opened');

		    });

		    
		  },
		  rebuildSelect: function($select) {

			var _this = this;

			$select.siblings('.custom-select__outer').remove();
			var $el = $select.parent();

			var options = [];

			$select.find("option").each(function() {
				var $option = $(this);
				var val = $option.val();
				var text = $option.text();
				var isSelected = $option.prop("selected");

				options.push({
					value: val,
					text: text,
					isSelected: isSelected
				});

			});

			var html = _this.build(options);

			$el.append(html);

		  },
		  events: function() {

		    var _this = this;

		    client.$document.on('click', '.custom-select__head', function(e) {
		    	e.preventDefault();

		      var $customSelect = $(this).closest('[data-custom-select]');
		      if ($customSelect.hasClass('custom-select_opened')) {
		        // close
		        _this.close($customSelect);
		      } else {
		        _this.closeAll();
		        // open
		        _this.open($customSelect);
		      }

		    });

		    client.$document.on('click', '[data-select-item-value]', function(e) {
		      e.preventDefault();

		      var $option = $(this);
		      var $customSelect = $option.closest("[data-custom-select]");
		      var $select = $customSelect.find("select");

		      var val = $option.data('select-item-value');
		      var text = $option.data('select-item-text');

		      _this.setActiveItem($customSelect, $select, val, text);

		      setTimeout(function(){
			      $option.siblings().removeClass('custom-select__item_hide');
			      $option.addClass('custom-select__item_hide');
		      }, 300);
		    });

		    client.$document.on('click', function(e) {
		      if (!$(e.target).hasClass('custom-select') && !$(e.target).closest('.custom-select').length) {
		        _this.closeAll();
		      }
			});


			_this.html.$elements.find('select').on('reinitSelect', function() {
				var $select = $(this);

				_this.rebuildSelect($select);
			});

		  }
		};

		customSelect.init();

	},
	forms: function() {

		window.forms = {
			init: function() {

				var th = forms;

				th.elements = {
					$form: $("[data-form]")
				};

				th.elements.$form.find('input, textarea').each(function() {
					var $inp = $(this);
					if ($inp.val().length){
						$(this).closest('.fieldset').addClass('has-data');
					}
				});

				th.events();

			},
			onSubmit: function($form) {

				var th = forms;

				var data = $form.serializeArray();
				if (th.validate($form, data)) {
					th.send($form, data);
				}

			},
			onError: function($form, msg) {

				console.log(msg);

				var th = forms;

				$form.trigger('onerror', [msg]);
				//modals.open($form.data('error-id'));

			},
			onSuccess: function($form, msg) {

				console.log(msg);

				var th = forms;

				$form.trigger('onsuccess', [msg]);

				//modals.closeAll();
				//modals.open($form.data('success-id'));
				// $form[0].reset();
				$form.find('input').not('[data-no-reset], [type=hidden]').val('');
				//$form.find(".focus").removeClass('focus has-error');
				$form.find(".fieldset").removeClass('focus has-error has-data');

			},
			validate: function($form, data) {

				console.log(data);

				var th = forms;

				var isValid = 1;

				var validateTypes = {
					name: function(val) {
						return val.length > 0;
					},
					email: function(val) {
						var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		    			return re.test(String(val).toLowerCase());
					},
					message: function(val) {
						return val.length > 5;
					},
					phone: function(val) {
						return val.length > 5;
					},
					date: function(val) {
						return val.length === 10;
					}
				}

				var len = data.length;
				for (len; len--;) {
					var field = data[len];
					var origName = field.name;
					var $inp = $form.find("[name='"+origName+"']");
					var isReq = $inp.data('required');
					if (typeof isReq === typeof undefined || isReq === false) {
						continue;
					}
					var name = $inp.data('field-name');
					var value = field.value;
					var $field = $inp.closest('.fieldset');
					if (!validateTypes.hasOwnProperty(name)) {
						continue;
					}
					if (!validateTypes[name](value)) {
						isValid = 0;
						$field.addClass('has-error');
					} else {
						$field.removeClass('has-error');
					}
				}

				var $agreement = $form.find('[data-field-name="agreement"]');
				if ($agreement.length) {
					var $field = $agreement.closest('.fieldset');
					if (!$agreement.prop('checked')) {
						isValid = 0;
						$field.addClass('has-error');
					} else {
						$field.removeClass('has-error');
					}
				}

				if ($form.find('[name="valid"]').val().length) {
					isValid = false;
				}

				return isValid;
			},
			send: function($form, data) {

				var th = forms;

				$.ajax({
				  type: $form.attr('method'),
				  url: $form.attr('action'),
				  data: data,
				  dataType: 'json',
				  success: function(msg){
				  	if (msg.success) {
				  		th.onSuccess($form, msg);
				  	} else {
				  		th.onError($form, msg);
				  	}
				  },
				  error: function(msg){
				  	th.onError($form, msg);
				  }
				});

			},
			events: function() {

				var th = forms;

				th.elements.$form.on('submit', function(e) {
					e.preventDefault();
					var $form = $(this).closest('form');
					th.onSubmit($form);
				});

				th.elements.$form.find('input, textarea').focus(function() {
					$(this).closest('.fieldset').removeClass('has-error').addClass('focus');
				});

				th.elements.$form.find('input, textarea').blur(function() {
					var $inp = $(this);
					$inp.closest('.fieldset').removeClass('focus');
					if (!$inp.val().length) {
						$inp.closest('.fieldset').removeClass('has-data');
					} else {
						$inp.closest('.fieldset').addClass('has-data');
					}
				});

				th.elements.$form.find('input, textarea').on('keyup', function() {
					var $inp = $(this);
					if ($inp.val().length){
						$(this).closest('.fieldset').addClass('has-data');
					} else {
						$(this).closest('.fieldset').removeClass('has-data');
					}
				});

				// th.elements.$form.find('button').on('click', function(e) {
				// 	e.preventDefault();
				// });

			}
		};

		forms.init();

	}
};








































