module.exports = {
    addFeedback: [{
        it: 'As a user, I should validate add feedback request',
        options: {
        },
        status: 0
    },
    {
        it: 'As a user, I should validate add feedback request has title',
        options: {
            description: 'User feedback given.'
        },
        status: 0
    },
    {
        it: 'As a user, I should validate add feedback request has description',
        options: {
            title: 'Feedback title'
        },
        status: 0
    },
    {
        it: 'As a user, I should validate add feedback request has valid title',
        options: {
            title: 'Feature `improvement',
            description: 'User feedback given.'
        },
        status: 0
    },
    {
        it: 'As a user, I should validate add feedback request has valid description',
        options: {
            title: 'Feedback title',
            description: 'User feedback`s given'
        },
        status: 0
    }],

    getFeedback: [{
        it: 'As a user, I should validate feedback request',
        options: {
        },
        status: 0
    },
    {
        it: 'As a user, I should validate feedback request has valid id',
        options: {
            id: '5f083c352a7908662c334532wsw'
        },
        status: 0
    },
    {
        it: 'As a user, I should validate feedback request has id',
        options: {
            id: '5f083c352a7908662c334532'
        },
        status: 0
    }],

    listFeedback: [{
        it: 'I should able to list feedback without any params',
        options: {},
        status: 1
    },
    {
        it: 'I should able to list feedback without pagination',
        options: { isPaginate: false },
        status: 1
    },
    {
        it: 'I should able to list feedback with page param',
        options: { page: 1 },
        status: 1
    },
    {
        it: 'I should able to list feedback with page and limit params and sort by designation',
        options: { page: 1, limit: 10, sort: 1, sortBy: 'createdAt' },
        status: 1
    },
    {
        it: 'I should able to list feedback with page, limit and category params',
        options: { page: 2, limit: 10 },
        status: 1
    }],

    deleteFeedback: [{
        it: 'As a user, I should validate feedback request',
        options: {
        },
        status: 0
    },
    {
        it: 'As a user, I should validate feedback request has valid id',
        options: {
            id: '5f083c352a7908662c334532wsw'
        },
        status: 0
    },
    {
        it: 'As a user, I should validate feedback request has id',
        options: {
            id: '5f083c352a7908662c334532'
        },
        status: 0
    }],

    inActiveFeedback: [{
        it: 'As a user, I should validate feedback request',
        options: {
        },
        status: 0
    },
    {
        it: 'As a user, I should validate feedback request has valid id',
        options: {
            id: '5f083c352a7908662c334532wsw'
        },
        status: 0
    },
    {
        it: 'As a user, I should validate feedback request has id',
        options: {
            id: '5f083c352a7908662c334532'
        },
        status: 0
    }]
};
