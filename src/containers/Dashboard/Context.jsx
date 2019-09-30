import React from 'react';

const DashboardContext = React.createContext({});

export const DashboardProvider = DashboardContext.Provider;
export const DashboardConsumer = DashboardContext.Consumer;

export default DashboardContext;
