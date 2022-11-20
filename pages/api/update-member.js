import connecMongo from "../../db/db";
import { MemberModel } from "../../db/models/MemberModel";

export default async function handler(req, res) {
  try {
    await connecMongo();

    let data = JSON.parse(req.body);

    console.log(data);

    try {
      // delete
      const result = await MemberModel.updateOne({ _id: data._id },{$set: data});
      res.setHeader("Content-Type", "application/json");

      if (!result) {
        return res.status(404).json({ message: "Member not found" });
      }

      return res.status(200).json({ result });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  } catch (err) {
    return res.status(401).json({ message: "Failed to connect to database" });
  }
}
