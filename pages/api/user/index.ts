import { NextApiRequest, NextApiResponse } from "next";
import { hash } from "bcryptjs";

import { connect } from "../../../utils/connection";
import { ResponseFunctions } from "../../../utils/types";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const method = req.method as keyof ResponseFunctions;

  const errCatcher = (error: Error) => res.status(400).json({ error });

  const handleReq: ResponseFunctions = {
    POST: async (req: NextApiRequest, res: NextApiResponse) => {
      const { User } = await connect();

      if (await User.count()) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const newUser = {
        email: req.body.email,
        password: await hash(req.body.password, 8),
      };

      return res.status(201).json(await User.create(newUser).catch(errCatcher));
    },
  };

  const response = handleReq[method];

  if (response) return response(req, res);

  return res.status(405).json({ error: "Method not allowed" });
};

export default handler;
