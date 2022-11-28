import connecMongo from "../../../db/db";
import { MemberModel } from "../../../db/models/MemberModel";
import { Types } from 'mongoose';


export default async function handler(req, res) {
  try {
    await connecMongo();

    let data = JSON.parse(req.body);

    console.log(data);

    const objIds = data.selected.map(selected => Types.ObjectId(selected));

    try {
    
      const member = await MemberModel.findOne({ _id: data._id });
      
      member.spouse = data.selected;
      member.save().then((doc) => {

          res.setHeader("Content-Type", "application/json");
    
          if (!doc) {
            return res.status(404).json({ message: "Member not found" });
          }
    
          return res.status(200).json({ doc });
      })
      
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  } catch (err) {
    return res.status(401).json({ message: "Failed to connect to database" });
  }
}
