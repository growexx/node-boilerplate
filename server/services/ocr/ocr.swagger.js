/**
 * @openapi
 * /ocr/extract:
 *      post:
 *          tags: [OCR]
 *          summary: Extract the text from bills.
 *          parameters:
 *              - in: formData
 *                name: photo
 *                required: true
 *                description: upload Bill.
 *                schema:
 *                  type: file
 *          responses:
 *              200:
 *                  description: You have successfully extract text.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/successOCRExtract'
 *              422:
 *                  description: UnAuthorise
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/unauthorisedAWSAccess'
 *              500:
 *                  description: Internal Server Error
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/unexpectedError'
 *
 */
