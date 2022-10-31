import { createRouter, createWebHistory } from "vue-router";
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import DashboardView from '../views/DashboardView.vue'
import SurveysView from '../views/SurveysView.vue'
import CreateEditSurvey from '../views/CreateEditSurvey.vue'
import NavBar from '../components/layouts/NavBar.vue'
import SurveyPublicView from '../views/SurveyPublicView.vue'
import ProfileView from '../views/ProfileView.vue';
import { useUserStore } from "../stores/userStore";



const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/dashboard',
      component: NavBar,
      name:'default',
      meta: {requiresAuth: true},
      // children pour definir une router-view
      children: [
        { path: '/dashboard', name: 'dashboard', component: DashboardView },
        { path: '/surveys', name: 'surveys', component: SurveysView },
        { path: '/surveys/create', name: 'createSurvey', component: CreateEditSurvey },
        { path: '/surveys/:id', name: 'showSurvey', component: CreateEditSurvey },
        { path: '/profile', name: 'profile', component: ProfileView },
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: {isGuest: true}
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      meta: {isGuest: true}
    },
    {
      path: '/view/survey/:slug',
      name: 'survey_public_view',
      component: SurveyPublicView,
    },
  ]
})


//middleware
router.beforeEach((to, from, next) => {
  // to and from are both route objects. must call `next`.
  const userStore = useUserStore()
  if (to.meta.requiresAuth && !userStore.$state.user.data) {
    next({name: 'login'})
  } else if (userStore.$state.user.data && to.meta.isGuest){
    next({name: 'dashboard'});
  } else {
    next();
  }
})

export default router
