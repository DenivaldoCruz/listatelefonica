var express = require("express");
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));



// operadoras
var criarOperadora = criarOperadora;
function criarOperadora(nome, codigo, categoria, cor, preco) {
    return {
        nome: nome,
        codigo: codigo,
        categoria: categoria,
        cor: cor,
        preco: preco
    };
};

var oi = criarOperadora("Oi", 14, "Celular", "yellow", 2.0);
var vivo = criarOperadora("Vivo", 15, "Celular", "lightgreen", 1.0);
var tim = criarOperadora("Tim", 41, "Celular", "red", 1.5);
var gvt = criarOperadora("GVT", 25, "Fixo", "orange", 2.5);
var embratel = criarOperadora("Embratel", 21, "Fixo", "blue", 0.8);

var operadoras = [oi, vivo, tim, gvt, embratel];

// Lista de contatos
var contatos = [
                        {id: 1, nome: "Pedro", telefone: "11 99729-9129", operadora: oi, data: new Date()}, 
                        {id: 2, nome: "Maria", telefone: "11 9424-2977", operadora: vivo, data: new Date()},
                        {id: 3, nome: "Joao", telefone: "11 94729-9129", operadora: tim, data: new Date()},
                        {id: 4, nome: "Jose", telefone: "11 94529-9129", operadora: gvt, data: new Date()},
                        {id: 5, nome: "Tiago", telefone: "11 92729-9129", operadora: embratel, data: new Date()}
                    ];
var lastId = 2;

// Obter contato
app.get("/api/contatos/:id", function (req, res) {
    var id = req.params.id;
    var result = "not.found";
    for (var i = 0; i < contatos.length; i++) {
        if (contatos[i].id == id) {
            result = contatos[i];
            break;
        }
    }
    res.send(result);
});

// Apagar contato
app.delete("/api/contatos/:id", function (req, res) {
    var id = req.params.id;
    var result = "not.found";
    for (var i = 0; i < contatos.length; i++) {
        if (contatos[i].id == id) {
            contatos.splice(i, 1);
            result = "ok";
            break;
        }
    }
    res.send(result);
});

// Criar novo registro
app.post("/api/contatos", function (req, res) {
    var record = req.body;
    record.id = ++lastId;
    contatos.unshift(record);
    res.send("ok");
});

// Atualizar registro
app.put("/api/contatos", function (req, res) {
    var result = "not.found";
    for (var i = 0; i < contatos.length; i++) {
        if (contatos[i].id == req.body.id) {
            contatos[i] = req.body;
            result = "ok";
            break;
        }
    }
    res.send(result);
});

// Definir um endpoint da API
app.get("/api/contatos", function (req, res, next) {
    res.send(contatos);
});

app.get("/api/operadoras", function (req, res, next) {
    res.send(operadoras);
});

// Aplicação disponível em http://127.0.0.1:9000/
app.listen(9000);
