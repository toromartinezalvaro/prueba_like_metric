import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Styles from './Widget.module.scss';

export const SMALL = 'sm';
export const MEDIUM = 'md';

const Widget = ({ title, subtitle, children, size }) => {
  const padding = size === SMALL ? 1 : 3;
  const headerVariant =
    size === SMALL
      ? { content: 'h6', title: 'body2', subtitle: 'caption' }
      : { content: 'h4', title: 'subtitle1' };
  return (
    <Paper classes={{ root: Styles.container }}>
      <Box pt={padding} px={padding}>
        <Typography
          variant={headerVariant.content}
          component="div"
          align="center"
        >
          {children}
        </Typography>
      </Box>
      <Box pb={padding} px={padding}>
        <Typography variant="subtitle1" color="textSecondary" align="center">
          {title}
        </Typography>
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
  size: PropTypes.oneOf([SMALL, MEDIUM]),
};

Widget.defualtProps = {
  size: MEDIUM,
};

export default Widget;
