/**
 * @openapi
 * /product:
 *  post:
 *      tags: [Products]
 *      summary: Create a new product
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              description: The name of the product.
 *                          description:
 *                              type: string
 *                              description: A description of the product.
 *                          price:
 *                              type: string
 *                              description: The price of the product.
 *                          recurring:
 *                              type: boolean
 *                              description: Indicates whether the product has a recurring charge.
 *                          recurringInterval:
 *                              type: string
 *                              description: The recurring interval (e.g., "month", "year").
 *                      example:
 *                          name: name
 *                          description: description
 *                          price: "100"
 *                          recurring: true
 *                          recurringInterval: month
 *      responses:
 *          200:
 *              description: New product created successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: integer
 *                                  description: Status code (1 for success, 0 for failure).
 *                              message:
 *                                  type: string
 *                                  description: A message indicating the result of the operation.
 *                          example:
 *                              status: 1
 *                              message: New product was created successfully
 *              400:
 *                  description: Invalid Request
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/validationError'
 *              401:
 *                  description: Unauthorized Access
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
 */


/**
 * @openapi
 * /product:
 *  get:
 *      tags: [Products]
 *      summary: Retrieve a list of products
 *      parameters:
 *        - in: query
 *          name: limit
 *          required: true
 *          description: The maximum number of products to retrieve.
 *          schema:
 *            type: integer
 *        - in: query
 *          name: startingAfter
 *          description: Retrieve products starting after the specified product ID.
 *          schema:
 *            type: string
 *        - in: query
 *          name: endingBefore
 *          description: Retrieve products ending before the specified product ID.
 *          schema:
 *            type: string
 *      responses:
 *          200:
 *              description: List of products retrieved successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: integer
 *                                  description: Status code (1 for success, 0 for failure).
 *                              message:
 *                                  type: string
 *                                  description: A message indicating the result of the operation.
 *                              data:
 *                                  type: object
 *                                  properties:
 *                                      products:
 *                                          type: array
 *                                          description: List of product objects.
 *                                          items:
 *                                              type: object
 *                                              properties:
 *                                                  id:
 *                                                      type: string
 *                                                      description: The ID of the product.
 *                                                  object:
 *                                                      type: string
 *                                                      description: The object type (e.g., "product").
 *                                                  active:
 *                                                      type: boolean
 *                                                      description: Indicates if the product is active.
 *                                                  attributes:
 *                                                      type: array
 *                                                      description: Array of product attributes.
 *                                                  created:
 *                                                      type: integer
 *                                                      description: Timestamp when the product was created.
 *                                                  default_price:
 *                                                      type: string
 *                                                      description: The default price ID.
 *                                                  description:
 *                                                      type: string
 *                                                      description: The product description.
 *                                                  features:
 *                                                      type: array
 *                                                      description: Array of product features.
 *                                                  images:
 *                                                      type: array
 *                                                      description: Array of product images.
 *                                                  livemode:
 *                                                      type: boolean
 *                                                      description: Indicates if the product is in livemode.
 *                                                  metadata:
 *                                                      type: object
 *                                                      description: Additional metadata for the product.
 *                                                  name:
 *                                                      type: string
 *                                                      description: The name of the product.
 *                                                  package_dimensions:
 *                                                      type: null
 *                                                      description: Package dimensions (null in this example).
 *                                                  shippable:
 *                                                      type: null
 *                                                      description: Indicates if the product is shippable (null in this example).
 *                                                  statement_descriptor:
 *                                                      type: null
 *                                                      description: The statement descriptor (null in this example).
 *                                                  tax_code:
 *                                                      type: null
 *                                                      description: The tax code (null in this example).
 *                                                  type:
 *                                                      type: string
 *                                                      description: The product type (e.g., "service").
 *                                                  unit_label:
 *                                                      type: null
 *                                                      description: The unit label (null in this example).
 *                                                  updated:
 *                                                      type: integer
 *                                                      description: Timestamp when the product was last updated.
 *                                                  url:
 *                                                      type: null
 *                                                      description: The URL (null in this example).
 *                              example:
 *                                  status: 1
 *                                  message: Success
 *                                  data:
 *                                      products:
 *                                          - id: prod_OqCVx26JgNlGui
 *                                            object: product
 *                                            active: true
 *                                            attributes: []
 *                                            created: 1697621494
 *                                            default_price: price_1O2WGhSCyZbOR9MUiHB67pLt
 *                                            description: Test description
 *                                            features: []
 *                                            images: []
 *                                            livemode: false
 *                                            metadata: {}
 *                                            name: y new Prod
 *                                            package_dimensions: null
 *                                            shippable: null
 *                                            statement_descriptor: null
 *                                            tax_code: null
 *                                            type: service
 *                                            unit_label: null
 *                                            updated: 1697622272
 *                                            url: null
 *                                          - id: prod_O0ATkMuUKOUSgx
 *                                            object: product
 *                                            active: true
 *                                            attributes: []
 *                                            created: 1685620684
 *                                            default_price: price_1NEA8nSCyZbOR9MUjfdasBHH
 *                                            description: my indian test product
 *                                            features: []
 *                                            images: []
 *                                            livemode: false
 *                                            metadata: {}
 *                                            name: Indian test product
 *                                            package_dimensions: null
 *                                            shippable: null
 *                                            statement_descriptor: null
 *                                            tax_code: null
 *                                            type: service
 *                                            unit_label: null
 *                                            updated: 1685620686
 *                                            url: null
 *                                          - id: prod_Nzl3uiKpMLnocQ
 *                                            object: product
 *                                            active: true
 *                                            attributes: []
 *                                            created: 1685526083
 *                                            default_price: price_1NDlWzSCyZbOR9MUDwYea9Xp
 *                                            description: The testing product that will help us in testing
 *                                            features: []
 *                                            images: []
 *                                            livemode: false
 *                                            metadata: {}
 *                                            name: Test Product
 *                                            package_dimensions: null
 *                                            shippable: null
 *                                            statement_descriptor: null
 *                                            tax_code: null
 *                                            type: service
 *                                            unit_label: null
 *                                            updated: 1685526086
 *                                            url: null
 *              400:
 *                  description: Invalid Request
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/validationError'
 *              401:
 *                  description: Unauthorized Access
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
 */


