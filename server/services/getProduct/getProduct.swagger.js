/**
 * @openapi
 * components:
 *  schemas:
 *      successGetProduct:
 *          type: object
 *          properties:
 *              status:
 *                  type: number
 *                  description: status if data exists
 *              data:
 *                  type: string
 *                  description: success data
 *              message:
 *                  type: string
 *                  description: product data
 *          example:
 *              status: 1
 *              data:
 *                 {
 *                      id: id,
 *                      foodName: foodName,
 *                      foodType: foodType,
 *                      quantity: quantity,
 *                      price: price,
 *                      extras': ['extras'],
 *                      isEnabled: isEnabled,
 *                  }
 *              message: Success
 */

/**
 * @openapi
 * components:
 *  schemas:
 *      successGetProductList:
 *          type: object
 *          properties:
 *              status:
 *                  type: number
 *                  description: status if data exists
 *              data:
 *                  type: string
 *                  description: success data
 *              message:
 *                  type: string
 *                  description: product data
 *          example:
 *              status: 1
 *              data:
 *                  docs : [{
 *                          id: id,
 *                          foodName: foodName,
 *                          foodType: foodType,
 *                          quantity: quantity,
 *                          isEnabled: isEnabled,
 *                          price: price,
 *                          extras: ['extras'],
 *                  }]
 *                  page: 1
 *                  totalDocs: 5
 *                  totalPages: 3
 *                  limit: 2
 *              message: Success
 */

/**
 * @openapi
 *  /product/details:
 *      get:
 *          security:
 *              - bearerAuth: []
 *          tags: [Product]
 *          summary: get product data
 *          parameters:
 *              - in: query
 *                name: id
 *                description: id of the product data
 *          responses:
 *              200:
 *                  description: success details
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/successGetProduct'
 *              400:
 *                  description: Invalid Request
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/errorBadRequest'
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
 *  /product:
 *      get:
 *          security:
 *              - bearerAuth: []
 *          tags: [Product]
 *          summary: get product list
 *          parameters:
 *              - in: query
 *                name: pageNumber
 *              - in: query
 *                name: limit
 *              - in: query
 *                name: sort
 *              - in: query
 *                name: sortBy
 *              - in: query
 *                name: search
 *          responses:
 *              200:
 *                  description: success details
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/successGetProductList'
 *              400:
 *                  description: Invalid Request
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/errorBadRequest'
 *              500:
 *                  description: internal server error
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/unexpectedError'
 *
 *
 */
