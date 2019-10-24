import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getItemFromProps from '../../helpers/getProps';
import publications from '../../publications.json';
import Publication from './Publication/Publication';
import Controls from './Controls/Controls';
import styles from './Reader.module.css';

class Reader extends Component {
  state = {
    items: publications,
    value: 0,
  };

  componentDidMount() {
    const { location, history } = this.props;
    const item = getItemFromProps(this.props);

    if (!item) {
      return history.push({
        pathname: location.pathname,
        search: `item=1`,
      });
    }
    return this.setState({
      value: item - 1,
    });
  }

  componentDidUpdate(prevProps) {
    const { location, history } = this.props;
    const { items } = this.state;
    const item = getItemFromProps(this.props);

    if (item !== getItemFromProps(prevProps) && item <= items.length) {
      this.setState({
        value: item - 1,
      });
    } else if (item > items.length) {
      history.push({
        pathname: location.pathname,
        search: `item=1`,
      });
    }
  }

  handleClick = ({ target }) => {
    const { history, location } = this.props;

    const Redirect = () => {
      const { value } = this.state;
      return history.push({
        pathname: location.pathname,
        search: `item=${value + 1}`,
      });
    };

    const { name } = target;
    if (name === 'decrement') {
      this.setState(
        state => ({
          value: state.value - 1,
        }),
        Redirect,
      );
    } else if (name === 'increment') {
      this.setState(
        state => ({
          value: state.value + 1,
        }),
        Redirect,
      );
    }
  };

  render() {
    const { value, items } = this.state;

    return (
      <div className={styles.reader}>
        <Publication
          id={items[value].id}
          text={items[value].text}
          title={items[value].title}
        />
        <p className={styles.counter}>{value + 1}/12</p>;
        <Controls handleClick={this.handleClick} value={value} />
      </div>
    );
  }
}

Reader.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Reader;
