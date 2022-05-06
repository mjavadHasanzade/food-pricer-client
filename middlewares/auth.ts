const jwt = require("jsonwebtoken");
interface IResult {
  token?: string;
}
const authMiddleware = (cookie: string) => {
  let strs = cookie.split("; ") || "";
  const result: IResult = {};

  for (let i in strs) {
    const cur = strs[i].split("=");
    //@ts-ignore
    result[cur[0]] = cur[1];
  }

  if (result["token"]) {
    try {
      const user = jwt.verify(result["token"], "isUserAuthenticated");
      return { auth: true, user, token: result["token"], cookies: result };
    } catch (error) {
      return { auth: false, user: {}, token: result["token"], cookies: result };
    }
  }

  return { auth: false, token: "", cookies: result };
};

export default authMiddleware;
