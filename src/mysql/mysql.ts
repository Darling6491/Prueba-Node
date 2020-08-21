import mysql = require('mysql');

export default class MySQL {

    private static _instance: MySQL;

    conexion: mysql.Connection;
    conectado: boolean = false;

    constructor(){
        console.log('Clase inicializada');

            this.conexion =  mysql.createConnection({
                host:'localhost',
                user:'root',
                password:'root',
                database:'prueba_nodejs'
            });
            this.conectarDB()
        }
            
        public static get instance (){
            return this._instance || ( this._instance = new this());
        }

        static ejecutarQuery( query: string, callback: Function){

            this.instance.conexion.query(query,(err, results: Object[],fields) => {

                    if (err) {
                        console.log('Error en query');
                        console.log(err);
                        return callback(err);

                    }
                    if ( results.length === 0){
                        callback('El registro solicitado no existe');
                    } else{
                    callback(null, results);
                    }
            })

        }
            private conectarDB() {
                
this.conexion.connect((err: mysql.MysqlError) =>{

     if( err){
         console.log(err.message);
         return;
     }
     this.conectado=true;
     console.log("Base de datos online")
});
    }
}