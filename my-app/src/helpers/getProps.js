import queryString from 'query-string';

const getItemFromProps = props => queryString.parse(props.location.search).item;

export default getItemFromProps;
