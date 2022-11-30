import connecMongo from '../../../db/db';
import {MemberModel} from '../../../db/models/MemberModel';

export default async function handler(req,res){

    try{
        await connecMongo();

            const member = await MemberModel.findOne({email:req.query.email}, '_id email firstNames isAdmin').exec();
            
            return res.json(member);

    }catch(error){
        console.log(error)
        return res.status(404).json({error: error.message})
    }
}