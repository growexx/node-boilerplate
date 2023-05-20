/**
 * @openapi
 * /sonar/codesmells:
 *      get:
 *          security:
 *              - bearerAuth: []
 *          tags: [SonarQube]
 *          summary: 'Get all the code smells from particular project in the sonarqube'
 *          parameters:
 *                   - in: query
 *                     name: username
 *                     description: pass the username as a token. You can generate new tokens from sonarqube
 *                   - in: query
 *                     name: componentKeys
 *                     description: pass the project key [project name]
 *          responses:
 *              200:
 *                  description: Get all code smells from particular project in the sonarqube
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/successSonarDetails'
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
 * /sonar/vulnerabilities:
 *      get:
 *          security:
 *              - bearerAuth: []
 *          tags: [SonarQube]
 *          summary: 'Get all the Vulnerabilities from particular project in the sonarqube'
 *          parameters:
 *                   - in: query
 *                     name: username
 *                     description: pass the username as a token. You can generate new tokens from sonarqube
 *                   - in: query
 *                     name: componentKeys
 *                     description: pass the project key [project name]
 *          responses:
 *              200:
 *                  description: Get all Vulnerabilities from particular project in the sonarqube
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/successSonarDetails'
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
