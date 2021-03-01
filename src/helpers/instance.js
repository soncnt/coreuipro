const axios = require('axios');

//get token o localStorage
function getLocalToken() {
    const token = window.localStorage.getItem('token')
    console.log('token >>>', token);
    return token
}

//get token o refreshToken
function getLocalRefreshToken() {
    const token = window.localStorage.getItem('refreshToken')
    return token
}

//cau hinh axios
const instance = axios.create({
    baseURL: 'http://localhost:3000/',
    timeout: 300000,
    headers: {
        'Content-Type': 'application/json',
    }
})

instance.setToken = (token) => {
    instance.defaults.headers['x-access-token'] = token
    window.localStorage.setItem('token', token)
}

function getToken() {
    return instance.post('/login', {
        username: 'anonystick.com',
        password: 'anonystick.com',
    })
}

function refreshToken () {
    return instance.post('/token',{
        refreshToken: getLocalRefreshToken()
    })
}


function getDataWithAuto() {
    return instance.get('/users',{
        params: {
            auto: 'yes',
        },
        headers: {
            'x-access-token': getLocalToken() // headers token
        }

    })
}

function getDataWithOutAuto() {
    return instance.get('/users',{
        params: {
            auto: 'no'
        },
        headers: {
            'x-access-token': getLocalToken() // headers token
        }
    })
}

// getToken();

// response parse
instance.interceptors.response.use((response) => {
    
    const {code, auto} = response.data
    if (code === 401) {
        if(auto === 'yes'){

            console.log('get new token using refresh token', getLocalRefreshToken())
            return refreshToken().then(rs => {
                console.log('get token refreshToken>>', rs.data)
                const { token } = rs.data
                instance.setToken(token);
                const config = response.config
                config.headers['x-access-token'] = token
                config.baseURL = 'http://localhost:3000/'
                return instance(config)

            })
        }
    }
    return response
}, error => {
    console.warn('Error status', error.response.status)
    // return Promise.reject(error)
    if (error.response) {
        return error.response.data;
    } else {
        return Promise.reject(error)
    }
})


//click login de lay token va refreshtoken

function btn_get_token() {
    getToken().then(res => {
        const { status, token, refreshToken } = res.data
        if (status === 'Logged in') {
            window.localStorage.setItem('token', token)
            window.localStorage.setItem('refreshToken', refreshToken)
            return token;
            // console.log(res.data);
        }
    })
}
function btn_get_data_with_auto() {
    getDataWithAuto().then(res => {
        const {code, message, elements} = res.data
        return res;
    })
}

function btn_get_data_without_auto() {
    getDataWithOutAuto().then(res => {
        console.log('click get data btn_get_data_without_auto>>>', res.data);
        const {code, message, elements} = res.data
        if(code === 403){
            return message
        }
        if(code === 401){
            return message
        }

        return message
    })
}
 

// getToken();
export default instance


console.log('hello');