import connecMongo from '../../../db/db';
import {MemberModel} from '../../../db/models/MemberModel';

export default async function handler(req,res){

    try{
        await connecMongo();
        const data = JSON.parse(req.body)

            MemberModel.findOne({ _id: data.id}, 'children', (err, member) => {
                if(err) return res.status(404).json({message: 'Not Found'});
                console.log(member);
                MemberModel.find({_id: member.children}, (err, children) => {
                    if(err) return res.status(404).json({message: 'No children Found'})
                    return res.status(200).json(children);

                });
            })


    }catch(error){
        console.log(error)
        res.json({error})
    }
}