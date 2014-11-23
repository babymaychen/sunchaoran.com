'use strict';

exports = module.exports = function (app, mongoose) {

    //then regular docs
    require('./schema/Account')(app, mongoose);
    require('./schema/User')(app, mongoose);
    require('./schema/LoginAttempt')(app, mongoose);
    require('./schema/Chatroom')(app, mongoose);
};
