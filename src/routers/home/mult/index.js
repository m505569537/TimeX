import time from './time'
import date from './date'
import weather from './weather'
export default {
    path: '/mult',
    component: () => import('@/views/Mult'),
    children: [
        time,
        date,
        weather,
        { path: '/mult', redirect: '/time' }
    ]
}