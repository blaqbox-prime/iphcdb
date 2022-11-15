import connecMongo from '../../db/db';
import {MemberModel} from '../../db/models/MemberModel';

export default async function handler(req,res){

        await connecMongo();

        let data = JSON.parse(req.body);

            try {

                // delete 
                const result = await MemberModel.deleteOne({_id: data._id});
                res.setHeader('Content-Type', 'application/json');

                if(!result){
                    return res.status(404).json({message: 'Member not found'});
                }

                return res.status(200).json({result});

            } catch(err){
                return res.status(500).json({message: err.message});
            }
}