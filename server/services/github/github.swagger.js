/**
 * @openapi
 * /github/repositories:
 *      get:
 *          security:
 *              - bearerAuth: []
 *          tags: [Github]
 *          summary: 'Get all the repositories'
 *          parameters: [{
 *               in: 'query',
 *               name: 'page',
 *               description: 'pass the page number into which display the 100 results per page'
 *          }]
 *          responses:
 *              200:
 *                  description: Get all the repositories details
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/successRepositoryDetails'
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
 * /github/repositorypr:
 *      get:
 *          security:
 *              - bearerAuth: []
 *          tags: [Github]
 *          summary: 'Get all the PR of specific repository'
 *          parameters:
 *                   - in: query
 *                     name: page
 *                     description: pass the page number into which display the 100 results per page
 *                   - in: query
 *                     name: repo
 *                     description: pass the repository name
 *          responses:
 *              200:
 *                  description: Get all the PR of specific repository
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/successRepositoryDetails'
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
 * /github/rejectedpr:
 *      get:
 *          security:
 *              - bearerAuth: []
 *          tags: [Github]
 *          summary: 'Get all the Pull Request from Rejected state'
 *          parameters:
 *                   - in: query
 *                     name: page
 *                     description: pass the page number into which display the 100 results per page
 *                   - in: query
 *                     name: repo
 *                     description: pass the repository name
 *          responses:
 *              200:
 *                  description: Get all the Pull Request from Rejected state
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/successRepositoryDetails'
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
 * /github/particularprcomments:
 *      get:
 *          security:
 *              - bearerAuth: []
 *          tags: [Github]
 *          summary: 'Get all the comments of a Particular Pull Request'
 *          parameters:
 *                   - in: query
 *                     name: repo
 *                     description: pass the repository name
 *                   - in: query
 *                     name: pullnumber
 *                     description: pass the particular pull request number
 *          responses:
 *              200:
 *                  description: Get all the comments of a Particular Pull Request
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/successRepositoryDetails'
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
 * /github/commentsfromrepository:
 *      get:
 *          security:
 *              - bearerAuth: []
 *          tags: [Github]
 *          summary: 'Get all the comments of a repository'
 *          parameters: [{
 *               in: 'query',
 *               name: 'repo',
 *               description: 'pass the repository name'
 *          }]
 *          responses:
 *              200:
 *                  description: Get all the comments of a repository
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/successRepositoryDetails'
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
 * /github/searchprbetweendate:
 *      get:
 *          security:
 *              - bearerAuth: []
 *          tags: [Github]
 *          summary: 'Get/Search all Pull Request from date range'
 *          parameters:
 *                   - in: query
 *                     name: startDate
 *                     description: pass the start date
 *                   - in: query
 *                     name: endDate
 *                     description: pass the end date
 *                   - in: query
 *                     name: repo
 *                     description: pass the repo
 *                   - in: query
 *                     name: author
 *                     description: pass the author
 *                   - in: query
 *                     name: page
 *                     description: pass the page
 *          responses:
 *              200:
 *                  description: Get/Search all Pull Request from date range
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/successRepositoryDetails'
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
 * /github/repositorydetails:
 *      get:
 *          security:
 *              - bearerAuth: []
 *          tags: [Github]
 *          summary: 'Get all the details of a repository'
 *          parameters: [{
 *               in: 'query',
 *               name: 'repo',
 *               description: 'pass the repository name'
 *          }]
 *          responses:
 *              200:
 *                  description: Get all the details of a repository
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/successRepositoryDetails'
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
