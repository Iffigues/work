import React, { createContext } from "react"
import { params } from "../../../params"
import socketIOClient from "socket.io-client"

export const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {
  const socketClient = socketIOClient(params.url);  
  const sendSocket = (type, data = false) => {
    console.log("sendSocket")
    console.log("sendSocket: [data =", data, "]")
    console.log("sendSocket: [type =", type, "]")
    console.log("sendSocket: [socketClient =", socketClient, "]")
    socketClient.emit(type, data);
  }
  
  return (
    <SocketContext.Provider
    value={{socketClient, sendSocket}}
    >
      { children }
    </SocketContext.Provider>
  )
}