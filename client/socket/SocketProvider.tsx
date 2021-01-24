import * as React from "react";
import { useSocketInitialisation, SocketContext } from "./useSocket";

const SocketProvider: React.FC<{}> = ({ children }) => {
  const socket = useSocketInitialisation();
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export default SocketProvider;
