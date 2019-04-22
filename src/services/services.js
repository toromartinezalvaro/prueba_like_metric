import compose from "lodash/fp/compose"
import axios from 'axios'
import agent from '../config/config'


class Services { 
    constructor(delegate) {
      this.axios = axios
      this.delegate = delegate
      this.setupAuthentication()
    }

    post(...args) {
      return this.axiosPromise(this.axios.post(args))
    }

    put(...args) {
      return this.axiosPromise(this.axios.put(args))
    }

    get(...args) {
      return this.axiosPromise(this.axios.get(args))
    }

    axiosPromise(promise) {
      console.log("axiosPromise -->")
      return new Promise( (resolve, reject) => {
          promise.then(response => {
            console.log("DONE -->", response)
            resolve(response)
          })
          .catch(error => {
            if (error.response.status === 401 && this.delegate.excecuteNoAuthorization) {
              console.log("error === 401")
              this.delegate.excecuteNoAuthorization()
            }
            console.log("error -->", error.response.status)
            reject(error)
          })
      })
    }   
    
    setupAuthentication() {
      const currentToken = agent.currentToken
      if (currentToken !== undefined && currentToken !== "") {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + currentToken
        axios.defaults.withCredentials = true
        console.log("headers -->", axios.defaults.headers)
      } else {
        axios.defaults.headers.common['Authorization'] = ''
      }
    }
}

export default Services