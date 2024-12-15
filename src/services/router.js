import { Router } from "@vaadin/router";

const outlet = document.querySelector("#outlet"); // Ana kapsayıcı
const router = new Router(outlet);

router.setRoutes([
  { path: "/", component: "home-page" },
  { path: "/add", component: "add-page" },
  { path: "(.*)", redirect: "/" }, // 404 için yönlendirme
]);

export { router };
