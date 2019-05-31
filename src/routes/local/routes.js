export const DashboardRoutes = {
  base:'/dashboard',
  towers:  { value:'/towers/', withIndicator:  '/towers/:projectId'},
  building: { value: '/building/', withIndicator: '/building/:projectId/:towerId' },
  areas: { value: '/areas/', withIndicator: '/areas/:projectId/:towerId' },
  prime: { value: '/prime/', withIndicator: '/prime/:projectId/:towerId' },
  user: '/user',
  summary: { value: '/summary/', withIndicator: '/summary/:projectId/:towerId' },
  detailAdmin: { value: '/detailAdmin/' , withIndicator: '/detailAdmin/:projectId/:towerId' },
  detail: { value: '/detail/' , withIndicator: '/detail/:projectId/:towerId' },
  rackAreas: { value: '/rackAreas/' , withIndicator: '/rackAreas/:projectId/:towerId' }
}

export const ProjectRoutes = {
  base: '/projects',
}

export const UserRoutes = {
  login: '/login'
}