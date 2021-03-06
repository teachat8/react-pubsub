import { PropTypes } from 'react';
const { shape, func, array } = PropTypes;

const subscriptionShape = shape({
  subscriptions: array.isRequired,
  add: func.isRequired,
  removeAll: func.isRequired,
  publish: func.isRequired,
});

export default subscriptionShape;
