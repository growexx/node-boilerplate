const mongoose = require('mongoose');
const password =
  'fced7691dc53da39635284365eec49c6:52333d07c8825e6e1a2b7355fd80c37587e6d79daf935bc97a06601ca4caea8517a57f7e5635c54f045016c2c15f22d83e54b780b2805d84e5de197ff0e51893d785f7f20e1ba659ad5a386d782208c0';

module.exports = {
  users: [
    {
      _id: mongoose.Types.ObjectId('5f083c352a7908662c334532'),
      email: 'user@mailinator.com',
      employeeId: 1,
      role: 1,
      isActive: 1,
      opt: 123456,
      firstName: 'user',
      lastName: 'last',
      password,
    },
    {
      _id: mongoose.Types.ObjectId('5f083c352a7908662c334535'),
      email: 'inactive@mailinator.com',
      employeeId: 2,
      role: 1,
      isActive: 0,
      opt: 123456,
      password,
    },
    {
      _id: mongoose.Types.ObjectId('5f5f2cd2f1472c3303b6b861'),
      email: 'super@mailinator.com',
      employeeId: 3,
      role: 4,
      isActive: 1,
      firstName: 'Test',
      lastName: 'Admin',
      password,
    },
  ],
};
