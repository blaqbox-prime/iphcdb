import connecMongo from '../../../db/db';
import {MemberModel} from '../../../db/models/MemberModel';

export default async function handler(req,res){

    console.log(req);

    try{
        await connecMongo();

            const member = await MemberModel.findOne({_id:req.query.id});
            
            return res.json(member);

    }catch(error){
        console.log(error)
        return res.status(404).json({error: error.message})
    }
}