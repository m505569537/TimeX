import ajax from './ajax'

// 用户注册接口
export const reqRegister = (user) => ajax('/register', user, 'POST')

// 用户登录接口
export const reqLogin = (user) => ajax('/login', user, 'POST')

// 用户自动登陆接口
export const reqAutoLogin = (userid) => ajax('/autologin', userid, 'POST')

// 天气信息接口
export const reqWeather = (cityId) => ajax('http://freecityid.market.alicloudapi.com/whapi/json/alicityweather/briefforecast3days',{},'POST',{ 
    headers:{
        Authorization:'APPCODE 7a3c2065c1d642569566dba45becace0'
    },
    params: cityId
})

// 读取xml文件
export const reqXml = () => ajax('cities.xml')

// 添加账单记录
export const addAccount = (record) => ajax('/addaccount', record, 'POST')

// 删除账单记录
export const deleteAccount = (_id) => ajax('/deleteaccount',_id, 'POST')

// 查询账单记录
export const reqAccount = (userid) => ajax('/getaccount',userid, 'POST')

// 添加收藏/更新收藏
export const addCollect = (info) => ajax('/addcollect',info,'POST')

// 查询收集箱
export const reqCollect = (userid) => ajax('/getcollect', userid, 'POST')