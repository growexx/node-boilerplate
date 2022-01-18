const mongoose = require('mongoose');
const password = '400f5feac00716773753dcae08056aaf:a15de8a85f5f3637a9088a461fdd8a5263ae25c75dffef5a874498871c825617684b76734e1a5bf58609140aa1db462dd425f917d7ceff7f49eb8b285f6972dd7483a8feff3920f66319dbf118f7e982';

module.exports = {
    users: [{
        _id: mongoose.Types.ObjectId('5f083c352a7908662c334532'),
        email: 'user@mailinator.com',
        employeeId: 1,
        role: 1,
        isActive: 1,
        opt: 123456,
        firstName: 'user',
        lastName: 'last',
        password
    },
    {
        _id: mongoose.Types.ObjectId('5f083c352a7908662c334535'),
        email: 'inactive@mailinator.com',
        employeeId: 2,
        role: 1,
        isActive: 0,
        opt: 123456,
        password
    },
    {
        _id: mongoose.Types.ObjectId('5f5f2cd2f1472c3303b6b861'),
        email: 'super@mailinator.com',
        employeeId: 3,
        role: 4,
        isActive: 1,
        firstName: 'Test',
        lastName: 'Admin',
        password
    }]
};
