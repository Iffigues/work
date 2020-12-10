import React from 'react';
import { useContext, useState, useEffect } from 'react';
import { withRouter } from 'react-router';
import _ from 'lodash'
import { Context as UserContext } from "../../context/UserContext";
import { Context as RoomsContext } from "../../context/RoomsContext";
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import KeyBoardListener from '../../listeners/KeyBoardListener'
import Button from '@material-ui/core/Button';
import { SocketContext } from "../../context/SocketContext";
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import Board from '../../components/board';

  const useStyles = makeStyles((theme) => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));
  const LeaveRoomButton = (props) => {
    const { uuidRoom, player, sendSocket } = props;
    const history = useHistory()

    const leaveRoom = () => {
      sendSocket('server/leave-room', { ...uuidRoom, uuidUser: player.uuid })
    }

    return (
      <Button
      variant="contained"
      color="primary"
      onClick={leaveRoom}
      >
      Quitter la partie
      </Button>
    )
  }

  const Room = (props) => {
    const { match } = props
    const classes = useStyles();
    const { state: { player } } = useContext(UserContext);
    const { state: { rooms } } = useContext(RoomsContext);
    const { sendSocket } = useContext(SocketContext);
    const [game, setGame] = useState(true);
    const { uuidRoom } = match.params;
    const history = useHistory()

    KeyBoardListener(game);
    if (!player || !rooms) {
      setGame(false);
      history.replace('/');
    }
    const handleSetStartGame = (event) => {
      sendSocket('server/start-game', { uuidRoom })
    }
    
    const handleCloseModal = () => {
      console.log("HandleCloseModal")
    };
    if (!rooms[uuidRoom].isStart && (player.solo || player.admin)) {
      return (
        <Button
          variant="contained"
          onClick={handleSetStartGame}
        >
          Commencer la partie !
        </Button>
      )
    } else if (!rooms[uuidRoom].isStart && !player.admin) {
      return (
        <p>
          Veuillez attendre que le maitre du jeux commence la partie
        </p>
      )
    } else if (!rooms[uuidRoom].isPlaying) {
      return (
        <div>
          <Modal
            open
            disablePortal
            disableEnforceFocus
            disableAutoFocus
            onClose={handleCloseModal}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            <Fade in={rooms[uuidRoom].isPlaying}>
              <div className={classes.paper}>
                <h2 id="transition-modal-title">Pause</h2>
              </div>
            </Fade>
          </Modal>
        </div>
      )
    } else {
      return (
        <div>
          {/* <LeaveRoomButton
            uuidRoom={match.params}
            player={player}
            sendSocket={sendSocket}
          /> */}
          <Board
            game={rooms[uuidRoom]}
            mapGame={rooms[uuidRoom].players[player.uuid].map_game}
            isAlone={Object.keys(rooms[uuidRoom].players).length === 1}
            mapGamePreview={_.filter(rooms[uuidRoom].players, item => item.uuid !== player.uuid)[0]?.map_game}
          />
        </div>
      )
    }
    // match.params.id
}

export default withRouter(Room)
