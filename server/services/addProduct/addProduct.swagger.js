/**
 * @openapi
 * components:
 *  schemas:
 *      addProduct:
 *          type: object
 *          required:
 *              - foodName
 *              - foodType
 *              - quantity
 *              - price
 *              - isEnabled
 *              - extras
 *          properties:
 *              foodName:
 *                  type: string
 *                  description: name of the food
 *                  example: 'Pizza'
 *              foodType:
 *                  type: string
 *                  description: food type
 *                  example: 'Lunch'
 *              quantity:
 *                  type: number
 *                  description: number
 *                  example: 2
 *              price:
 *                  type: number
 *                  description: number
 *                  example: 20.12
 *              isEnabled:
 *                  type: boolean
 *                  description: enabled
 *                  example: false
 *              extras:
 *                  type: array
 *                  description: extra food
 *                  example: ['Garlic Bread', 'Cokes']
 *      successAddProduct:
 *          type: object
 *          properties:
 *              status:
 *                  type: number
 *                  description: status if data exists
 *              data:
 *                  type: string
 *                  description: product data
 *              message:
 *                  type: string
 *                  description: product data
 *
 *          example:
 *              status: 1
 *              data:
 *                  {
 *                          id:
 *                              id,
 *                          foodName:
 *                              name,
 *                          foodType:
 *                              type,
 *                          quantity:
 *                              1,
 *                          price:
 *                              30.12,
 *                          isEnabled:
 *                              isEnabled,
 *                          created_at:
 *                              2022-12-01T10:22:20.592Z,
 *                          updated_at:
 *                              2022-12-01T10:22:20.592Z
 *                          }
 *              message: Product added successfully.
 */

/**
 * @openapi
 * /product:
 *      post:
 *          security:
 *              - bearerAuth: []
 *          tags: [Product]
 *          summary: Add a product
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/addProduct'
 *          responses:
 *              200:
 *                  description: success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/successAddProduct'
 *              400:
 *                  description: Validation Error
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/errorBadRequest'
 *              500:
 *                  description: Internal Server Error
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/unexpectedError'
 *
 */
