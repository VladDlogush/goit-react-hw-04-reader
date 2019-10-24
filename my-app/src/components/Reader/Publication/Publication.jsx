import React from 'react';
import PropTypes from 'prop-types';
import styles from './Publication.module.css';

const Publication = ({ id, text, title }) => {
  return (
    <article key={id} className={styles.publication}>
      <h2>{text}</h2>
      <p>{title} </p>
    </article>
  );
};

Publication.propTypes = {
  id: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default Publication;
