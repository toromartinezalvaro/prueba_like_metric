import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Styles from './Widget.module.scss';

export const EXTRA_SMALL = 'xs';
export const SMALL = 'sm';
export const MEDIUM = 'md';

const VARIANTS = {
  xs: {
    padding: 1,
    headerVariant: {
      content: 'body1',
      title: 'body2',
      subtitle: 'caption',
    },
  },
  sm: {
    padding: 1,
    headerVariant: {
      content: 'h6',
      title: 'body2',
      subtitle: 'caption',
    },
  },
  md: {
    padding: 3,
    headerVariant: { content: 'h4', title: 'subtitle1' },
  },
};

const Widget = ({ title, subtitle, children, size }) => {
  const { padding, headerVariant } = VARIANTS[size];
  const cols = size === EXTRA_SMALL ? 6 : 12;
  return (
    <Paper classes={{ root: Styles.container }}>
      <Grid container>
        <Grid item xs={cols}>
          <Box pt={padding} px={padding}>
            <Typography
              variant={headerVariant.content}
              component="div"
              align="center"
            >
              {children}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={cols}>
          <Box px={padding}>
            <Typography
              variant="subtitle1"
              color="textSecondary"
              align="center"
            >
              {title}
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Box pb={padding}>
        {subtitle && (
          <Typography
            variant={headerVariant.subtitle}
            component="div"
            align="center"
          >
            {subtitle}
          </Typography>
        )}
      </Box>
    </Paper>
  );
};

Widget.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  children: PropTypes.node.isRequired,
  size: PropTypes.oneOf([EXTRA_SMALL, SMALL, MEDIUM]),
};

Widget.defaultProps = {
  size: MEDIUM,
};

export default Widget;
