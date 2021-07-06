import React from "react";

const AppModeContext = React.createContext({appMode: false, setAppMode: (appMode: boolean) => {}});

export default AppModeContext;