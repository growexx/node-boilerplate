const message = require('../../locales/en');

module.exports = swaggerJson => {
    swaggerJson.paths['/user/details'] = {
        get: {
            security: [{
                bearerAuth: []
            }],
            tags: [
                'User'
            ],
            description: 'User Details',
            summary: 'User Details',
            parameters: [],
            responses: {
                200: {
                    description: 'User details get',
                    schema: {
                        $ref: '#/definitions/successUserDetails'
                    }
                },
                400: {
                    description: 'Invalid request',
                    schema: {
                        $ref: '#/definitions/validationError'
                    }
                },
                401: {
                    description: 'Unauthorized Access',
                    schema: {
                        $ref: '#/definitions/unauthorisedAccess'
                    }
                },
                500: {
                    description: 'Something went wrong. Try again.',
                    schema: {
                        $ref: '#/definitions/unexpextedError'
                    }
                }
            }
        }
    };

    swaggerJson.paths['/user/picture'] = {
        put: {
            security: [{
                bearerAuth: []
            }],
            tags: [
                'User'
            ],
            description: 'Upload Profile Picture',
            summary: 'Upload Profile Picture',
            parameters: [
                {
                    in: 'formData',
                    name: 'photo',
                    type: 'file',
                    description: 'Upload Profile Picture',
                    required: true
                }
            ],
            responses: {
                200: {
                    description: 'Profile picture uploaded file',
                    schema: {
                        $ref: '#/definitions/successUploadProfilePicture'
                    }
                },
                400: {
                    description: 'Invalid request',
                    schema: {
                        $ref: '#/definitions/validationError'
                    }
                },
                401: {
                    description: 'Unauthorized Access',
                    schema: {
                        $ref: '#/definitions/unauthorisedAccess'
                    }
                },
                500: {
                    description: 'Something went wrong. Try again.',
                    schema: {
                        $ref: '#/definitions/unexpextedError'
                    }
                }
            }
        },
        delete: {
            security: [{
                bearerAuth: []
            }],
            tags: [
                'User'
            ],
            description: 'Delete Profile Picture',
            summary: 'Delete Profile Picture',
            parameters: [],
            responses: {
                200: {
                    description: 'Profile picture delete file',
                    schema: {
                        $ref: '#/definitions/successDeleteProfilePicture'
                    }
                },
                400: {
                    description: 'Invalid request',
                    schema: {
                        $ref: '#/definitions/validationError'
                    }
                },
                401: {
                    description: 'Unauthorized Access',
                    schema: {
                        $ref: '#/definitions/unauthorisedAccess'
                    }
                },
                500: {
                    description: 'Something went wrong. Try again.',
                    schema: {
                        $ref: '#/definitions/unexpextedError'
                    }
                }
            }
        }
    };

    swaggerJson.paths['/user/password'] = {
        put: {
            security: [{
                bearerAuth: []
            }],
            tags: [
                'User'
            ],
            description: 'Change user password',
            summary: 'Change user password',
            parameters: [{
                in: 'body',
                name: 'body',
                description: 'Body parameter',
                required: true,
                schema: {
                    $ref: '#/definitions/changePassword'
                }
            }],
            responses: {
                200: {
                    description: 'Change user password',
                    schema: {
                        $ref: '#/definitions/successChangePassword'
                    }
                },
                400: {
                    description: 'Invalid request',
                    schema: {
                        $ref: '#/definitions/validationError'
                    }
                },
                401: {
                    description: 'Unauthorized Access',
                    schema: {
                        $ref: '#/definitions/unauthorisedAccess'
                    }
                },
                500: {
                    description: 'Something went wrong. Try again.',
                    schema: {
                        $ref: '#/definitions/unexpextedError'
                    }
                }
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

    swaggerJson.definitions.validationError = {
        properties: {
            status: {
                type: 'number',
                example: 0
            },
            message: {
                example: message.INVALID_REQUEST
            }
        }
    };

    swaggerJson.definitions.unauthorisedAccess = {
        properties: {
            status: {
                type: 'number',
                example: 0
            },
            message: {
                example: message.ACCESS_DENIED
            }
        }
    };

    swaggerJson.definitions.successUserDetails = {
        type: 'object',
        properties: {
            status: {
                type: 'boolean',
                example: true
            },
            data: {
                type: 'object',
                example: {
                    first_name: 'Sam',
                    last_name: 'Jones',
                    role: 'Researcher',
                    token: 'TOKEN'
                }
            },
            message: {
                example: message.SUCCESS
            }
        }
    };

    swaggerJson.definitions.successUploadProfilePicture = {
        properties: {
            status: {
                type: 'number',
                example: 1
            },
            data: {
                type: 'object',
                example: {
                    profilePicture: 's3url'
                }
            },
            message: {
                example: message.SUCCESS
            }
        }
    };

    swaggerJson.definitions.successDeleteProfilePicture = {
        properties: {
            status: {
                type: 'number',
                example: 1
            },
            message: {
                example: message.SUCCESS
            }
        }
    };

    swaggerJson.definitions.changePassword = {
        type: 'object',
        properties: {
            oldPassword: {
                type: 'string',
                example: 'OLD PASSWORD SHA256'
            },
            newPassword: {
                type: 'string',
                example: 'NEW PASSWORD SHA256'
            }
        }
    };

    swaggerJson.definitions.successChangePassword = {
        type: 'object',
        properties: {
            status: {
                type: 'boolean',
                example: true
            },
            message: {
                example: message.CHANGE_PASSWORD_SUCCESS
            }
        }
    };

    return swaggerJson;
};
