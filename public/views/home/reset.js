(function () {

    'use strict';

    app = app || {};

    app.Reset = Backbone.Model.extend({
        defaults: {
            success: false,
            errors: [],
            errfor: {},
            id: undefined,
            email: undefined,
            password: '',
            repassword: ''
        },
        url: function () {
            return '/reset/' + this.get('email') + '/' + this.id + '/';
        }
    });

    app.ResetView = Backbone.View.extend({
        el: '#view-reset',
        events: {
            'click #btn-reset': 'reset',
            'submit form': 'preventSubmit',
            'keypress': 'resetOnEnter'
        },
        initialize: function () {
            this.$el.find('[id="warning-reset"]').hide();
            this.listenTo(this.model, 'sync', this.render);
            this.render();
        },
        render: function () {
            return this;
        },
        preventSubmit: function (event) {
            event.preventDefault();
        },
        resetOnEnter: function () {
            if (event.keyCode === KEYCODE_ENTER) {
                this.validateForm();
            } else {
                return;
            }

            event.preventDefault();
            this.reset();
        },
        reset: function () {
            NProgress.start();
            if (!this.validateForm()) {
                return;
            }
            this.$el.find('#btn-reset').attr('disabled', true);
            this.model.save({
                password: this.$el.find('[id="reset-password"]').val(),
                repassword: this.$el.find('[id="reset-repassword"]').val()
            }, {
                success: function (model, response) {
                    $('#btn-reset').attr('disabled', false);
                    NProgress.done();
                    if (response.success) {
                        location.href = '/';
                    } else {
                        model.set(response);
                        if (response.errfor.password) {
                            $('[id="reset-callback-info"]').text(response.errfor.password);
                        } else if (response.errfor.repassword) {
                            $('[id="reset-callback-info"]').text(response.errfor.repassword);
                        } else {
                            $('[id="reset-callback-info"]').text(response.errors);
                        }
                        $('[id="warning-reset"]').show();
                    }
                }
            });
        },
        validateForm: function () {
            NProgress.done();
            var password = this.$el.find('[id="reset-password"]').val();
            var repassword = this.$el.find('[id="reset-repassword"]').val();
            if (password === '') {
                this.$el.find('[id="reset-password"]').focus();
                return false;
            } else if (repassword === '') {
                this.$el.find('[id="reset-repassword"]').focus();
                return false;
            }
            return true;
        }
    });

    app.Router = Backbone.Router.extend({
        routes: {
            'reset/': 'start',
            'reset/:email/:token/': 'start'
        },
        start: function (email, token) {
            app.resetView = new app.ResetView({model: new app.Reset({id: token, email: email})});
        }
    });

    $(document).ready(function () {
        app.router = new app.Router();
        Backbone.history.start({pushState: true});

        $('#view-reset').modal({backdrop: 'static'});
    });
}());