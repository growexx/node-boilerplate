/**
 * @openapi
 * components:
 *  schemas:
 *      editProduct:
 *          type: object
 *          required:
 *              - id
 *              - foodName
 *              - foodType
 *              - quantity
 *              - price
 *              - isEnabled
 *              - extras
 *          properties:
 *              id:
 *                  type: id
 *                  description: id of the food
 *                  example: id
 *              foodName:
 *                  type: string
 *                  description: name of the food
 *                  example: foodName
 *              foodType:
 *                  type: string
 *                  description: food type
 *                  example: foodType
 *              quantity:
 *                  type: number
 *                  description: quantity
 *                  example: quantity
 *              price:
 *                  type: number
 *                  description: price
 *                  example: price
 *              isEnabled:
 *                  type: boolean
 *                  description: enabled
 *                  example: true
 *              extras:
 *                  type: array
 *                  description: extra food
 *                  example: ['Garlic Bread', 'Cokes']
 *      successEditProduct:
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
 *                              quantity,
 *                          price:
 *                              price,
 *                          extras:
 *                              [string],
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
 *      put:
 *          security:
 *              - bearerAuth: []
 *          tags: [Product]
 *          summary: Edit a product
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/editProduct'
 *          responses:
 *              200:
 *                  description: success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/successEditProduct'
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
