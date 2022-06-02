module.exports = {
    async up (db) {
        const user = await db.collection('users').findOne({});
        await db.collection('notifications').insert({
            userId: user._id,
            title: 'Discount Offer',
            body: 'Hurry up..!! Offer available for limited time.',
            click_action: null,
            icon: null
        });
    },
    async down (db) {
        await db.collection('notifications').deleteMany({});
    }
};
