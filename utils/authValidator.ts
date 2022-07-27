import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

import { connect } from "./connection";

const authValidator = async (req: NextApiRequest) => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    return false;
  }

  const [, token] = authorization.split(" ");

  if (!token) {
    return false;
  }

  const decoded = jwt.verify(token, process.env.SECRET_KEY as string);

  const { id } = decoded as { id: string };

  console.log(id);

  const { User } = await connect();

  const user = await User.findById(id);

  if (!user) {
    return false;
  }

  return true;
};

export default authValidator;
