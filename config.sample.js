'use strict';

exports.port = process.env.PORT || 3000;
exports.mongodb = {
    uri: process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'localhost/sunchaoranTestDB'
};
exports.companyName = 'sunchaoran.com, Inc.';
exports.projectName = 'sunchaoran.com';
exports.systemEmail = 'support@sunchaoran.com';
exports.cryptoKey = 'yourPassword';
exports.loginAttempts = {
    forIp: 50,
    forIpAndUser: 7,
    logExpiration: '20m'
};
exports.requireAccountVerification = false;
exports.smtp = {
    from: {
        name: process.env.SMTP_FROM_NAME || exports.projectName + ' 支持团队',
        address: process.env.SMTP_FROM_ADDRESS || 'support@sunchaoran.com'
    },
    credentials: {
        user: process.env.SMTP_USERNAME || 'support@sunchaoran.com',
        password: process.env.SMTP_PASSWORD || 'yourPassword',
        host: process.env.SMTP_HOST || 'smtp.sunchaoran.com',
        port: 25,
        ssl: false
    }
};