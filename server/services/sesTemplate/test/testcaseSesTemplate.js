module.exports = {
    retrievingtemplate: [
        {
            it: "As a user, I should check template name in request.",
            options: {},
            status: 0,
        },
        {
            it: "As a user I should check valid template name",
            options: {
                templatename: 'myFile',
            },
            status: 0,
        },

    ],

    updatetemplate: [
        {
            it: "As a user, I should check template name in request.",
            options: {},
            status: 0,
        },
        {
            it: "As a user I should check valid template name",
            options: {
                templatename: 'myFile',
            },
            status: 0,
        },
        {
            it: 'As a user I should validate if subject is not pass',
            options: {
                templatename: "myFile",
            },
            status: 0
        },

    ],
    createtemplate: [
        {
            it: "As a user I should check valid template name",
            options: {
                templatename: 'myFile',
            },
            status: 0,
        },
        {
            it: "As a user, I should check template name in request.",
            options: {
                subject: 'my trial',
            },
            status: 0,
        },
        {
            it: 'As a user I should validate if templatename is not pass',
            options: {
                templatename: '*',
                subject: 'my trial'
            },
            status: 0
        },
        {
            it: 'As a user I should validate if subject is not pass',
            options: {
                templatename: "myFile",
                subject: '*'
            },
            status: 0

        },
        {
            it: "As a user I should check valid suject name",
            options: {
                subject: 'my trial',
            },
            status: 0,
        },

    ],

    deletetemplate: [
        {
            it: "As a user, I should check template name in request.",
            options: {},
            status: 0,
        },
        {
            it: "As a user I should check valid template name",
            options: {
                templatename: 'myFile',
            },
            status: 0,
        },
    ],
};
