
export const DashboardRoutes = {
  base:'/dashboard',
  towers:  { value:'/towers/', withIndicator:  '/towers/:projectId'},
  building: { value: '/building/', withIndicator: '/building/:towerId' },
  areas: { value: '/areas/', withIndicator: '/areas/:towerId' },
  prime: { value: '/prime/', withIndicator: '/prime/:towerId' },
  user: '/user',
  summary: { value: '/summary/', withIndicator: '/summary/:towerId' },
  detailAdmin: { value: '/detailAdmin/' , withIndicator: '/detailAdmin/:towerId' },
  detail: { value: '/detail/' , withIndicator: '/detail/:towerId' },
  rackAreas: { value: '/rackAreas/' , withIndicator: '/rackAreas/:towerId' },
  clustering: { value: '/clustering/' , withIndicator: '/clustering/:towerId' },
  increments: { value: '/increments/' , withIndicator: '/increments/:towerId' }
  strategy: { value: '/strategy/' , withIndicator: '/strategy/:towerId' }
}

export const ProjectRoutes = {
  base: '/projects',
}

export const UserRoutes = {
  base: DashboardRoutes.base + DashboardRoutes.user,
  login: '/login',
  profile: '/profile',
  create: '/create'
}