/**
 * @openapi
 * /product:
 *  put:
 *      tags: [Products]
 *      summary: Update a product
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          productId:
 *                              type: string
 *                              description: The ID of the product to update.
 *                          name:
 *                              type: string
 *                              description: The updated name of the product.
 *                          description:
 *                              type: string
 *                              description: The updated description of the product.
 *                          price:
 *                              type: string
 *                              description: The updated price of the product.
 *                          recurring:
 *                              type: boolean
 *                              description: Indicates whether the product has a recurring charge.
 *                          recurringInterval:
 *                              type: string
 *                              description: The updated recurring interval (e.g., "month", "year").
 *                  example:
 *                      productId: prod_XXXXXXXXXXXX
 *                      name: name
 *                      description:  description
 *                      price: "100"
 *                      recurring: false
 *                      recurringInterval: null
 *      responses:
 *          200:
 *              description: Product updated successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: integer
 *                                  description: Status code (1 for success, 0 for failure).
 *                              message:
 *                                  type: string
 *                                  description: A message indicating the result of the operation.
 *                          example:
 *                              status: 1
 *                              message: The product was updated successfully
 *              400:
 *                  description: Invalid Request
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/validationError'
 *              401:
 *                  description: Unauthorized Access
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
 */

/**
 * @openapi
 * /product/archive/{productid}:
 *  put:
 *      tags: [Products]
 *      summary: Archive a product
 *      parameters:
 *        - in: path
 *          name: productid
 *          required: true
 *          description: The ID of the product to archive.
 *          schema:
 *            type: string
 *      responses:
 *          200:
 *              description: Product archived successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: integer
 *                                  description: Status code (1 for success, 0 for failure).
 *                              message:
 *                                  type: string
 *                                  description: A message indicating the result of the operation.
 *                          example:
 *                              status: 1
 *                              message: Success
 *              400:
 *                  description: Invalid Request
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/validationError'
 *              401:
 *                  description: Unauthorized Access
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
 */


/**
 * @openapi
 * /product/unarchive/{productid}:
 *  put:
 *      tags: [Products]
 *      summary: Unarchive a product
 *      parameters:
 *        - in: path
 *          name: productid
 *          required: true
 *          description: The ID of the product to archive.
 *          schema:
 *            type: string
 *      responses:
 *          200:
 *              description: Product unarchive successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: integer
 *                                  description: Status code (1 for success, 0 for failure).
 *                              message:
 *                                  type: string
 *                                  description: A message indicating the result of the operation.
 *                          example:
 *                              status: 1
 *                              message: Success
 *              400:
 *                  description: Invalid Request
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/validationError'
 *              401:
 *                  description: Unauthorized Access
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
 */

/**
 * @openapi
 * /product/checkout:
 *  post:
 *      tags: [Products]
 *      summary: Initiate product checkout
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          priceId:
 *                              type: string
 *                              description: The ID of the product's price.
 *                          quantity:
 *                              type: string
 *                              description: The quantity of the product to purchase.
 *                          userId:
 *                              type: string
 *                              description: The user's UUID.
 *                  example:
 *                      priceId: price_XXXXXXXXXXXXXXXXXXX
 *                      quantity: "1"
 *                      userId: UUID
 *      responses:
 *          200:
 *              description: Checkout initiated successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: integer
 *                                  description: Status code (1 for success, 0 for failure).
 *                                  example: 1
 *                              message:
 *                                  type: string
 *                                  description: A message indicating the result of the operation.
 *                                  example: "Success"
 *                              data:
 *                                  type: object
 *                                  properties:
 *                                      url:
 *                                          type: string
 *                                          description: The URL for the checkout session.
 *                                  example:
 *                                      url: 'url for checkout session'
 *              400:
 *                  description: Invalid Request
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/validationError'
 *              401:
 *                  description: Unauthorized Access
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
 */


/**
 * @openapi
 * /product/create-payment-intent:
 *  post:
 *      tags: [Products]
 *      summary: Create a payment intent
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          userId:
 *                              type: string
 *                              description: The user's UUID.
 *                          items:
 *                              type: array
 *                              description: An array of items to be purchased.
 *                              items:
 *                                  type: object
 *                                  properties:
 *                                      stripePriceId:
 *                                          type: string
 *                                          description: The Stripe price ID of the item.
 *                                      quantity:
 *                                          type: string
 *                                          description: The quantity of the item to purchase.
 *                      example:
 *                          userId: UUID
 *                          items:
 *                              - stripePriceId: price_XXXXXXXXXXXXXXX
 *                                quantity: "10"
 *      responses:
 *          200:
 *              description: Payment intent created successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: integer
 *                                  description: Status code (1 for success, 0 for failure).
 *                                  example: 1
 *                              message:
 *                                  type: string
 *                                  description: A message indicating the result of the operation.
 *                              data:
 *                                  type: object
 *                                  properties:
 *                                      secret:
 *                                          type: string
 *                                          description: The client secret for the payment intent.
 *
 *              400:
 *                  description: Invalid Request
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/validationError'
 *              401:
 *                  description: Unauthorized Access
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
 */
