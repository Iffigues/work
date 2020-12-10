import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Preview from '../../components/preview'
import Game from '../../components/game'
import { createGame } from '../../plugins/createGame'
import {withRouter} from 'react-router';

const boxProps = {
  bgcolor: 'background.paper',
  bordercolor: 'text.primary',
  border: 1,
  borderradius: "borderRadius",
  style: { backgroundColor: 'white', height: '100%', width: '100vw'},
  m: 1
};

const BoardPage = () => {
  return (
    <div>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="flex-start"
        spacing={3}
        style={{ backgroundColor: '#ffff', height: '100%'}}
      >
        <Grid item xs={8}>
          <Card {...boxProps} style= {{ width: '100%', height: '100%' }} variant="outlined">
            <CardContent>
              <Game game={createGame(false)}/>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={4} >
          <Preview/>
        </Grid>
      </Grid>
    </div>
  );
}
export default withRouter(BoardPage)
