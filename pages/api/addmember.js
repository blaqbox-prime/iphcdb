import connecMongo from '../../db/db';
import {MemberModel} from '../../db/models/MemberModel';
const bcrypt = require('bcrypt');

export default async function handler(req,res){

    
        await connecMongo();

        // Create Hashed Password
        const saltRounds = 10;
        let hashedPass;
        let memberData = JSON.parse(req.body);

        bcrypt.hash(memberData.password,saltRounds).then( async (hash) =>  {
            hashedPass = hash;
            memberData.password = hashedPass;

            console.log(memberData);

            //create document
            const member = await MemberModel.create(memberData);
            console.log("member created")
            res.setHeader('Content-Type', 'application/json');
            return res.status(200).json({member});
            
        }).catch(error => {
            console.log(error);
            return res.status(500).json({ error });
        })


   
}