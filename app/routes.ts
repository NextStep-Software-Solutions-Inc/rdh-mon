import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/landing.tsx"),
    route("dashboard", "routes/dashboard.tsx"),
    route("encubations", "routes/encubations.tsx"),
    route("encubations/:encubationId", "routes/encubations-details.tsx"),
    route("detection", "routes/detection.tsx")
] satisfies RouteConfig;

