import React from 'react'
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { Context as AlertContext } from "../../context/AlertContext";
import { Context as UserContext } from "../../context/UserContext";
import { Context as RoomsContext } from "../../context/RoomsContext";
import { SocketContext } from "../../context/SocketContext";
import { useContext, useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { useHistory } from 'react-router-dom'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const CheckBoxSolo = (props) => {
  const { wantJoinGame, playSolo, setPlaySolo } = props

  const handleChange = (event) => {
    console.log("playSolo", event.target.checked, playSolo)
    setPlaySolo(event.target.checked);
  };
  if (!wantJoinGame) {
    return (
      <FormControlLabel
        control={<Checkbox
          checked={playSolo}
          onChange={handleChange}
          color="primary"
          />}
        label="Jouer en solo ?"
      />
    )
  } else {
    return ''
  }
}

const SectionGames = (props) => {
  const [open, setOpen] = useState(false);
  const { state: { rooms } } = useContext(RoomsContext);
  const { wantJoinGame, roomSelected, setRoomSelected } = props

  const handleChange = (event) => {
    setRoomSelected(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  if (wantJoinGame) {
    if (!rooms || Object.keys(rooms).length === 0) {
      return (
        <Grid item xs={6}>
          Aucune partie n'est disponible pour le moment
        </Grid>
      )
    } else {
      return (
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          style={{width: '50%'}}
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={roomSelected}
          onChange={handleChange}
        >
          {
            Object.keys(rooms).map((item, key) => {
              return (
                <MenuItem
                  value={rooms[item].channel}>
                  {rooms[item].players
                    .map((player, index) => (!rooms[item].solo)
                      ? `${player.name}${(index !== rooms[item].players.length - 1) ? ', ' : ''}`
                      : ''
                    )
                  }
                </MenuItem>
              )
            })
          }
        </Select>
      )
    }
  } else {
    return '';
  }
}

const HomePage = () => {
  const { state: {uuidRoom} } = useContext(UserContext);
  const { state, sendAlert } = useContext(AlertContext);
  const { sendSocket } = useContext(SocketContext);
  const [roomSelected, setRoomSelected] = useState('');
  const [playSolo, setPlaySolo] = useState(false);
  const [login, setLogin] = useState('');
  const [wantJoinGame, setWantJoinGame] = useState(false);
  const history = useHistory()

  const createRoom = () => {
    if (!wantJoinGame) {
      console.log("playSolo", playSolo)
      sendSocket('server/create-room', { login, playSolo })
   } else {
      sendSocket('server/join-room', { channel: roomSelected, login })
    }
  }
  useEffect(() => {
    if (uuidRoom) {
      history.push(`/room/${uuidRoom}`)
    } else {
      history.push('/');
    }
  }, [uuidRoom])

  useEffect(
    () => {
      sendAlert('Soon, will be here a fantastic Tetris ...', 'info')
      sendSocket('server/ping')
      setTimeout(() => {
        sendAlert()
      }, 5000)
    }
    ,[])
  return (
    <div>
      <Container fixed>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <span>Bienvenu sur red-tetris</span>
            <TextField
              value={login}
              onInput={e => setLogin(e.target.value)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="Login"
              label="Login"
              type="Login"
              id="Login"
              autoComplete="current-login"
            />
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="contained"
              disabled={login.length === 0}
              onClick={() => { setWantJoinGame(!wantJoinGame) }}
              >
              Rejoindre une partie !
            </Button>
          </Grid>
          <SectionGames
            wantJoinGame={wantJoinGame}
            roomSelected={roomSelected}
            setRoomSelected={setRoomSelected}
          />
          <Grid item xs={6}>
              <CheckBoxSolo
                wantJoinGame={wantJoinGame}
                playSolo={playSolo}
                setPlaySolo={setPlaySolo}
              />
              <Button
                variant="contained"
                disabled={login.length === 0 || (wantJoinGame && !roomSelected)}
                color="primary"
                onClick={createRoom}
              >
                { wantJoinGame ? 'Rejoindre' : 'Crée une partie' }
              </Button>
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}

export default HomePage
