import React from 'react';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Style from './ErrorMessage.module.scss';

export default function ErrorMessage() {
  return (
    <Paper classes={{ root: Style.root }}>
      <Typography variant="h4" gutterBottom>
        <Box textAlign="center" fontWeight="fontWeightBold">
          ¡Oh no! 😰
        </Box>
      </Typography>
      <Typography variant="h6" gutterBottom>
        <Box textAlign="center" fontWeight="fontWeightMedium">
          Ha ocurrido un error al tratar de conectarse con el servidor.
        </Box>
      </Typography>
      <Typography variant="subtitle1" gutterBottom classes={{root: Style.TypographyRoot}}>
        <Box textAlign="center">
          No te preocupes, estamos trabajando para solucionar el problema.
        </Box>
      </Typography>
    </Paper>
  );
}
