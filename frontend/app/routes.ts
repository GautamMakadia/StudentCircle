import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("./home/Home.tsx"),

    route("login", "./auth/Login.tsx"),
    route("signup", "./auth/Register.tsx"),

    route("student/dashboard", "./student/dashboard.tsx"),
    route("teacher/dashboard", "./teacher/dashboard.tsx")
] satisfies RouteConfig;
