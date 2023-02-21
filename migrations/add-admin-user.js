module.exports = {
  async up(db) {
    await db.collection('users').insert({
      email: 'super@mailinator.com',
      // SHA 256 of Salt with raw password as Test@123
      password:
        'fced7691dc53da39635284365eec49c6:52333d07c8825e6e1a2b7355fd80c37587e6d79daf935bc97a06601ca4caea8517a57f7e5635c54f045016c2c15f22d83e54b780b2805d84e5de197ff0e51893d785f7f20e1ba659ad5a386d782208c0',
      role: 4,
      isActive: 1,
      firstName: 'Test',
      lastName: 'Admin',
    });
  },
};
