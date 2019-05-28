export const DashboardRoutes = {
  base:'/dashboard',
  towers:  { value:'/towers/', withIndicator:  '/towers/:projectId'},
  building: { value: '/building/', withIndicator: '/building/:towerId' },
  areas: { value: '/areas/', withIndicator: '/areas/:towerId' },
  prime: { value: '/prime/', withIndicator: '/prime/:towerId' },
  user: '/user',
  summary: { value: '/summary/', withIndicator: '/summary/:projectId/:towerId' },
  detailAdmin: { value: '/detailAdmin/' , withIndicator: '/detailAdmin/:towerId' },
  detail: { value: '/detail/' , withIndicator: '/detail/:towerId' }

}

export const ProjectRoutes = {
  base: '/projects',
}

export const UserRoutes = {
  login: '/login'
}