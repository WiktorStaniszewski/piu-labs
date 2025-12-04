export class Ajax {
   constructor(options = {}) {
      this.defaults = {
         baseURL: options.baseURL || '',

         headers: { 
            'Content-Type': 'application/json',
            ...(options.headers || {})
         },

         timeout: options.timeout || 5000
      }
   }
   async request(method, url, data = null, options={}) {
      const controller = new AbortController()
      const timeout = options.timeout || this.defaults.timeout

      const id = setTimeout(() => controller.abort(), timeout)

      const fullURL = (options.baseURL || this.defaults.baseURL) + url

      const headers = {
         ...this.defaults.headers,
         ...(options.headers || {})
      }

      const fetchOptions = {
         method,
         headers,
         signal: controller.signal
      }

      if (data) {
         fetchOptions.body = JSON.stringify(data)
      }

      let response

      try {
         response = await fetch(fullURL, fetchOptions)
      } 
      catch (err) {
         clearTimeout(id)
         if (err.name === 'AbortError') {
            throw new Error(`Timeout ${timeout} ms`)
         }
         throw new Error(`Network error: ${err.message}`)
      }

      clearTimeout(id)

      if (!response.ok) {
            const text = await response.text().catch(() => "")
            throw new Error(
                `HTTP Error ${response.status}: ${response.statusText} — ${text}`
            )
        }

      try {
         return await response.json()
      } 
      catch {
         return null
      }
   }


   async get(url, options) {
      return this.request("GET", url, null, options)
   }
   async post(url, data, options) {
      return this.request("POST", url, data, options) 
   }
   async put(url, data, options) {
      return this.request("PUT", url, data, options) 
   }
   async delete(url, options) {
      return this.request("DELETE", url, null, options)      
   }
}

