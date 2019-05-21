import collect from './collect'
import plugin from './plugin'
import potato from './potato'
export default {
    path: '/todolist',
    component: () => import('@/views/Todolist'),
    children: [
        collect,
        plugin,
        potato,
        { path: '/todolist', redirect: '/collections' }
    ]
}