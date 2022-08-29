export interface ResponseFunctions {
  GET?: Function;
  POST?: Function;
  PATCH?: Function;
  DELETE?: Function;
}

export interface Tech {
  _id: string;
  name: string;
  imgUrl: string;
  docUrl: string;
  skillLevel: "beginner" | "intermediate" | "advanced";
}
