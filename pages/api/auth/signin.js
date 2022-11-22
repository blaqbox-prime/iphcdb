import connecMongo from '../../../db/db';
import {MemberModel} from '../../../db/models/MemberModel';
const bcrypt = require('bcrypt');
import {sign} from 'jsonwebtoken';


export default async function handler(req,res){

       if(req.method === 'POST'){
        await connecMongo();

        let signInData = req.body;

            
            //get document
            const member = await MemberModel.findOne({email: signInData.email});
            res.setHeader('Content-Type', 'application/json');

            if(!member){
                return res.status(404).json({message: 'Member not found'});
            }

            if(!bcrypt.compareSync(signInData.password, member.password)){
                return res.status(400).json({message: 'Incorrect password or email'});
            }else {

                const claims = {sub: member._id, email: member.email};
                const jwt = sign(claims, process.env.SECRET, {expiresIn: '1hr'});

                return res.status(200).json({authToken: jwt});
            }    
       }
   
}