const { body, param, validationResult } = require("express-validator");

exports.validateCreateClient = [
    body("firstName").exists().withMessage("O corpo da requisição deve conter a propriedade firstName")
        .bail()
        .isString().withMessage("O campo firstName deve ser do tipo string")
        .bail()
        .notEmpty({ ignore_whitespace: true }).withMessage("O campo firstName não pode ser vazio")
        .bail()
        .isLength({ max: 255 }).withMessage("O campo firstName deve ser menor ou igual a 255 caracteres"),
    body("lastName").exists().withMessage("O corpo da requisição deve conter a propriedade lastName")
        .bail()
        .isString().withMessage("O campo lastName deve ser do tipo string")
        .bail()
        .notEmpty({ ignore_whitespace: true }).withMessage("O campo lastName não pode ser vazio")
        .bail()
        .isLength({ max: 255 }).withMessage("O campo lastName deve ser menor ou igual a 255 caracteres"),
    body("email").exists().withMessage("O corpo da requisição deve conter a propriedade email")
        .bail()
        .notEmpty({ ignore_whitespace: true }).withMessage("O campo email não pode ser vazio")
        .bail()
        .isLength({ max: 255 }).withMessage("O campo email deve ser menor ou igual a 255 caracteres")
        .bail()
        .isEmail().withMessage("Email inválido"),
    (req, res, next) => {
        let errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() });
        next();
    }
];

exports.validateUpdateClient = [
    param("id").exists().withMessage("O caminho da URL deve conter o campo ID")
        .bail()
        .isInt({ gt: 0 }).withMessage("O campo ID na URL deve ser um número e maior do que 0"),
    body("firstName").exists().withMessage("O corpo da requisição deve conter a propriedade firstName")
        .bail()
        .isString().withMessage("O campo firstName deve ser do tipo string")
        .bail()
        .notEmpty({ ignore_whitespace: true }).withMessage("O campo firstName não pode ser vazio")
        .bail()
        .isLength({ max: 255 }).withMessage("O campo firstName deve ser menor ou igual a 255 caracteres"),
    body("lastName").exists().withMessage("O corpo da requisição deve conter a propriedade lastName")
        .bail()
        .isString().withMessage("O campo lastName deve ser do tipo string")
        .bail()
        .notEmpty({ ignore_whitespace: true }).withMessage("O campo lastName não pode ser vazio")
        .bail()
        .isLength({ max: 255 }).withMessage("O campo lastName deve ser menor ou igual a 255 caracteres"),
    body("email").exists().withMessage("O corpo da requisição deve conter a propriedade email")
        .bail()
        .notEmpty({ ignore_whitespace: true }).withMessage("O campo email não pode ser vazio")
        .bail()
        .isLength({ max: 255 }).withMessage("O campo email deve ser menor ou igual a 255 caracteres")
        .bail()
        .isEmail().withMessage("Email inválido"),
    body("active").exists().withMessage("O corpo da requisição deve conter a propriedade active")
        .bail()
        .isBoolean().withMessage("A propriedade active deve ser true ou false"),
    (req, res, next) => {
        let errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() });
        next();
    }
];

exports.validateDeleteClient = [
    param("id").exists().withMessage("O caminho da URL deve conter o campo ID")
        .bail()
        .isInt({ gt: 0 }).withMessage("O campo ID na URL deve ser um número e maior do que 0"),
    (req, res, next) => {
        let errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() });
        next();
    }
];

exports.validateFindOneClient = [
    param("id").exists().withMessage("O caminho da URL deve conter o campo ID")
        .bail()
        .isInt({ gt: 0 }).withMessage("O campo ID na URL deve ser um número e maior do que 0"),
    (req, res, next) => {
        let errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() });
        next();
    }
];
