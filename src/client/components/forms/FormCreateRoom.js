import React from 'react';
import { useState, useContext } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { SocketContext } from "../../context/SocketContext";
import { Context as UserContext } from "../../context/UserContext";
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));



const FormCreateRoom = () => {
  const { sendSocket } = useContext(SocketContext);
  const { state: {uuidRoom} } = useContext(UserContext);

  const [login, setLogin] = useState('');
  const history = useHistory()

  const createRoom = async () => {
    await sendSocket('server/create-room', login)
    history.push(`/room/${uuidRoom}`)
  }
  const classes = useStyles();
  return (
    <div>
      <Container>
        <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Crée une partie
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            value={login}
            onInput={e => setLogin(e.target.value)}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="login"
            label="login"
            type="login"
            id="login"
            autoComplete="current-login"
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={createRoom}
            >
            Valider
          </Button>
        </form>
      </div>
      </Container>
    </div>
  );
}
export default FormCreateRoom;

