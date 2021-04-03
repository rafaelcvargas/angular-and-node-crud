module.exports = app => {
    let clients = require("../controllers/client.controller");
    let router = require("express").Router();
    

    /**
     * @swagger
     * components:
     *   schemas:
     *     NewClient:
     *       type: object
     *       properties:
     *         firstName:
     *           type: string
     *           description: The client first name
     *           example: Jonh
     *         lastName:
     *           type: string
     *           description: The client last name
     *           example: Doe
     *         email:
     *           type: string
     *           description: The client email
     *           example: jonhdoe@gmail.com
     *     UpdateClient:
     *       type: object
     *       properties:
     *         firstName:
     *           type: string
     *           description: The client first name
     *           example: Jonh
     *         lastName:
     *           type: string
     *           description: The client last name
     *           example: Doe
     *         email:
     *           type: string
     *           description: The client email
     *           example: jonhdoe@gmail.com
     *         active:
     *           type: boolean
     *           description: Indicates if the client is active or not
     *           example: true
     *         createdAt:
     *           type: date-time
     *           description: The date that the client was created
     *           example: 2021-03-29T18:52:39.000Z
     *         updatedAt:
     *           type: date-time
     *           description: The date that the client was updated
     *           example: 2021-03-29T18:52:39.000Z
     *     Client:
     *       allOf:
     *         - type: object
     *           properties:
     *             id:
     *               type: integer
     *               description: The client ID
     *               example: 0
     *         - $ref: '#/components/schemas/UpdateClient'
     */

    /**
 * @swagger
 * /api/clients:
 *   post:
 *     summary: Create a new Client
 *     description: Create a new Client
 *     tags:
 *      - Clients
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewClient'
 *     responses:
 *       200:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: The success message
 *                   example: "Client created"                 
 *                 record:
 *                   $ref: '#/components/schemas/Client'
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: The error message
 *                   example: "Email already in use"
*/
    router.post("/",
    clients.validate('createClient'),
    clients.create);

    /**
 * @swagger
 * /api/clients:
 *   get:
 *     summary: Retrieve a list of clients
 *     description: Retrieve a list of clients from the api
 *     tags:
 *       - Clients
 *     responses:
 *       200:
 *         description: A list of clients
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count:
 *                   type: int
 *                   description: The number of clients returned
 *                   example: 0
 *                 result:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Client'
*/
    router.get("/", clients.findAll);

    /**
     * @swagger
     * /api/clients/{id}:
     *   get:
     *     summary: Retrieve a single client
     *     description: Retrieve a single client receiving an ID
     *     tags:
     *       - Clients
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         description: User ID
     *         schema:
     *           type: integer
     *     responses:
     *       200:
     *         description: Returns a single client
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 data:
     *                   $ref: '#/components/schemas/Client'
    */
    router.get("/:id", 
    clients.validate('findOneClient'),
    clients.findOne);

    /**
     * @swagger
     * /api/clients/{id}:
     *   put:
     *     summary: Updates a single client
     *     description: Update a single client receiving an ID
     *     tags:
     *       - Clients
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         description: User ID
     *         schema:
     *           type: integer
     *     requestBody:
     *           required: true
     *           content:
     *             application/json:
     *               schema:
     *                 $ref: '#/components/schemas/UpdateClient'
     *     responses:
     *       200:
     *         description: Returns a single client
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *                   description: The success message
     *                   example: "Client created"                 
     *                 record:
     *                   $ref: '#/components/schemas/Client'
     *       400:
     *         description: Bad Request
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                  message:
     *                   type: string
     *                   description: The error message
     *                   example: "Error. Client not updated. Check if id is valid"
    */
    router.put("/:id", 
    clients.validate('clientUpdate'),
    clients.update);

    /**
 * @swagger
 * /api/clients/{id}:
 *   delete:
 *     summary: Delete a single client
 *     description: Delete a single client receiving an ID
 *     tags:
 *       - Clients
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Returns a confirmation message
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: The deleted message
 *                   example: "Client deleted"
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  message:
 *                   type: string
 *                   description: The error message
 *                   example: "Error. Client not deleted. Check if id is valid"
*/
    router.delete("/:id", 
    clients.validate('deleteClient'),
    clients.delete);

    // Router
    app.use("/api/clients", router);
}