
var browserDetecter = function() {

    var browser = 'unknown';

    var is_chrome = !!window.chrome && !is_opera;
    if (is_chrome) {
        browser = 'chrome';
    }
    var is_explorer= typeof document !== 'undefined' && !!document.documentMode && !isEdge;
    if (is_explorer) {
        browser = 'ie';
    }
    var is_firefox = typeof window.InstallTrigger !== 'undefined';
    if (is_firefox) {
        browser = 'firefox';
    }
    var is_safari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    if (is_safari) {
        browser = 'safari';
    }
    var is_opera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
    if (is_opera) {
        browser = 'is_opera';
    }

    window.browser = browser;
    $('body').addClass('browser-' + browser);
};