import connecMongo from '../../db/db';
import {MemberModel} from '../../db/models/MemberModel';

export default async function handler(req,res){

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