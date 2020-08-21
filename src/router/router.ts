import {Router, Request, Response} from 'express';
import MySQL from '../mysql/mysql';

const router = Router();

router.get('/usuario',(req: Request, res: Response)=>{

    const query = `
    select *
    from usuario`;

    MySQL.ejecutarQuery(query, (err:any,usuario: Object[]) =>{
if (err){
    res.status(400).json({
        ok: false,
        error: err
    });
}else{
    res.json({
        ok:true,
        usuario:usuario
    });
}
    });


});

router.get('/usuario/:idusuario',(req: Request, res: Response)=>{

    const idusuario = req.params.idusuario;
    const escapedidusuario = MySQL.instance.conexion.escape(idusuario);

    const query = `
    select *
    from usuario
    where idusuario = ${ escapedidusuario}`;

    MySQL.ejecutarQuery(query, (err:any,usuario: Object[]) =>{
if (err){
    res.status(400).json({
        ok: false,
        error: err
    });
}else{
    res.json({
        ok:true,
        usuario:usuario [0]
    });
}
    });
});
export default router;