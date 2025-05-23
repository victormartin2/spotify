import { createRouter, createWebHistory } from "vue-router"
import HomeView from "../views/HomeView.vue"
import SearchView from "../views/SearchView.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/search",
      name: "search",
      component: SearchView,
    },
    {
      path: "/library",
      name: "library",
      component: () => import("../views/LibraryView.vue"),
    },
  ],
})

export default router
