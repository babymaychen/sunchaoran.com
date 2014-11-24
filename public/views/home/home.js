(function () {

    'use strict';

    app = app || {};

    app.Login = Backbone.Model.extend({
        url: '/login/',
        defaults: {
            errors: [],
            errfor: {},
            email: '',
            password: ''
        }
    });

    app.Signup = Backbone.Model.extend({
        url: '/signup/',
        defaults: {
            errors: [],
            errfor: {},
            username: '',
            email: '',
            password: '',
            repassword: ''
        }
    });

    app.Forgot = Backbone.Model.extend({
        url: '/forgot/',
        defaults: {
            errors: [],
            errfor: {},
            email: ''
        }
    });

    app.LoginView = Backbone.View.extend({
        el: '#modal-login',
        events: {
            "click #btn-login": "login",
            "click #btn-login-close": "close",
            'submit form': 'preventSubmit',
            'keypress': 'loginOnEnter'
        },
        initialize: function () {
            this.$el.find('[id="warning-login"]').hide();
            this.model = new app.Login();
            this.listenTo(this.model, 'sync', this.render);
        },
        render: function () {

        },
        login: function () {
            NProgress.start();
            if (!this.validateForm()) {
                return;
            }
            this.$el.find('#btn-login').attr('disabled', true);
            this.model.save({
                username: this.$el.find('[id="login-username"]').val().trim(),
                password: this.$el.find('[id="login-password"]').val()
            }, {
                success: function (model, response) {
                    $('#btn-login').attr('disabled', false);
                    if (response.success) {
                        //var returnUrl = response.defaultReturnUrl;
                        location.href = "/";
                    } else {
                        model.set(response);
                        if (response.errfor.email) {
                            $('[id="login-callback-info"]').text(response.errfor.username);
                        } else if (response.errfor.password) {
                            $('[id="login-callback-info"]').text(response.errfor.password);
                        } else if (response.errors) {
                            $('[id="login-callback-info"]').text(response.errors);
                        }
                        $('[id="warning-login"]').show();
                    }
                    NProgress.done();
                }
            });
        },
        validateForm: function () {
            NProgress.done();
            var username = this.$el.find('[id="login-username"]').val().trim();
            var password = this.$el.find('[id="login-password"]').val();
            if (username === '') {
                this.$el.find('[id="login-username"]').focus();
                return false;
            } else if (password === '') {
                this.$el.find('[id="login-password"]').focus();
                return false;
            }
            return true;
        },
        preventSubmit: function (event) {
            event.preventDefault();
        },
        loginOnEnter: function (event) {
            if (event.keyCode === KEYCODE_ENTER) {
                this.validateForm();
            } else {
                return;
            }

            event.preventDefault();
            this.login();
        },
        close: function () {
            this.$el.find('[id="warning-login"]').hide();
        }
    });

    app.SignupView = Backbone.View.extend({
        el: '#modal-signup',
        events: {
            'click #btn-signup': 'signup',
            'click #btn-signup-close': 'close',
            'submit form': 'preventSubmit',
            'keypress': 'signupOnEnter'
        },
        initialize: function () {
            this.$el.find('[id="warning-signup"]').hide();
            this.model = new app.Signup();
            this.listenTo(this.model, 'sync', this.render);
            this.render();
        },
        render: function () {

        },
        signup: function () {
            NProgress.start();
            if (!this.validateForm()) {
                return;
            }

            this.$el.find('#btn-signup').attr('disabled', true);
            this.model.save({
                username: this.$el.find('[id="signup-username"]').val().trim(),
                email: this.$el.find('[id="signup-email"]').val().trim(),
                password: this.$el.find('[id="signup-password"]').val(),
                repassword: this.$el.find('[id="signup-repassword"]').val()
            }, {
                success: function (model, response) {
                    $('#btn-signup').attr('disabled', false);
                    NProgress.done();
                    if (response.success) {
                        location.href = '/';
                    } else {
                        model.set(response);
                        if (response.errfor.email) {
                            $('[id="signup-callback-info"]').text(response.errfor.email);
                        } else if (response.errfor.username) {
                            $('[id="signup-callback-info"]').text(response.errfor.username);
                        } else if (response.errfor.password) {
                            $('[id="signup-callback-info"]').text(response.errfor.password);
                        } else if (response.errfor.repassword) {
                            $('[id="signup-callback-info"]').text(response.errfor.repassword);
                        }
                        $('[id="warning-signup"]').show();
                    }
                }
            });
        },
        preventSubmit: function (event) {
            event.preventDefault();
        },
        signupOnEnter: function (event) {
            if (event.keyCode === KEYCODE_ENTER) {
                this.validateForm();
            } else {
                return;
            }

            event.preventDefault();
            this.signup();
        },
        validateForm: function () {
            NProgress.done();
            var username = this.$el.find('[id="signup-username"]').val().trim();
            var email = this.$el.find('[id="signup-email"]').val().trim();
            var password = this.$el.find('[id="signup-password"]').val();
            var repassword = this.$el.find('[id="signup-repassword"]').val();

            if (email === '') {
                this.$el.find('[id="signup-email"]').focus();
                return false;
            } else if (username === '') {
                this.$el.find('[id="signup-username"]').focus();
                return false;
            } else if (password === '') {
                this.$el.find('[id="signup-password"]').focus();
                return false;
            } else if (repassword === '') {
                this.$el.find('[id="signup-repassword"]').focus();
                return false;
            }

            return true;
        },
        close: function () {
            this.$el.find('[id="signup-username"]').val('');
            this.$el.find('[id="signup-email"]').val('');
            this.$el.find('[id="signup-password"]').val('');
            this.$el.find('[id="signup-repassword"]').val('');
            this.$el.find('[id="warning-signup"]').hide();
        }
    });

    app.ForgotView = Backbone.View.extend({
        el: '#modal-forgot',
        events: {
            'click #btn-forgot': 'sendMail',
            'click #btn-forgot-close': 'close',
            'submit form': 'preventSubmit',
            'keypress': 'forgotOnEnter'
        },
        initialize: function () {
            this.$el.find('[id="warning-forgot"]').hide();
            this.model = new app.Forgot();
            this.listenTo(this.model, 'sync', this.render);
        },
        render: function () {

        },
        sendMail: function () {
            NProgress.start();
            if (!this.validateForm()) {
                return;
            }
            this.$el.find('#btn-forgot').attr('disabled', true);
            this.model.save({
                email: this.$el.find('[id="forgot-email"]').val().trim()
            }, {
                success: function (model, response) {
                    $('#btn-forgot').attr('disabled', false);

                    if (response.success) {
                        $('#btn-forgot').attr('disabled', true);
                        $('[id="forgot-callback-info"]').text('发送成功，请到您的邮箱内确认，5秒后跳转至首页');
                        $('[id="warning-forgot"]').show();
                        setTimeout(function () {
                            location.href = '/';
                        }, 5000);
                    } else {
                        model.set(response);
                        if (response.errfor.email) {
                            $('[id="forgot-callback-info"]').text(response.errfor.email);
                        } else if (response.errors) {
                            $('[id="forgot-callback-info"]').text(response.errors);
                        }
                        $('[id="warning-forgot"]').show();
                        return;
                    }

                }
            });
        },
        validateForm: function () {
            NProgress.done();
            var email = this.$el.find('[id="forgot-email"]').val().trim();
            if (email === '') {
                this.$el.find('[id="forgot-email"]').focus();
                return false;
            }
            return true;
        },
        forgotOnEnter: function (event) {
            if (event.keyCode === KEYCODE_ENTER) {
                this.validateForm();
            } else {
                return;
            }

            event.preventDefault();
            this.sendMail();
        },
        preventSubmit: function (event) {
            event.preventDefault();
        }

    });

    $(document).ready(function () {
        var signupView = new app.SignupView;
        var loginView = new app.LoginView;
        var forgotView = new app.ForgotView;
    });
}());