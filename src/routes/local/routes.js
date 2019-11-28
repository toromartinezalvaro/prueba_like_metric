export const DashboardRoutes = {
  base: '/dashboard',
  towers: { value: '/towers/', withIndicator: '/towers/:projectId' },
  building: { value: '/building/', withIndicator: '/building/:towerId' },
  areas: { value: '/areas/', withIndicator: '/areas/:towerId' },
  areasAdditional: {
    value: '/areasAdditional/',
    withIndicator: '/areasAdditional/:towerId',
  },
  prime: { value: '/prime/', withIndicator: '/prime/:towerId' },
  user: '/user',
  summary: { value: '/summary/', withIndicator: '/summary/:towerId' },
  detailAdmin: {
    value: '/detailAdmin/',
    withIndicator: '/detailAdmin/:towerId',
  },
  detail: { value: '/detail/', withIndicator: '/detail/:towerId' },
  rackAreas: { value: '/rackAreas/', withIndicator: '/rackAreas/:towerId' },
  clustering: { value: '/clustering/', withIndicator: '/clustering/:towerId' },
  increments: { value: '/increments/', withIndicator: '/increments/:towerId' },
  strategy: { value: '/strategy/', withIndicator: '/strategy/:towerId' },
  salesRoom: { value: '/salesRoom/', withIndicator: '/salesRoom/:towerId' },
  salesRoomClient: {
    value: '/salesRoom/',
    withIndicator: '/salesRoom/:towerId/:clientId',
  },
  clients: { value: '/clients/', withIndicator: '/clients/:towerId' },
  futureSalesSpeed: {
    value: '/futureSalesSpeed/',
    withIndicator: '/futureSalesSpeed/:towerId',
  },
  schedule: { value: '/schedule/', withIndicator: '/schedule/:towerId' },
  report: { value: '/report/', withIndicator: '/report/:towerId' },
  contracts: '/contracts',
  cashFlow: { value: '/cash-flow/', withIndicator: '/cash-flow/:towerId' },
  saleRequests: {
    value: '/sale-requests/',
    withIndicator: '/sale-requests/:towerId',
  },
  saleRequestsWithId: {
    value: '/sale-requests/',
    withIndicator: '/sale-requests/:towerId/:id',
  },
  pairing: {
    value: '/pairing/',
    withIndicator: '/pairing/:towerId',
  },
};

export const ContractRoutes = {
  base: DashboardRoutes.contracts,
};

export const ProjectRoutes = {
  base: '/projects',
};

export const UserRoutes = {
  base: DashboardRoutes.base + DashboardRoutes.user,
  slideProjectsOnly: DashboardRoutes.base + ProjectRoutes.base,
  login: '/login',
  profile: '/profile',
  create: '/create',
  assignProjects: '/assignProjects',
};
