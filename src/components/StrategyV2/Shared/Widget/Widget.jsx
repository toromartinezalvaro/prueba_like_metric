import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Styles from './Widget.module.scss';

export const XS = 'xs';
export const SM = 'sm';
export const MD = 'md';

const VARIANTS = {
  xs: {
    padding: 0,
    headerVariant: {
      content: 'body1',
      title: 'body1',
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
    headerVariant: { content: 'h5', title: 'subtitle1' },
  },
};

const Widget = ({ title, subtitle, children, size }) => {
  const { padding, headerVariant } = VARIANTS[size];
  const cols = 12;
  return (
    <Paper classes={{ root: Styles.container }}>
      <Box p={size === XS ? 1 : 0}>
        <Grid container>
          <Grid item xs={cols}>
            <Box pt={padding} px={padding} overflow="auto">
              <Typography
                variant={headerVariant.content}
                component="div"
                align="center"
                classes={{ root: size === XS ? Styles.xs : null }}
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
                classes={{ root: size === XS ? Styles.xs : null }}
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
      </Box>
    </Paper>
  );
};

Widget.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  children: PropTypes.node.isRequired,
  size: PropTypes.oneOf([XS, SM, MD]),
};

Widget.defaultProps = {
  size: MD,
};

export default Widget;
