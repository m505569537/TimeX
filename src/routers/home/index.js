import mult from './mult'
import hmain from './hmain'
import user from './user'
import account from './account'
import todolist from './todolist'
import collinfo from './collinfo'
export default {
    path: '/home',
    component: () => import('@/views/Home'),
    children: [
        hmain,
        mult,
        user,
        account,
        todolist,   
        collinfo,
        { path: '/home', redirect: '/hmain' }
    ]
}