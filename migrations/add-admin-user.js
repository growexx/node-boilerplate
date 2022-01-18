module.exports = {
    async up (db) {
        await db.collection('users').insert({
            email: 'super@mailinator.com',
            // SHA 256 of Salt with raw password as Test@123
            password: 'd1e7e544d77aeca847d93b701cfea44d:dace4ac5d07245eb29114a3f9f17e6efcd1ae0caeaf7fdf88bee36fa111d1fb78f0fdae1b802095719e6eef683926c47571a0c16389078692c67d393757fe178a2e98d0cd194e359e6766da5f452ff5b',
            role: 4,
            isActive: 1,
            firstName: 'Test',
            lastName: 'Admin'
        });
    }
};
