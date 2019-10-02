import React, { createContext, useState } from 'react';
import Agent from './config/config';

const Context = createContext();

const Provider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(
    () => Agent.currentToken !== null && Agent.currentUser !== null,
  );
  const [isBadgeIncrement, setIsBadgeIncrement] = useState(false);
  const value = {
    isAuth,
    activateAuth: (user) => {
      console.log('isAuth callingFunction');
      Agent.saveUser(user);
      setIsAuth(true);
    },
    isBadgeIncrement,
    activateBadgeIncrement: (showBadge) => setIsBadgeIncrement(showBadge),
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export default {
  Shared: Context,
  Provider,
  Consumer: Context.Consumer,
};
