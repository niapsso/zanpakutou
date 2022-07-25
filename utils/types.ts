export interface ResponseFunctions {
  GET?: Function;
  POST?: Function;
  PATCH?: Function;
  DELETE?: Function;
}

export interface Tech {
  _id: number;
  name: string;
  imgUrl: string;
  skillLevel: "beginner" | "intermediate" | "advanced";
}

export interface User {
  _id: number;
  email: string;
  password: string;
  techs: Tech[];
}
