import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),

    route("/login", "./auth/login.tsx"),
    route("/signup", "./auth/signup.tsx")
] satisfies RouteConfig;
