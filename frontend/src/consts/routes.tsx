import Classes from "../pages/Classes/Classes";
import Create from "../pages/Create/Create";
import Students from "../pages/Students/Students";

export const routes = [
    {
    path: "/",
    name: "classrooms",
    component: <Classes/>
    },
    {
        path: "/students",
        name: "students",
        component: <Students/>
    },
    {
        path: "/create",
        name: "create",
        component: <Create/>
    }
]