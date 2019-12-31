import React, { useState } from 'react';

export const initialState = {
  activeTab: 'query'
};

export function useRequestManagerState(initialState) {
  const [activeTab, selectTab] = useState(initialState.activeTab);

  return { activeTab, selectTab };
};

export default React.createContext(null);