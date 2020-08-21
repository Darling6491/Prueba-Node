"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mysql_1 = __importDefault(require("../mysql/mysql"));
const router = express_1.Router();
router.get('/usuario', (req, res) => {
    const query = `
    select *
    from usuario`;
    mysql_1.default.ejecutarQuery(query, (err, usuario) => {
        if (err) {
            res.status(400).json({
                ok: false,
                error: err
            });
        }
        else {
            res.json({
                ok: true,
                usuario: usuario
            });
        }
    });
});
router.get('/usuario/:idusuario', (req, res) => {
    const idusuario = req.params.idusuario;
    const escapedidusuario = mysql_1.default.instance.conexion.escape(idusuario);
    const query = `
    select *
    from usuario
    where idusuario = ${escapedidusuario}`;
    mysql_1.default.ejecutarQuery(query, (err, usuario) => {
        if (err) {
            res.status(400).json({
                ok: false,
                error: err
            });
        }
        else {
            res.json({
                ok: true,
                usuario: usuario[0]
            });
        }
    });
});
exports.default = router;
