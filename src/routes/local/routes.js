export const DashboardRoutes = {
  base:'/dashboard',
  towersProjectId:  '/towers/:projectId',
  towers:  '/towers/',
  building: { value: '/building/', withIndicator: '/building/:towerId' },
  areas: '/areas',
  user: '/user',
  prime: '/prime'
}

export const ProjectRoutes = {
  base: '/projects',
}

export const UserRoutes = {
  login: '/login'
}