import { NextApiRequest, NextApiResponse } from "next";

import { connect } from "@/utils/connection";
import { ResponseFunctions } from "@/utils/types";
import schemaValidator from "@/utils/schemaValidator";
import authValidator from "@/utils/authValidator";
import { updateProjectSchema } from "@/utils/schemas";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const method = req.method as keyof ResponseFunctions;

  const errCatcher = (error: Error) => res.status(400).json({ error });

  const handleReq: ResponseFunctions = {
    GET: async (req: NextApiRequest, res: NextApiResponse) => {
      const { projectId: id } = req.query;

      const { Project } = await connect();

      return res.json(await Project.findById(id).catch(errCatcher));
    },
    PATCH: async (req: NextApiRequest, res: NextApiResponse) => {
      if (!(await authValidator(req))) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const { projectId: id } = req.query;

      const { Project } = await connect();

      const validatedProject = await schemaValidator(updateProjectSchema)(
        req,
        res
      );

      if (validatedProject) {
        const updatedProject = await Project.findByIdAndUpdate(
          id,
          validatedProject,
          {
            new: true,
          }
        ).catch(errCatcher);

        if (updatedProject) {
          return res.json(updatedProject);
        }

        return res.status(404).json({ message: "Project not found" });
      }
    },
    DELETE: async (req: NextApiRequest, res: NextApiResponse) => {
      if (!(await authValidator(req))) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const { projectId: id } = req.query;

      const { Project } = await connect();

      const deletedProject = await Project.findByIdAndDelete(id);

      if (!deletedProject) {
        return res.status(404).json({ message: "Project not found" });
      }

      return res.status(204).json({});
    },
  };

  const response = handleReq[method];

  if (response) return response(req, res);

  return res.status(405).json({ error: "Method not allowed" });
};

export default handler;
