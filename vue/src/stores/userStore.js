import { defineStore } from "pinia";
import  axiosClient  from "../axiosClient";

export const useUserStore = defineStore('user', {
  state: () => ({
    user: {
      data: localStorage.getItem('auth'),
      //token: sessionStorage.getItem('TOKEN'),
      token: null,
    },
    authenticated: false
    //completed: false
  }),
  actions: {
    unSetUser () {
      localStorage.removeItem('auth')
      this.user.data = null
      this.authenticated = false
      this.user.token = null

    },

    async logout () {
      await axiosClient.get('sanctum/csrf-cookie')
      return axiosClient.post('api/logout')
              .then((result) => {
                this.unSetUser()
                location.reload()
                return result
              })
    },
    setUser (userData){
      localStorage.setItem('auth', JSON.stringify(userData.user))
      this.user.data = userData.user
      this.authenticated = true
      this.user.token = userData.token
      //sessionStorage.setItem("TOKEN", userData.token)
    },

    async register(user){
      await axiosClient.get('sanctum/csrf-cookie')
      return axiosClient.post('register', user)
      .then(({data}) => {
        this.setUser(data)
        return data
      })
    },

    async login (user) {
      await axiosClient.get('sanctum/csrf-cookie')
      return axiosClient.post('login', user)
          .then(({data}) => {
            this.setUser(data)
            return data
          })
    },

    async initialyzeUser(){
      await axiosClient.get('sanctum/csrf-cookie')
      return axiosClient.get('api/user').then(({data}) => {
        this.setUser(data)
      }).catch((err) => {
        this.unSetUser()
        // console.log(err);
        //console.clear()
      })
      // console.log(1);
    }
  },



})
