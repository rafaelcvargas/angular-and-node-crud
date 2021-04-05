const db = require("../models");
const Client = db.clients;
const Op = db.Sequelize.Op;

exports.create = async (req, res) => {
    try {
        let [client, created] = await Client.findOrCreate({
            where: { email: req.body.email }, defaults: {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                active: true
            }
        });

        if (created) {
            res.send({ message: "Cliente criado", record: client });
        } else {
            res.status(400).send({ message: "Email já está em uso" });
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
        let id = req.params.id;

        let updated = await Client.update(req.body, {
            where: { id: id }
        });

        if (updated == 1) {
            let client = await Client.findByPk(id);
            res.send({ message: "Cliente atualizado", record: client });
        } else {
            res.status(400).send({ message: "Erro. Cliente não atualizado. Verifique se o ID é válido" });
        }
    }
    catch (e) {
        return res.status(400).json({ message: e.message });
    }
};

exports.delete = async (req, res) => {
    try {
        let id = req.params.id;

        let deleted = await Client.destroy({
            where: { id: id }
        });

        if (deleted == 1) {
            res.send({ message: "Client deleted" });
        } else {
            res.status(400).send({ message: "Erro. Cliente não deletado. Verifique se o ID é válido" });
        }
    }
    catch (e) {
        return res.status(400).json({ message: e.message });
    }
};
