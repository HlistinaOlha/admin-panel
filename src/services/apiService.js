import { $api } from '@/services/service'
import axios from 'axios'

class BaseApiService {
  baseUrl = `http://${process.env.VUE_APP_HOST}${process.env.VUE_APP_BASE_PATH}`

  getUrl(endpoint) {
    return `${this.baseUrl}/${endpoint}`
  }

  createGetRequestParams = (queryParams = {}, headers) => {
    return {
      headers: headers,
      params: queryParams
    }
  }

  createBaseHeader = () => {
    return {
      'Content-Type': 'application/json',
    }
  }

  createAuthHeader = () => {
    return {
      'Authorization': `Basic ${$api.token.getToken()}`
    }
  }

  buildHeaders = (auth = true, customHeaders) => {
    let baseHeaders = {
      ...this.createBaseHeader(),
      ...customHeaders
    }

    return auth ? { ...baseHeaders, ...this.createAuthHeader() } : baseHeaders
  }

  handleErrors = (responseData, errorMessage) => {
    let errors = ''
    responseData.forEach((data, index) => {
      errors += data.message
      if (index !== responseData.length - 1) {
        errors += ','
      }
    })
    throw new Error(errors || errorMessage)
  }
}

class ReadOnlyApiService extends BaseApiService {

  async get(endpoint, queryParams, auth = true, customHeaders = {}) {
    let headers = this.buildHeaders(auth, customHeaders)

    try {
      const response = await axios.get(this.getUrl(endpoint), this.createGetRequestParams(queryParams, headers))
      return response.data
    } catch (error) {
      console.error(error)
      this.handleErrors(error.response.data, 'Failed to fetch')
    }
  }
}

class ModelApiService extends ReadOnlyApiService {

  async post(endpoint, data, customHeaders = {}, auth = true,  ) {
    let headers = this.buildHeaders(auth, customHeaders)
    try {
      return await axios.post(this.getUrl(endpoint), data, { headers: headers })
    } catch (error) {
      console.error(error)
      this.handleErrors(error.response.data, 'Could not save data')
    }
  }

  async put(endpoint, data, auth = true, customHeaders = {}) {
    let headers = this.buildHeaders(auth, customHeaders)
    try {
      await axios.put(this.getUrl(endpoint), data, { headers: headers })
    } catch (error) {
      console.error(error)
      this.handleErrors(error.response.data, 'Could not save data')
    }
  }

  async delete(endpoint, data, auth = true, customHeaders = {}) {
    let headers = this.buildHeaders(auth, customHeaders)
    try {
      await axios.delete(this.getUrl(endpoint), { headers: headers })
    } catch (error) {
      console.error(error)
      this.handleErrors(error.response.data, 'Could not delete data')
    }
  }
}

class GraphqlApiService extends BaseApiService {

  async get(endpoint, data, auth = true, customHeaders = {}) {
    let headers = this.buildHeaders(auth, customHeaders)
    try {
      const response = await axios.post(this.getUrl(endpoint), data, { headers: headers })
      return response.data
    } catch (error) {
      console.error(error)
      this.handleErrors(error.response.data, 'Failed to fetch')
    }
  }
}

export { ModelApiService, ReadOnlyApiService, GraphqlApiService }
