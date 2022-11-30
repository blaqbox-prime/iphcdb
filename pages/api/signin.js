import connecMongo from '../../db/db';
import {MemberModel} from '../../db/models/MemberModel';
const bcrypt = require('bcrypt');

export default async function handler(req,res){

        await connecMongo();

        console.log(req.body)

        let signInData = JSON.parse(req.body);

            
            //get document
            const member = await MemberModel.findOne({email: signInData.email});
            res.setHeader('Content-Type', 'application/json');

            if(!member){
                return res.status(404).json({message: 'Member not found'});
            }

            if(!bcrypt.compareSync(signInData.password, member.password)){
                return res.status(400).json({message: 'Incorrect password or email'});
            }else {
                return res.status(200).json({member});
            }    
   
}