import { Router } from "@vaadin/router";

const outlet = document.querySelector("#outlet"); 
const router = new Router(outlet);

router.setRoutes([
  { path: "/", component: "home-page" },
  { path: "/add", component: "add-page" },
  { path: "(.*)", redirect: "/" }, 
]);

export { router };
