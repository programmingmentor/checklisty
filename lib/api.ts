interface FetcherParams {
    url: string
    method: string
    body?: object
    json?: boolean
}

const fetcher = async ({ url, method, body, json = true }: FetcherParams) => {
    const res = await fetch(url, {
        method,
        body: body && JSON.stringify(body),
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    })
    // console.log(res)
    if (!res.ok) {
        throw new Error('API Error')
    }

    if (json) {
        const data = await res.json()
        return data
    }
}
export const signup = (user) => {
    // console.log(user)
    return fetcher({ url: '/api/signup', method: 'post', body: user })
}

export const signin = (user) => {
    return fetcher({ url: '/api/signin', method: 'post', body: user })
}