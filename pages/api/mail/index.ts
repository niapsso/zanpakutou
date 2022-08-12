import { NextApiRequest, NextApiResponse } from "next";

import sendMail from "@/utils/sendMail";
import { ResponseFunctions } from "@/utils/types";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const method = req.method as keyof ResponseFunctions;

  const handleReq: ResponseFunctions = {
    POST: async (req: NextApiRequest, res: NextApiResponse) => {
      return res.json(
        await sendMail(req.body).catch((error) =>
          res.status(400).json({ error })
        )
      );
    },
  };

  const response = handleReq[method];

  if (response) return response(req, res);

  return res.status(405).json({ error: "Method not allowed" });
};

export default handler;
