import connecMongo from "../../../db/db";
import { MemberModel } from "../../../db/models/MemberModel";
const bcrypt = require('bcrypt');


export default async function handler(req, res) {
  try {
    await connecMongo();

    let data = JSON.parse(req.body);

    // console.log(data);
        let hashedPassword;

        bcrypt.hash(data.password,10).then( async (hash) =>  {
            hashedPassword = hash;

      const result = await MemberModel.updateOne({ _id: data.member_id },{$set: {password: hashedPassword}});
      res.setHeader("Content-Type", "application/json");

      return res.status(200).json({ result });
    }).
    catch(err => {
      return res.status(500).json({ message: err.message });
    });

  } catch (err) {
    return res.status(401).json({ message: "Failed to connect to database" });
  }
}
