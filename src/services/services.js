import compose from "lodash/fp/compose"
import axios from 'axios'
import agent from '../config/config'


class Services { 
    constructor(delegate) {
      this.axios = axios
      this.delegate = delegate
      this.setupAuthentication()
    }

    post(url, data, config) {
      console.log("url 🐒", url)
      return this.axiosPromise(this.axios.post(url, data, config))
    }

    put(url, data, config) {
      console.log("url 🐒", url)
      return this.axiosPromise(this.axios.put(url, data, config))
    }

    get(url, data, config) {
      console.log("url 🐒", url)
      return this.axiosPromise(this.axios.get(url, data, config))
    }

    delete(url, data, config) {
      console.log("url 🐒", url)
      return this.axiosPromise(this.axios.delete(url, data, config))
    }

    axiosPromise(promise) {
      return new Promise( (resolve, reject) => {
          promise.then(response => {
            console.log("DONE -->", response)
            resolve(response)
          })
          .catch(error => {
            if (error.response && error.response.status === 401 && this.delegate.excecuteNoAuthorization) {
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