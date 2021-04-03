const db = require("../models");
const Client = db.clients;
const Op = db.Sequelize.Op;
const { check, validationResult } = require('express-validator');


exports.validate = (method) => {
    switch (method) {
        case 'createClient': {
            return [
                check('firstName').isString().withMessage({ message: 'Favor digite um nome valido' }),
                check('lastName').isString().withMessage({ message: 'Favor digite um sobrenome valido' }),
                check('email').isEmail().withMessage({ message: 'Favor digite um e-mail valido' }),
            ]
        }
        case 'clientUpdate': {
            return [
                check('id').exists().isInt({ gt: 0}).withMessage({ message: 'Favor digite um ID valido' }),
                check('firstName').isString().withMessage({ message: 'Favor digite um nome valido' }),
                check('lastName').isString().withMessage({ message: 'Favor digite um sobrenome valido' }),
                // email must be an email
                check('email').isEmail().withMessage({ message: 'Favor digite um e-mail valido' }),
                check('active').isBoolean().withMessage({ message: 'Favor digite o status' }),
            ]
        }
        case 'deleteClient': {
            return [
                check('id').exists().isInt({ gt: 0}).withMessage({ message: 'Favor digite um ID valido' })
            ]
        }
        case 'findOneClient': {
            return [
                check('id').exists().isInt({ gt: 0}).withMessage({ message: 'Favor digite um ID valido' })
            ]
        }
    }
}


exports.create = async (req, res) => {
    try {
        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let [client, created] = await Client.findOrCreate({
            where: { email: req.body.email }, defaults: {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                active: true
            }
        });

        if (created) {
            res.send({ message: "Client created", record: client });
        } else {
            res.status(400).send({ message: "Email already in use" });
        }
    } catch (e) {
        return res.status(400).json({ message: e.message });
    }
}

exports.findAll = async (req, res) => {
    try {
        let firstName = req.query.firstName;
        let lastName = req.query.lastName;
        let email = req.query.email;

        let condition = {
            ...(firstName && { firstName: { [Op.like]: `%${firstName}%` } }), //... spread operator - não cria a propriedade se não encontrar ela.
            ...(lastName && { lastName: { [Op.like]: `%${lastName}%` } }),
            ...(email && { email: { [Op.like]: `%${email}%` } })
        };

        let clients = await Client.findAll({ where: condition });

        res.send({ count: clients.length, result: clients });
    } catch (e) {
        return res.status(400).json({ message: e.message });
    }
};

exports.findOne = async (req, res) => {
    try {
         // Finds the validation errors in this request and wraps them in an object with handy functions
         const errors = validationResult(req);
         if (!errors.isEmpty()) {
             return res.status(400).json({ errors: errors.array() });
         }

        let id = req.params.id;
        let client = await Client.findByPk(id);

        if (client) {
            res.send(client);
        } else {
            res.sendStatus(404);
        }
    } catch (e) {
        return res.status(400).json({ message: e.message });
    }
};

exports.update = async (req, res) => {
    try {

        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let id = req.params.id;

        let updated = await Client.update(req.body, {
            where: { id: id }
        });

        if (updated == 1) {
            let client = await Client.findByPk(id);
            res.send({ message: "Client updated", record: client });
        } else {
            res.status(400).send({ message: "Error. Client not updated. Check if id is valid" });
        }
    }
    catch (e) {
        return res.status(400).json({ message: e.message });
    }
};

exports.delete = async (req, res) => {
    try {
        
         // Finds the validation errors in this request and wraps them in an object with handy functions
         const errors = validationResult(req);
         if (!errors.isEmpty()) {
             return res.status(400).json({ errors: errors.array() });
         }
         
        let id = req.params.id;

        let deleted = await Client.destroy({
            where: { id: id }
        });

        if (deleted == 1) {
            res.send({ message: "Client deleted" });
        } else {
            res.status(400).send({ message: "Error. Client not deleted. Check if id is valid" });
        }
    }
    catch (e) {
        return res.status(400).json({ message: e.message });
    }
};
