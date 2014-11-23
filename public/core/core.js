var app;

(function () {
    'use strict';

    $(document).ready(function () {

        //register global ajax handlers
        $(document).ajaxStart(function () {
            NProgress.start();
        });
        $(document).ajaxStop(function () {
            NProgress.done();
        });

        $.ajaxSetup({
            beforeSend: function (xhr) {
                xhr.setRequestHeader('x-csrf-token', $.cookie('_csrfToken'));
            }
        });

    });
}());