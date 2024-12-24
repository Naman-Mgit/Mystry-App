import NextAuth from "next-auth";
import { authOptions } from "./options";

const handler=NextAuth(authOptions);
//Todo why did we use get and post ask in chatgpt later
export {handler as GET,handler as POST};