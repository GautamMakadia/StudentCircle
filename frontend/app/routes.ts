import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    
    route("/login", "./auth/login"),
    route("/signup", "./signup.tsx")
] satisfies RouteConfig;
