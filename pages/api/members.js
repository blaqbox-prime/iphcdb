import connecMongo from '../../db/db';
import {MemberModel} from '../../db/models/MemberModel';
import {verify} from 'jsonwebtoken';
import { authenticated } from '../../middlewares/auth';




export default authenticated(async function getMembers(req,res){

   if(req.method === 'GET'){
    try{
        await connecMongo();
      
            //create document
            const members = await MemberModel.find();
            
            return res.json({members});

    }catch(error){
        console.log(error)
        res.json({error})
    }
   }
})