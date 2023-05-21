import React from 'react';

import cl from './Wrapper.module.scss';

export const Wrapper = ({ children }) => {
  return <div className={cl.Wrapper}>{children}</div>;
};
