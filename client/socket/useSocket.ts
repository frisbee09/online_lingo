import * as io from "socket.io-client";
import { useEffect, useState, createContext, useContext } from "react";

export const useSocketInitialisation = () => {
  const [socket, setSocket] = useState<SocketIOClient.Socket>();
  useEffect(() => {
    const savedSessionUserId = window.localStorage.getItem("userId");

    const newSocket = io.connect(
      `/${savedSessionUserId ? `?userId=${savedSessionUserId}` : ""}`
    );
    newSocket.on("connect", () => {
      console.log(`Connected with id ${newSocket.id}`);
      setSocket(newSocket);
    });

    return () => {
      socket?.disconnect();
      setSocket(undefined);
    };
  }, []);

  return socket;
};

export const SocketContext = createContext<SocketIOClient.Socket | undefined>(
  undefined
);

export const useSocket = () => {
  const socket = useContext(SocketContext);
  if (socket === undefined) {
    throw new Error(`useSocket must be called from inside a SocketProvider`);
  }

  return socket;
};
