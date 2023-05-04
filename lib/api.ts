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

    const data = json ? await res.json() : null
    return data
}

export const signup = (user) => {
    return fetcher({ url: '/api/signup', method: 'post', body: user })
}

export const signin = (user) => {
    return fetcher({ url: '/api/signin', method: 'post', body: user })
}

export const logout = () => {
    return fetcher({ url: '/api/logout', method: 'post' })
}