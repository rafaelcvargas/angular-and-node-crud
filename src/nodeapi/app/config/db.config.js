module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "root",
    DB: "clientAPI",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000, //tenta conexao , tempo que aguarda para dar time out 30 segundos 
        idle: 10000 //deixa conexao aberta sem derrubar se fizer algo entre 10 segundos, passou do tempo ele derruba conexao   
    }
};