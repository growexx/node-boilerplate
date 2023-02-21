/**
 * @openapi
 * components:
 *  schemas:
 *      deleteProduct:
 *          type: object
 *          required:
 *              - id
 *          properties:
 *              id:
 *                  type: string
 *                  description: id of product
 *                  example: 'id'
 *      successDeleteProduct:
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
 *                  description: delete product data
 *
 *          example:
 *              status: 1
 *              data:
 *                  {
 *                          n:
 *                              1,
 *                          ok:
 *                              1,
 *                          deletedCount:
 *                              1,
 *                          }
 *              message: Product deleted successfully.
 */

/**
 * @openapi
 * /product:
 *      delete:
 *          security:
 *              - bearerAuth: []
 *          tags: [Product]
 *          summary: Delete a product
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/deleteProduct'
 *          responses:
 *              200:
 *                  description: success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/successDeleteProduct'
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
