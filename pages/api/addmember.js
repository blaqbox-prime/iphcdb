import connecMongo from '../../db/db';
import {MemberModel} from '../../db/models/MemberModel';
const bcrypt = require('bcrypt');

export default async function handler(req,res){

    try{
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
            return res.json({member});
            
        }).catch(error => {
            console.log(error);
            return res.status(500).json({ error: error.message });
        })


    }catch(error){
        console.log(error)
        res.json({error})
    }
}