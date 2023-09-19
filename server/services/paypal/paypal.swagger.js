/**
 * @openapi
 * components:
 *  schemas:
 *      successCreatePayment:
 *          type: object
 *          properties:
 *              status:
 *                  type: number
 *                  description: status if data exists
 *              data:
 *                  type: string
 *                  description: size data
 *              message:
 *                  $ref: '#/components/messageDefinition/properties/message'
 *          example:
 *              status: 1
 *              data:
 *                  {
 *                   id: 'id',
 *                   status: 'status' ,
 *                   links : [{
 *                             href:'url',
 *                             rel:'rel',
 *                             method:'GET',
 *                           }]
 *                  }
 *              message: Success
 *
 */

/**
 * @openapi
 *  /paypal/create:
 *      post:
 *          tags: [Paypal]
 *          summary: create payment request
 *          responses:
 *              200:
 *                  description: success details
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/successCreatePayment'
 *              400:
 *                  description: Invalid Request
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/validationError'
 *              401:
 *                  description: Unauthorised Access
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/unauthorisedAccessUser'
 *              500:
 *                  description: internal server error
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/unexpectedError'
 *
 *
 */



/**
 * @openapi
 * components:
 *  schemas:
 *      successCapturePayment:
 *          type: object
 *          properties:
 *              status:
 *                  type: number
 *                  description: status if data exists
 *              data:
 *                  type: string
 *                  description: size data
 *              message:
 *                  $ref: '#/components/messageDefinition/properties/message'
 *          example:
 *              status: 1
 *              data:
 *                  {
 *                   id: 'id',
 *                   status: 'status' ,
 *                   links : [{
 *                             href:'url',
 *                             rel:'rel',
 *                             method:'GET',
 *                           }] ,
 *                   payment_source: {
 *                              paypal: {
 *                              email_address: email,
 *                              account_id: id,
 *                              name: name,
 *                              address: address
 *                          }}
 *                  }
 *              message: Success
 *
 *      capturePaymentReq:
 *          type: object
 *          required:
 *              - orderId
 *          properties:
 *              orderId:
 *                  type: string
 *                  description: orderId for capturing payment
 *          example:
 *              orderId: id
 *
 */

/**
 * @openapi
 *  /paypal/capture:
 *      post:
 *          tags: [Paypal]
 *          summary: capture payment request
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/capturePaymentReq'
 *          responses:
 *              200:
 *                  description: success details
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/successCapturePayment'
 *              400:
 *                  description: Invalid Request
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/validationError'
 *              401:
 *                  description: Unauthorised Access
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/unauthorisedAccessUser'
 *              500:
 *                  description: internal server error
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/unexpectedError'
 *
 *
 */
