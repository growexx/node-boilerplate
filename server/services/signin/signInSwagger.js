/**
  * Created by Growexx on 13/12/2017
  * @name Sign In Swagger
  */
const message = require('../../locales/en.json');
module.exports = (swaggerJson) => {
    swaggerJson.paths['/auth/signin'] = {
        post: {
            tags: [
                'Authentication'
            ],
            description: 'Log in via email or username',
            summary: 'Log in via email or username',
            parameters: [
                {
                    in: 'body',
                    name: 'body',
                    description: 'authentication parameter',
                    required: true,
                    schema: {
                        $ref: '#/definitions/userSignIn'
                    }
                }
            ],
            responses: {
                200: {
                    description: 'You have successfully logged in.',
                    schema: {
                        $ref: '#/definitions/successLogin'
                    }
                },
                400: {
                    description: 'Bad Request',
                    schema: {
                        $ref: '#/definitions/unauthorisedAccessLogin'
                    }
                },
                401: {
                    description: 'UnAuthorise',
                    schema: {
                        $ref: '#/definitions/unauthorisedAccess'
                    }
                },
                500: {
                    description: 'Internal Server Error',
                    schema: {
                        $ref: '#/definitions/unexpextedError'
                    }
                }
            }
        }
    };

    swaggerJson.definitions.userSignIn = {
        type: 'object',
        properties: {
            email: {
                type: 'string',
                example: 'researcher@mailinator.com'
            },
            password: {
                type: 'string',
                example: 'researcher'
            }
        }
    };

    swaggerJson.definitions.successLogin = {
        properties: {
            status: {
                type: 'number',
                example: 1
            },
            data: {
                type: 'object',
                example: {
                    firstName: 'Sam',
                    lastName: 'Jones',
                    username: 'researcher@mailinator.com',
                    role: 1,
                    token: 'TOKEN'
                }
            },
            message: {
                example: message.LOGIN_SUCCESS
            }
        }
    };

    swaggerJson.definitions.unauthorisedAccessLogin = {
        properties: {
            status: {
                type: 'number',
                example: 0
            },
            message: {
                example: message.LOGIN_FAILED
            }
        }
    };

    swaggerJson.definitions.unexpextedError = {
        properties: {
            status: {
                type: 'number',
                example: 0
            },
            message: {
                example: message.ERROR_MSG
            }
        }
    };


    return swaggerJson;
};
