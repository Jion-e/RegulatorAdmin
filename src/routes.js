const Login = resolve => require(['./pages/login.vue'], resolve)
const Main = resolve => require(['./pages/main.vue'], resolve)

const ExposureList = resolve => require(['./pages/exposure_list.vue'], resolve)
const ExposureAdd = resolve => require(['./pages/exposure_add.vue'], resolve)
const NewsList = resolve => require(['./pages/news_list.vue'], resolve)
const NewsAdd = resolve => require(['./pages/news_add.vue'], resolve)
const NewsEdit = resolve => require(['./pages/news_edit.vue'], resolve)
const NewsView = resolve => require(['./pages/news_view.vue'], resolve)
const ComplainList = resolve => require(['./pages/complain_list.vue'], resolve)

const routes = [
  // {path: '*', name: '错误', component: Login},
  {path: '/Login', name: '登录', component: Login},
  {path: '/Main', name: '后台界面', component: Main,
    children: [
      {path: '/NewsList', name: '热点新闻列表', component: NewsList},
      {path: '/NewsAdd', name: '添加热点新闻', component: NewsAdd},
      {path: '/NewsEdit/:id', name: '编辑热点新闻', component: NewsEdit},
      {path: '/NewsView/:id', name: '热点新闻详情', component: NewsView},
      {path: '/ExposureList', name: '质量曝光列表', component: ExposureList},
      {path: '/ExposureAdd', name: '添加质量曝光', component: ExposureAdd},
      {path: '/ComplainList', name: '质量投诉列表', component: ComplainList}
    ]
  },
  {path: '*', redirect: '/Login'}
]

export default routes
