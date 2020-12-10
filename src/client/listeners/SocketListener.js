import { useEffect, useContext } from 'react';
import { Context as UserContext } from "../context/UserContext";
import { Context as RoomsContext } from "../context/RoomsContext";

export default (socketClient) => {
  const {
    updateUuidRoom,
    updatePlayer
  } = useContext(UserContext);

  const {
    updateRooms
  } = useContext(RoomsContext);

  useEffect(() => {
    socketClient.on('client/ping', () => { console.log("ping") })

    socketClient.on('client/pong', () => { console.log("pong") })

    socketClient.on('client/created-room', (data) => {
      console.log('created-room', data)
      const { uuidRoom, player } = data;
      updateUuidRoom(uuidRoom)
      console.log("player", player)
      updatePlayer(player)
    })

    socketClient.on('client/update-user', (data) => {
      const { uuidRoom, player } = data;
      updateUuidRoom(uuidRoom)
      console.log("update user", player)
      updatePlayer(player)
    })

    socketClient.on('client/join-room', (data) => {
      console.log('join-room', data)
      const { uuidRoom, player } = data;
      updateUuidRoom(uuidRoom)
      updatePlayer(player)
    })

    socketClient.on('client/update-rooms', (rooms) => {
      updateRooms(rooms)
    })

    socketClient.on('client/start-game', () => {
      console.log('client/start-game')
    })

    return ;
  }, [])
}