import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import PersonIcon from '@material-ui/icons/Person';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import Styles from './Option.module.scss';

const Option = ({ value, inputValue }) => {
  const { identityDocument, name } = value;
  const matches = match(name, inputValue);
  const parts = parse(name, matches);

  return (
    <Grid container alignItems="center">
      <Grid item>
        <PersonIcon className={Styles.icon} />
      </Grid>
      <Grid item xs>
        {parts.map((part, index) => (
          <span key={index} style={{ fontWeight: part.highlight ? 700 : 400 }}>
            {part.text}
          </span>
        ))}
        <Typography variant="body2" color="textSecondary">
          {identityDocument}
        </Typography>
      </Grid>
    </Grid>
  );
};

Option.propTypes = {
  value: PropTypes.shape({
    name: PropTypes.string,
    identityDocument: PropTypes.string,
  }).isRequired,
  inputValue: PropTypes.string,
};

export default Option;
