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
                templateName: 'myFile',
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
                templateName: 'myFile',
            },
            status: 0,
        },
        {
            it: 'As a user I should validate if subject is not pass',
            options: {
                templateName: "myFile",
            },
            status: 0
        },

    ],
    createtemplate: [
        {
            it: "As a user I should check valid template name",
            options: {
                templateName: 'myFile',
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
            it: 'As a user I should validate if templateName is not pass',
            options: {
                templateName: '*',
                subject: 'my trial'
            },
            status: 0
        },
        {
            it: 'As a user I should validate if subject is not pass',
            options: {
                templateName: "myFile",
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
                templateName: '*',
            },
            status: 0,
        },
    ],
};
