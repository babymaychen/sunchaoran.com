'use strict';

exports = module.exports = function (app, mongoose) {
    var chatroomSchema = new mongoose.Schema({
        roomName: {type: String, unique: true},
        peoples: {type: Number, default: 0},
        maxPeoples: {type: Number, default: 300},
        isActive: String,
        isPrivate: {type: String, default: false}
    });

    chatroomSchema.methods.createRoom = function () {

    };

    chatroomSchema.methods.removeRoom = function () {

    };

    chatroomSchema.methods.joinRoom = function (roomName) {

    };

    chatroomSchema.methods.leaveRoom = function (roomName) {

    };
    chatroomSchema.plugin(require('./plugins/pagedFind'));
    chatroomSchema.index({roomName: 1}, {unique: true});
    chatroomSchema.set('autoIndex', (app.get('env') === 'development'));
    app.db.model('Chatroom', chatroomSchema);
};
