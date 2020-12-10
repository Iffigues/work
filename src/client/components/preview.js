import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Game from './game'
import { createGame } from '../plugins/createGame'

const boxProps = {
  bgcolor: 'background.paper',
  bordercolor: 'text.primary',
  border: 1,
  borderradius: "borderRadius",
  style: { backgroundColor: 'white', width: '100vw'},
};

const OtherPlayerGrid = ({isAlone, mapGamePreview}) => {
  if (!isAlone) {
    console.log('here', isAlone);
    return (
      <Box mb={3}>
        <Card {...boxProps} style= {{ width: '30vw', height: '65vh' }} variant="outlined">
          <Grid item xs={4}>
            <Game game={ { game: mapGamePreview, isOtherUser: true } } />
          </Grid>
        </Card>
      </Box>
    )
  } else {
    return '';
  }
}

const Preview = ({mapGamePreview, isAlone}) => {
  return (
    <div>
      <Box mb={3}>
        <Card {...boxProps} style= {{ width: '30vw', height: '15vh' }} variant="outlined">
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
            PREVIEW
            </Typography>
          </CardContent>
        </Card>
      </Box>
      <Box mb={3}>
        <Card {...boxProps} style= {{ width: '30vw', height: '5vh' }} variant="outlined">
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
            SCORE
            </Typography>
          </CardContent>
        </Card>
      </Box>
      <OtherPlayerGrid isAlone={isAlone} mapGamePreview={mapGamePreview}/>
    </div>
  );
}
export default Preview
