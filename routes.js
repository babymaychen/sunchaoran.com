'use strict';

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.set('X-Auth-Required', 'true');
    req.session.returnUrl = req.originalUrl;
    res.redirect('/login/');
}

function ensureAdmin(req, res, next) {
    if (req.user.canPlayRoleOf('admin')) {
        return next();
    }
    res.redirect('/');
}

function ensureAccount(req, res, next) {
    if (req.user.canPlayRoleOf('account')) {
        if (req.app.config.requireAccountVerification) {
            if (req.user.roles.account.isVerified !== 'yes' && !/^\/account\/verification\//.test(req.url)) {
                return res.redirect('/account/verification/');
            }
        }
        return next();
    }
    res.redirect('/');
}

exports = module.exports = function (app, passport) {

    // Home 首页
    app.get('/', require('./views/home/home').index);

    // Blog 博客
    app.get('/blog/', require('./views/blog/blog').index);

    // App 软件
    app.get('/app/', require('./views/app/app').index);

    // Buy 购买
    app.get('/buy/', require('./views/buy/buy').index);

    // Chat 聊天
    //app.get('/chat/', require('./views/chat/chat').index);
    //app.get('/chatroom/:id', require('./views/chat/chat').getRoom);
    //app.post('/chatroom/:id', require('./views/chat/chat').sendMessage);


    // Game 游戏
    app.get('/game/', require('./views/game/game').index);

    // About 关于
    app.get('/about/', require('./views/about/about').index);

    // Donate 捐助
    app.get('/donate/', require('./views/donate/donate').index);

    // Login 用户登录
    app.get('/login/', require('./views/home/login/login').init);
    app.post('/login/', require('./views/home/login/login').login);

    // Logout 用户登出
    app.get('/logout/', require('./views/home/logout/logout').logout);

    // Signup 用户注册
    app.post('/signup/', require('./views/home/signup/signup').signup);
    // Forgot

    // Reset 用户重置密码
    app.get('/reset/:email/:token/', require('./views/home/reset/reset').init);
    app.put('/reset/:email/:token/', require('./views/home/reset/reset').setPassword);

    // 用户找回密码
    app.post('/forgot/', require('./views/home/forgot/forgot').sendMail);

};
