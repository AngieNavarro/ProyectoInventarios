import { errorHandler } from './../middlewares/error-middleware';
import express, { Application, Request, Response } from 'express';
import routesProductos from '../routes/productos'
import base from '../config/conexion';
import cors from 'cors'
class Server {
    private app: Application;
    private port: string;

    constructor() {
        console.log('inicioss');
        console.log(process.env.PORT);

        this.app = express();
        this.port = process.env.PORT || '3000';
        this.listen();
        this.midlewares();
        this.routes();
        this.dbconnect();
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Aplicacion corriendo ens el puerto ${this.port}`)
        })
    }
    routes() {
        console.log('routes')
        this.app.get('/', (req: Request, res: Response) => {
            res.json({
                msg: 'Api working'
            })
        })

        this.app.use('/api/productos', routesProductos)
        this.app.use(errorHandler);

    }
    midlewares() {
        // parseamos el body
        this.app.use(express.json());
        //cors
        this.app.use(cors())
        // Middleware de manejo de errores (debe ir al final)
    }
    async dbconnect() {
        try {
            await base.authenticate(); 0
            console.log('Connection has been established successfully.');
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    }
}


export default Server;