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

    app.get('/', require('./views/home/home').init);


    //// 捐助
    //app.get('/donate', function (req, res) {
    //    res.render('donate/index', {rightTitle: '捐助'});
    //});
    //
    //// 用户登录
    //app.get('/login/', require('./views/home/login').init);
    //app.post('/login/', require('./views/home/login').login);
    //
    //// 用户登出
    //app.get('/logout/', require('./views/home/logout').logout);
    //
    //// 用户注册
    //app.post('/signup/', require('./views/home/signup').signup);
    //
    //// 用户重置密码
    //app.get('/reset/:email/:token/', require('./views/home/reset').init);
    //app.put('/reset/:email/:token/', require('./views/home/reset').set);
    //
    //// 用户找回密码
    //app.post('/forgot/', require('./views/home/forgot').send);
    //
    //// 用户登出
    //app.get('/logout', function (req, res) {
    //    res.render('home/logout');
    //});
    //
    //// 购买
    //app.get('/agencybuy', function (req, res) {
    //    res.render('agencybuy/index', {rightTitle: '购买'});
    //});
    //
    //// 聊天
    //app.get('/chatroom', function (req, res) {
    //    res.render('chatroom/index', {rightTitle: '聊天室'});
    //});
    //app.get('/chatroom/:id', function (req, res) {
    //    res.render('chatroom/chatroom');
    //});
    ////app.post('/chatroom/:id', require('./views/chatroom/chatroom').sendMessage);
    //
    //// 小游戏
    //app.get('/game', function (req, res) {
    //    res.render('game/index', {rightTitle: '小游戏'});
    //});
    //app.get('/game/2048', function (req, res) {
    //    res.render('game/2048');
    //});
    //
    //// 关于我
    //app.get('/aboutme', function (req, res) {
    //    res.render('aboutme/index', {rightTitle: '关于我'});
    //});

};
