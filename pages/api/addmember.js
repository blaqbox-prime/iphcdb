import connecMongo from '../../db/db';
import MemberModel from '../../db/models/MemberModel';

export default async function addMember(req,res){
    try{
        await connecMongo();

        //create document
        const member = await MemberModel.create(req.body);
        console.log("member created")
        res.json({member});

    }catch(e){
        console.log(e)
        res.json({error})
    }
}