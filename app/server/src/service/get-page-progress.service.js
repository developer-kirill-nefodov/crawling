import {redis} from "../db";

export const getPageProgressService = async (req, res) => {
  try {
    const {secret} = req.params;

    const data = await redis.get(secret);

    if(data) {
      res.status(200).json(JSON.parse(data));
    } else {
      res.status(200).json({message: 'private key is not valid'});
    }
  } catch (e) {
    res.status(400).send(e);
  }
}
