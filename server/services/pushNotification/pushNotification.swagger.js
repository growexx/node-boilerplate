/**
 * @openapi
 * /user/individual-push-notification-for-android:
 *      post:
 *          security:
 *              - bearerAuth: []
 *          tags: [Notification]
 *          summary: 'Individual push notification'
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/PushNotificationAndroid'
 *          responses:
 *              200:
 *                  description: Push notification sent successfully
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/successNotificationAndroid'
 *              400:
 *                  description: Invalid Request
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/errorBadRequest'
 *              401:
 *                  description: Unauthorized Access
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/unauthorisedAccess'
 *              500:
 *                  description: Internal Server Error
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/unexpectedError'
 */

/**
 * @openapi
 * /user/create-notification:
 *      post:
 *          security:
 *              - bearerAuth: []
 *          tags: [Notification]
 *          summary: 'Create Notification'
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/CreateNotification'
 *          responses:
 *              200:
 *                  description: Push notification sent successfully
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/createNotification'
 *              400:
 *                  description: Invalid Request
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/errorBadRequest'
 *              401:
 *                  description: Unauthorized Access
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/unauthorisedAccess'
 *              500:
 *                  description: Internal Server Error
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/unexpectedError'
 */

/**
 * @openapi
 * /user/update-push-notification-token:
 *      put:
 *          security:
 *              - bearerAuth: []
 *          tags: [Notification]
 *          summary: 'Update Push Notification Token'
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/UpdateNotificationTokenReq'
 *          responses:
 *              200:
 *                  description: Push notification update successfully
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/UpdateNotificationToken'
 *              400:
 *                  description: Invalid Request
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/errorBadRequest'
 *              401:
 *                  description: Unauthorized Access
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/unauthorisedAccess'
 *              500:
 *                  description: Internal Server Error
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/unexpectedError'
 */

/**
 * @openapi
 * /user/send-batch-notification:
 *      post:
 *          security:
 *              - bearerAuth: []
 *          tags: [Notification]
 *          summary: 'Batch Undelivered Notification'
 *          requestBody:
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/BatchNotificationReq'
 *          responses:
 *              200:
 *                  description: Push notification sent successfully
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/batchNotification'
 *              400:
 *                  description: Invalid Request
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/errorBadRequest'
 *              401:
 *                  description: Unauthorized Access
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/unauthorisedAccess'
 *              500:
 *                  description: Internal Server Error
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/unexpectedError'
 */

/**
 * @openapi
 * /user/validate-push-notification-token:
 *      post:
 *          security:
 *              - bearerAuth: []
 *          tags: [Notification]
 *          summary: 'Validate Push Notification'
 *          requestBody:
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/ValidateTokenReq'
 *          responses:
 *              200:
 *                  description: Push notification sent successfully
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/validateToken'
 *              400:
 *                  description: Invalid Request
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/errorBadRequest'
 *              401:
 *                  description: Unauthorized Access
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/unauthorisedAccess'
 *              500:
 *                  description: Internal Server Error
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/unexpectedError'
 */
