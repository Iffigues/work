import React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Preview from './preview'
import Game from './game'
import StyledTetrisWrapper from './style/styledBoard'
import StyledTetris from './style/styledBoard'
import { createGame } from '../plugins/createGame';
import { Card, CardContent } from '@material-ui/core';

const boxProps = {
  bgcolor: 'background.paper',
  bordercolor: 'text.primary',
  border: 1,
  borderradius: "borderRadius",
  style: { backgroundColor: 'white', height: '100%', width: '100%'},
  m: 1
};

const Board = ({ mapGame, mapGamePreview, isAlone }) => {
  return (
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="flex-start"
        spacing={3}
        style={{ backgroundColor: '#ffff', width: '100%', height: '100%'}}
      >
        <Grid item xs={8}>
          <Card {...boxProps} variant="outlined">
            <CardContent>
              <Game game={ { game: mapGame, isOtherUser: false } }/>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Preview game={ { game: mapGamePreview, isOtherUser: true } } isAlone={isAlone} />
        </Grid>
      </Grid>
  );
}
export default Board
