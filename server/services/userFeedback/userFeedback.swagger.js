/**
 * @openapi
 * /user/feedback:
 *      post:
 *          security:
 *              - bearerAuth: [Authentication]
 *          tags: [Feedback]
 *          summary: 'User Feedback'
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/userFeedback'
 *          responses:
 *              200:
 *                  description: add user feedback
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/successAddUserFeedback'
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
 * /user/feedback/{id}:
 *      get:
 *          security:
 *              - bearerAuth: [Authentication]
 *          tags: [Feedback]
 *          summary: 'User Feedback'
 *          parameters:
 *            - name: id
 *              in: path
 *              required: true
 *              schema:
 *                  type: string
 *                  format: int64
 *
 *          responses:
 *              200:
 *                  description: get user feedback
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/successGetUserFeedback'
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
 * /user/feedback/list:
 *      get:
 *          security:
 *              - bearerAuth: [Authentication]
 *          tags: [Feedback]
 *          summary: 'User Feedback List'
 *          parameters:
 *            - name: page
 *              in: query
 *              schema:
 *                  type: int
 *            - name: limit
 *              in: query
 *              schema:
 *                  type: int
 *            - name: isPaginate
 *              in: query
 *              schema:
 *                  type: boolean
 *            - name: sort
 *              in: query
 *              schema:
 *                  type: int
 *            - name: sortBy
 *              in: query
 *              schema:
 *                  type: int
 *
 *          responses:
 *              200:
 *                  description: get user feedback
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/successListUserFeedback'
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
 * /user/feedback/{id}:
 *      delete:
 *          security:
 *              - bearerAuth: [Authentication]
 *          tags: [Feedback]
 *          summary: 'User Feedback List'
 *          parameters:
 *            - name: id
 *              in: path
 *              required: true
 *              schema:
 *                  type: string
 *                  format: int64
 *
 *          responses:
 *              200:
 *                  description: get user feedback
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/successDeleteUserFeedback'
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
 * /user/feedback/{id}:
 *      patch:
 *          security:
 *              - bearerAuth: [Authentication]
 *          tags: [Feedback]
 *          summary: 'InActive User Feedback'
 *          parameters:
 *            - name: id
 *              in: path
 *              required: true
 *              schema:
 *                  type: string
 *                  format: int64
 *
 *          responses:
 *              200:
 *                  description: user feedback inactivation success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/successInactiveUserFeedback'
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
