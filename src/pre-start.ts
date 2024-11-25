import path from "path";
import dotenv from "dotenv";
import { parse } from "ts-command-line-args";

//types
interface IArgs {
  env: string;
}

//setup

const args = parse<IArgs>({
  env: {
    type: String,
    defaultValue: "development",
    alias: "e",
  },
});

//set env file
const result2 = dotenv.config({
  path: path.join(__dirname, `../env/${args.env}.env`),
});
if (result2.error) {
  throw result2.error;
}

