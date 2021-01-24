import { SIGN_IN, WELCOME_USER } from "../../server/handshake/constants";
import { useEffect } from "react";

const handleRegister = (
  socket: SocketIOClient.Socket,
  setUser: React.Dispatch<React.SetStateAction<{ name: string; id: string }>>
) => {
  socket.on(SIGN_IN, () => {
    console.log("We need to sign in.");
    window.localStorage.removeItem("userId");

    setUser({ name: "", id: "" });
  });
  socket.on(WELCOME_USER, (userInfo: any) => {
    if (!window.localStorage.getItem("userId")) {
      window.localStorage.setItem("userId", userInfo.id);
    }
    setUser(userInfo);
  });
};

export const useRegistration = (
  socket: SocketIOClient.Socket | undefined,
  setUser: any
) => {
  useEffect(() => {
    if (socket) {
      handleRegister(socket, setUser);
    }
  }, [socket?.id]);
};

export const getUserId = () =>
  window.localStorage.getItem("userId") || `Undefined User`;

export default handleRegister;
