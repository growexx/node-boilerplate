const { Types } = require('mongoose');
module.exports = {
    users: [{
        _id: new Types.ObjectId('5f083c352a7908662c334532'),
        cognitoId: '1',
        email: 'user@mailinator.com',
        employeeId: 1,
        role: 1,
        isActive: 1,
        otp: 123456,
        firstName: 'user',
        lastName: 'last'
    },
    {
        _id: new Types.ObjectId('5f083c352a7908662c334535'),
        cognitoId: '2',
        email: 'inactive@mailinator.com',
        employeeId: 2,
        role: 1,
        isActive: 0,
        otp: 123456
    },
    {
        _id: new Types.ObjectId('5f5f2cd2f1472c3303b6b861'),
        cognitoId: '3',
        email: 'super@mailinator.com',
        employeeId: 3,
        role: 4,
        isActive: 1,
        firstName: 'Test',
        lastName: 'Admin'
    },
    {
        _id: new Types.ObjectId('5f5f2cd2f1472c3303b6b831'),
        cognitoId: '4',
        email: 'john@mailinator.com',
        employeeId: 3,
        role: 4,
        isActive: 1,
        firstName: 'Test',
        lastName: 'Admin',
        otp: 123456,
        resetToken: '123abc'
    }]
};
