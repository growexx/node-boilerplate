const mongoose = require('mongoose');

module.exports = {
    feedback: [{
        _id: mongoose.Types.ObjectId('6413f8f1c273693bebffb620'),
        userId: mongoose.Types.ObjectId('5f083c352a7908662c334532'),
        isActive: 1,
        title: 'Related New feature.',
        description: 'As per user request, you have build new feature amazingly.Thanks!!'
    }, {
        _id: mongoose.Types.ObjectId('6413f8de20047d3b6cd13af3'),
        userId: mongoose.Types.ObjectId('5f083c352a7908662c334532'),
        isActive: 1,
        title: 'Related second New feature.',
        description: 'As per user request, you have build new feature amazingly.Thanks!!'
    }]
};
