export const DashboardRoutes = {
  base: '/dashboard',
  towers: { value: '/towers/', withIndicator: '/towers/:projectId' },
  building: { value: '/building/', withIndicator: '/building/:towerId' },
  areas: { value: '/areas/', withIndicator: '/areas/:towerId' },
  areasAdditional: {
    value: '/areas-additional/',
    withIndicator: '/areas-additional/:towerId',
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
  contracts: { value: '/contract/', withIndicator: '/contract/:towerId' },
  contractsFlow: {
    value: '/contract-flow/',
    withIndicator: '/contract-flow/:towerId',
  },
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

export const ContractFlowRoutes = {
  base: DashboardRoutes.contractsFlow,
};

export const ProjectRoutes = {
  base: '/projects',
};

export const AreasAndPrices = {
  array: [
    DashboardRoutes.base + DashboardRoutes.building.value,
    DashboardRoutes.base + DashboardRoutes.areas.value,
    DashboardRoutes.base + DashboardRoutes.areasAdditional.value,
    DashboardRoutes.base + DashboardRoutes.pairing.value,
    DashboardRoutes.base + DashboardRoutes.prime.value,
    DashboardRoutes.base + DashboardRoutes.clustering.value,
  ],
};

export const InitialData = {
  array: [DashboardRoutes.base + DashboardRoutes.schedule.value],
};

export const Increments = {
  array: [
    DashboardRoutes.base + DashboardRoutes.increments.value,
    DashboardRoutes.base + DashboardRoutes.strategy.value,
  ],
};

export const SalesSpeed = {
  array: [DashboardRoutes.base + DashboardRoutes.futureSalesSpeed.value],
};

export const SalesRoom = {
  array: [
    DashboardRoutes.base + DashboardRoutes.clients.value,
    DashboardRoutes.base + DashboardRoutes.saleRequests.value,
  ],
};

export const Reports = {
  array: [
    DashboardRoutes.base + DashboardRoutes.summary.value,
    DashboardRoutes.base + DashboardRoutes.rackAreas.value,
    DashboardRoutes.base + DashboardRoutes.detailAdmin.value,
    DashboardRoutes.base + DashboardRoutes.detail.value,
    DashboardRoutes.base + DashboardRoutes.report.value,
    DashboardRoutes.base + DashboardRoutes.cashFlow.value,
  ],
};

export const Contracts = {
  array: [DashboardRoutes.base + ContractRoutes.base.value],
};

export const ContractFlow = {
  array: [DashboardRoutes.base + ContractFlowRoutes.base.value],
};

export const UserRoutes = {
  base: DashboardRoutes.base + DashboardRoutes.user,
  slideProjectsOnly: DashboardRoutes.base + ProjectRoutes.base,
  login: '/login',
  profile: '/profile',
  create: '/create',
  assignProjects: '/assignProjects',
};
