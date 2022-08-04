function createHTTPHandler(baseURL: string) {
    return {
        get<T>(enpoint: string, options?: { [key: string]: any }) {
            return new Promise<T>(resolve => {
                const params = new URLSearchParams()

                if (options) {
                    for (const key in options) {
                        params.append(key, options[key])
                    }
                }

                const stringifiedParams = params.toString()

                const finalURL = `${baseURL}${enpoint}${stringifiedParams.length ? `?${stringifiedParams}` : ''}`

                fetch(finalURL)
                    .then(res => {
                        return res.json()
                    })
                    .then(res => resolve(res))
            })
        },
        post<T>(enpoint: string, body: { [key: string]: any }) {
            return new Promise<T>(resolve => {
                fetch(`${baseURL}${enpoint}`, {
                    method: 'POST',
                    body: JSON.stringify(body)
                })
                    .then(res => {
                        return res.json()
                    })
                    .then(res => resolve(res))
            })

        },
        put<T>(enpoint: string, body: { [key: string]: any }) {
            return new Promise<T>(resolve => {
                fetch(`${baseURL}${enpoint}`, {
                    method: 'PUT',
                    body: JSON.stringify(body)
                })
                    .then(res => {
                        return res.json()
                    })
                    .then(res => resolve(res))
            })

        },
        delete<T>(enpoint: string, body: { [key: string]: any }) {
            return new Promise<T>(resolve => {
                fetch(`${baseURL}${enpoint}`, {
                    method: 'DELETE',
                    body: JSON.stringify(body)
                })
                    .then(res => {
                        return res.json()
                    })
                    .then(res => resolve(res))
            })

        }
    }
}

export const HTTPHandler = createHTTPHandler(process.env.REACT_APP_BASE_URL as string)