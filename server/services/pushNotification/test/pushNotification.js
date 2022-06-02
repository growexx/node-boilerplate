module.exports = {
    createNotification: [
        {
            it: 'Fields - User ID, title and body are required',
            options: {
            },
            status: 0
        },
        {
            it: 'Fields - User ID, title and body are not empty',
            options: {
                userId: '',
                title: '',
                body: ''
            },
            status: 0
        }, {
            it: 'Add new notification',
            options: {
                userId: '5f083c352a7908662c334532',
                title: 'new title',
                body: 'new Body'
            },
            status: 1
        }
    ],
    updatePushNotificationToken: [
        {
            it: 'Fields - device type and device token are required',
            options: {
            },
            status: 0
        },
        {
            it: 'Fields - device type and device token are not empty',
            options: {
                deviceType: '',
                deviceToken: ''

            },
            status: 0
        }, {
            it: 'Invalid device type',
            options: {
                deviceType: 'sdfdsf',
                deviceToken: 'ewrsdfewr'
            },
            status: 0
        },
        {
            it: 'Valid ios device type',
            options: {
                deviceType: 'ios',
                deviceToken: 'ios-device-token'
            },
            status: 1
        },
        {
            it: 'Valid web device type',
            options: {
                deviceType: 'web',
                deviceToken: 'cHil28p67-Sa6R31Xv76wn:APA91bGh45wCTYGawWHtQ8xlHcbXBt1ia-9g2hvV5eA2BoscCAmxh0GzayPmWySzA3E5wC70VKZzZFVTEjDqypO0OIbo1BLhdQrT2kk3qwG-k3OCDc62-O3TOb5cCIZxsrugYfd-9Rxh'
            },
            status: 1
        },
        {
            it: 'Valid android device type',
            options: {
                deviceType: 'android',
                deviceToken: 'android-device-token'
            },
            status: 1
        }
    ],
    validatePushNotificationToken: [
        {
            it: 'Fields - device type is required',
            options: {
            },
            status: 0
        },
        {
            it: 'Fields - device type is not empty',
            options: {
                deviceType: '',
                deviceToken: ''

            },
            status: 0
        }, {
            it: 'Invalid device type',
            options: {
                deviceType: 'sdfdsf'

            },
            status: 0
        },
        {
            it: 'Valid ios device type',
            options: {
                deviceType: 'ios'

            },
            status: 1
        },
        {
            it: 'Valid web device type',
            options: {
                deviceType: 'web'
            },
            status: 1
        },
        {
            it: 'Valid android device type',
            options: {
                deviceType: 'android'

            },
            status: 1
        }
    ],
    sendBatchNotification: [
        {
            it: 'Should send batch notification',
            options: {
            },
            status: 1
        }
    ],
    sendIndividualNotificationToWeb: [
        {
            it: 'Fields - title, body and device token are required',
            options: {
            },
            status: 0
        },
        {
            it: 'Fields - title, body and device token are not empty',
            options: {
                title: '',
                body: '',
                deviceToken: ''
            },
            status: 0
        },
        {
            it: 'Valid data',
            options: {
                title: 'web - Testing notification',
                body: 'Body - Testing individual notification',
                deviceToken: 'cHil28p67-Sa6R31Xv76wn:APA91bGh45wCTYGawWHtQ8xlHcbXBt1ia-9g2hvV5eA2BoscCAmxh0GzayPmWySzA3E5wC70VKZzZFVTEjDqypO0OIbo1BLhdQrT2kk3qwG-k3OCDc62-O3TOb5cCIZxsrugYfd-9Rxh'
            },
            status: 1
        }
    ],
    sendIndividualNotificationToAndroid: [
        {
            it: 'Fields - title, body and device token are required',
            options: {
            },
            status: 0
        },
        {
            it: 'Fields - title, body and device token are not empty',
            options: {
                title: '',
                body: '',
                deviceToken: ''
            },
            status: 0
        },
        {
            it: 'Valid data',
            options: {
                title: 'Android - Testing notification',
                body: 'Body - Testing individual notification',
                deviceToken: 'cHil28p67-Sa6R31Xv76wn:APA91bGh45wCTYGawWHtQ8xlHcbXBt1ia-9g2hvV5eA2BoscCAmxh0GzayPmWySzA3E5wC70VKZzZFVTEjDqypO0OIbo1BLhdQrT2kk3qwG-k3OCDc62-O3TOb5cCIZxsrugYfd-9Rxh'
            },
            status: 1
        }
    ]
};
