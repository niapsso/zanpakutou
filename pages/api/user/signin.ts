import { NextApiRequest, NextApiResponse } from "next";
import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";

import { connect } from "@/utils/connection";
import { ResponseFunctions } from "@/utils/types";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const method = req.method as keyof ResponseFunctions;

  const handleReq: ResponseFunctions = {
    POST: async (req: NextApiRequest, res: NextApiResponse) => {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          message: "email and password are required",
        });
      }

      const { User } = await connect();

      const user = await User.findOne({ email }).select({
        email: 1,
        password: 1,
      });

      if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      if (!(await compare(password, user.password))) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      const token = jwt.sign(
        {
          id: user.id,
        },
        process.env.SECRET_KEY as string,
        {
          expiresIn: "1h",
        }
      );

      return res.json({ token });
    },
  };

  const response = handleReq[method];

  if (response) return response(req, res);

  return res.status(405).json({ error: "Method not allowed" });
};

export default handler;
