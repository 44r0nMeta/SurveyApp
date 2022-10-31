import { defineStore } from "pinia";
import axiosClient from "../axiosClient";


const tmpSurveys = [
  {
    id: 100,
    title: 'Survey About you',
    slug: 'survey-about-you',
    status:'draft',
    image:'https://freeonlinesurveys.com/wp-content/uploads/2020/02/Buy-Survey-Responses.png',
    description: 'A This is a survey about me',
    created_at: "2022-06-05 18:00:00",
    updated_at: "2022-06-05 18:00:00",
    expire_date: "2022-06-15 18:00:00",
    questions:[
      {
        id: 1,
        type: 'select',
        question: 'What is your favorite Prog Lang. ?',
        description: null,
        data: {
          options: [
            {
              uuid: 'c392bab8-e4c7-11ec-8fea-0242ac120002',
              text: 'JS'
            },
            {
              uuid: 'e051883c-e4c7-11ec-8fea-0242ac120002',
              text: 'PHP'
            },
            {
              uuid: 'f8a1a90b-bb9e-42d0-9564-c2a5f88e7214',
              text: 'Python'
            }
          ]
        }
      },
      {
        id: 2,
        type: 'radio',
        question: 'In wich country you are living ?',
        description: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...',
        data: {
          options: [
            {
              uuid: '4fc60760-e4c8-11ec-8fea-0242ac120002',
              text: 'Togo'
            },
            {
              uuid: '8c402554-e4c8-11ec-8fea-0242ac120002',
              text: 'Benin'
            },
            {
              uuid: 'a17a5e6c-e4c8-11ec-8fea-0242ac120002',
              text: 'America'
            }
          ]
        }
      },
      {
        id: 3,
        type: 'checkbox',
        question: 'Which backend Frameworks you master ?',
        description: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...',
        data: {
          options: [
            {
              uuid: '965e9ede-e4c9-11ec-8fea-0242ac120002',
              text: 'Laravel'
            },
            {
              uuid: 'a7f23836-e4c9-11ec-8fea-0242ac120002',
              text: 'Symphony'
            },
            {
              uuid: 'b1c9c144-e4c9-11ec-8fea-0242ac120002',
              text: 'Yii'
            }
          ]
        }
      },
      {
        id: 4,
        type: 'text',
        question: 'What Is your Hobby ?',
        description: null,
        data: {}
      },
      {
        id: 4,
        type: 'textarea',
        question: 'Give us subjection :)',
        description: 'Write ur opinions. Everything is anonymous.',
        data: {}
      }
    ]
  },
  {
    id: 200,
    title: 'Laravel 8',
    slug: 'laravel-8',
    status:'draft',
    image:'https://itanea.fr/apprendre-le-developpement-web/wp-content/uploads/2020/07/laravel-mark-red-type-black_w1280.png',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique a sunt minima expedita repellendus cupiditate provident? Incidunt, odio. Facilis labore doloremque dolores nulla inventore maxime, commodi fugit numquam sint modi.',
    created_at: "2022-06-05 18:00:00",
    updated_at: "2022-06-05 18:00:00",
    expire_date: "2022-06-15 18:00:00",
    questions:[
      {
        id: 1,
        type: 'select',
        question: 'What is your favorite Prog Lang. ?',
        description: null,
        data: {
          options: [
            {
              uuid: 'c392bab8-e4c7-11ec-8fea-0242ac120002',
              text: 'JS'
            },
            {
              uuid: 'e051883c-e4c7-11ec-8fea-0242ac120002',
              text: 'PHP'
            },
            {
              uuid: 'f8a1a90b-bb9e-42d0-9564-c2a5f88e7214',
              text: 'Python'
            }
          ]
        }
      },
      {
        id: 2,
        type: 'radio',
        question: 'In wich country you are living ?',
        description: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...',
        data: {
          options: [
            {
              uuid: '4fc60760-e4c8-11ec-8fea-0242ac120002',
              text: 'Togo'
            },
            {
              uuid: '8c402554-e4c8-11ec-8fea-0242ac120002',
              text: 'Benin'
            },
            {
              uuid: 'a17a5e6c-e4c8-11ec-8fea-0242ac120002',
              text: 'America'
            }
          ]
        }
      },
      {
        id: 3,
        type: 'checkbox',
        question: 'Which backend Frameworks you master ?',
        description: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...',
        data: {
          options: [
            {
              uuid: '965e9ede-e4c9-11ec-8fea-0242ac120002',
              text: 'Laravel'
            },
            {
              uuid: 'a7f23836-e4c9-11ec-8fea-0242ac120002',
              text: 'Symphony'
            },
            {
              uuid: 'b1c9c144-e4c9-11ec-8fea-0242ac120002',
              text: 'Yii'
            }
          ]
        }
      },
      {
        id: 4,
        type: 'text',
        question: 'What Is your Hobby ?',
        description: null,
        data: {}
      },
      {
        id: 4,
        type: 'textarea',
        question: 'Give us subjection :)',
        description: 'Write ur opinions. Everything is anonymous.',
        data: {}
      }
    ]
  },
  {
    id: 300,
    title: 'Symphony vs Laravel',
    slug: 'symphony-vs-laravel',
    status:'draft',
    image:'https://symfony.com/images/opengraph/symfony.png',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique a sunt minima expedita repellendus cupiditate provident? Incidunt, odio. Facilis labore doloremque dolores nulla inventore maxime, commodi fugit numquam sint modi. <br><br>For Updating',
    created_at: "2022-06-05 18:00:00",
    updated_at: "2022-06-05 18:00:00",
    expire_date: "2022-06-15 18:00:00",
    questions:[]
  },
  {
    id: 400,
    title: 'Vue Js 3',
    slug: 'vue-js-3',
    status:'draft',
    image:'https://res.cloudinary.com/practicaldev/image/fetch/s--q6AIFazN--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ll22z8mea106b4vjdjy7.jpeg',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique a sunt minima expedita repellendus cupiditate provident? Incidunt, odio. Facilis labore doloremque dolores nulla inventore maxime, commodi fugit numquam sint modi. <br><br>For Updating',
    created_at: "2022-06-05 18:00:00",
    updated_at: "2022-06-05 18:00:00",
    expire_date: "2022-06-15 18:00:00",
    questions:[
      {
        id: 1,
        type: 'select',
        question: 'What is your favorite Prog Lang. ?',
        description: null,
        data: {
          options: [
            {
              uuid: 'c392bab8-e4c7-11ec-8fea-0242ac120002',
              text: 'JS'
            },
            {
              uuid: 'e051883c-e4c7-11ec-8fea-0242ac120002',
              text: 'PHP'
            },
            {
              uuid: 'f8a1a90b-bb9e-42d0-9564-c2a5f88e7214',
              text: 'Python'
            }
          ]
        }
      },
      {
        id: 2,
        type: 'radio',
        question: 'In wich country you are living ?',
        description: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...',
        data: {
          options: [
            {
              uuid: '4fc60760-e4c8-11ec-8fea-0242ac120002',
              text: 'Togo'
            },
            {
              uuid: '8c402554-e4c8-11ec-8fea-0242ac120002',
              text: 'Benin'
            },
            {
              uuid: 'a17a5e6c-e4c8-11ec-8fea-0242ac120002',
              text: 'America'
            }
          ]
        }
      },
      {
        id: 3,
        type: 'checkbox',
        question: 'Which backend Frameworks you master ?',
        description: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...',
        data: {
          options: [
            {
              uuid: '965e9ede-e4c9-11ec-8fea-0242ac120002',
              text: 'Laravel'
            },
            {
              uuid: 'a7f23836-e4c9-11ec-8fea-0242ac120002',
              text: 'Symphony'
            },
            {
              uuid: 'b1c9c144-e4c9-11ec-8fea-0242ac120002',
              text: 'Yii'
            }
          ]
        }
      },
      {
        id: 4,
        type: 'text',
        question: 'What Is your Hobby ?',
        description: null,
        data: {}
      },
      {
        id: 4,
        type: 'textarea',
        question: 'Give us subjection :)',
        description: 'Write ur opinions. Everything is anonymous.',
        data: {}
      }
    ]
  },
]
export const useSurveyStore = defineStore('survey',{
  state: () => ({
    surveys: {
      loading: false,
      links: [],
      data: {}
    },
    questionTypes: ['text','select','radio','checkbox','textarea'],
    currentSurvey: {
      loading: false,
      data: []
    },
    notification: {
      show: false,
      type: null,
      message: null
    },

    dashboard: {
      loading: false,
      data: {}
    }
  }),

  actions: {
    async saveSurvey (survey) {
      delete survey.image_url
      let response
      await axiosClient.get('sanctum/csrf-cookie')
      if (survey.id) {
        response = axiosClient.put(`api/survey/${survey.id}`, survey).then((res) => {
          // this.surveys = [...this.$state.surveys,res.data]
          // console.log('store:', res.data);
          this.setCurrentSurvey(res.data)
          return res
        })
      } else {
        response = axiosClient.post('api/survey', survey).then((res) => {
          return res
        })
      }
      return response
    },

    deleteSurvey (idsurvey){
      return axiosClient.delete(`api/survey/${idsurvey}`)
    },

    // updateSurvey(survey) {
    //   this.$state.surveys = this.surveys.map((s) => {
    //     if (s.id == survey.data.id ) {
    //       return survey.data
    //     }
    //     return s
    //   })
    // },

    setCurrentSurveyLoading (value){
      this.currentSurvey.loading = value
    },
    setCurrentSurvey (data) {
      this.currentSurvey = data
    },

    setAllSurveysLoading(value) {
      this.$state.surveys.loading = value
    },
    setSurveys (surveys) {
      this.surveys.data = surveys.data
      this.surveys.links = surveys.meta.links
    },

    setDashboardLoading (value) {
      this.dashboard.loading = value
    },

    setDashboardData (data) {
      this.dashboard.data = data
    },

    // async getAllSurveys (url = null) {
    //   url = url || 'api/survey'
    //   this.setAllSurveysLoading(true)
    //   const result = await axiosClient.get(url);
    //   this.setAllSurveysLoading(false);
    //   this.setSurveys(result.data);
    //   return result;
    // },

    notify (message, type) {
      this.notification.show = true
      this.notification.message = message
      this.notification.type = type
      setTimeout(() => {
        this.notification.show = false
      }, 3000)
    },

    async saveSurveyAnswers (surveyId, answers) {
      await axiosClient.get('sanctum/csrf-cookie')
      console.log(surveyId);
      return axiosClient.post(`api/survey/${surveyId}/answer`, {answers})
    }
  },

  getters:{
    getSurvey (state) {
      return (idsurvey) => {
        state.setCurrentSurveyLoading(true)
        return axiosClient
                .get(`api/survey/${idsurvey}`)
                .then((result) => {
                  state.setCurrentSurvey(result.data)
                  state.setCurrentSurveyLoading(false)
                  return result
                })
                .catch((err) => {
                  state.setCurrentSurveyLoading(false)
                  throw err
                })
      }
    },

    getSurveyBySlug (state) {
      return (slug) => {
        state.setCurrentSurveyLoading(true)
        return axiosClient.get(`api/survey-by-slug/${slug}`)
                          .then((response) => {
                            state.setCurrentSurveyLoading(false)
                            state.setCurrentSurvey(response.data)
                            return response
                          })
                          .catch((err) => {
                            state.setCurrentSurveyLoading(false)
                            throw err
                          })
      }
    },

    getDashboardStatistic (state) {
      state.setDashboardLoading(true)

      axiosClient.get('api/dashboard').then((response) => {
        state.setDashboardData(response.data)
        state.setDashboardLoading(false)
        return response
      }).catch((error) => {
        state.setDashboardLoading(false)
        return error
      })
    },

    getAllSurveys (state) {
      return (url = null) =>  {
        url = url || 'api/survey'
        state.setAllSurveysLoading(true)
        return axiosClient.get(url).then(({data}) => {
          state.setAllSurveysLoading(false);
          state.setSurveys(data);
        }).catch((error) => {
          state.setAllSurveysLoading(false);
        })

      }
    },
  },
})
