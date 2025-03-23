"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
class server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = '3001';
    }
    Listas() {
        this.app.listen(this.port, () => { console.log(`Aplicacion corriendo en el puerto ${this.port}`); });
    }
}
exports.default = server;
