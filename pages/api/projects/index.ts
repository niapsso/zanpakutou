import { NextApiRequest, NextApiResponse } from "next";

import authValidator from "@/utils/authValidator";
import { connect } from "@/utils/connection";
import { createProjectSchema } from "@/utils/schemas";
import schemaValidator from "@/utils/schemaValidator";
import { ResponseFunctions } from "@/utils/types";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const method = req.method as keyof ResponseFunctions;

  const errCatcher = (error: Error) => res.status(400).json({ error });

  const handleReq: ResponseFunctions = {
    GET: async (req: NextApiRequest, res: NextApiResponse) => {
      const { Project } = await connect();

      return res.json(await Project.find({}).lean().catch(errCatcher));
    },
    POST: async (req: NextApiRequest, res: NextApiResponse) => {
      if (!(await authValidator(req))) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const { Project } = await connect();

      const newProject = await schemaValidator(createProjectSchema)(req, res);

      if (newProject) {
        return res
          .status(201)
          .json(await Project.create(newProject).catch(errCatcher));
      }
    },
  };

  const response = handleReq[method];

  if (response) return response(req, res);

  return res.status(405).json({ error: "Method not allowed" });
};

export default handler;
