"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const error_middleware_1 = require("./../middlewares/error-middleware");
const express_1 = __importDefault(require("express"));
const productos_1 = __importDefault(require("../routes/productos"));
const conexion_1 = __importDefault(require("../config/conexion"));
const cors_1 = __importDefault(require("cors"));
class Server {
    constructor() {
        console.log('inicioss');
        console.log(process.env.PORT);
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '3000';
        this.listen();
        this.midlewares();
        this.routes();
        this.dbconnect();
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Aplicacion corriendo ens el puerto ${this.port}`);
        });
    }
    routes() {
        console.log('routes');
        this.app.get('/', (req, res) => {
            res.json({
                msg: 'Api working'
            });
        });
        this.app.use('/api/productos', productos_1.default);
        this.app.use(error_middleware_1.errorHandler);
    }
    midlewares() {
        // parseamos el body
        this.app.use(express_1.default.json());
        //cors
        this.app.use((0, cors_1.default)());
        // Middleware de manejo de errores (debe ir al final)
    }
    dbconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield conexion_1.default.authenticate();
                0;
                console.log('Connection has been established successfully.');
            }
            catch (error) {
                console.error('Unable to connect to the database:', error);
            }
        });
    }
}
exports.default = Server;
