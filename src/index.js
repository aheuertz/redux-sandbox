import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {connect, Provider} from 'react-redux';
import PropTypes from 'prop-types';
import {Feed} from './components/feed/Feed';
import {Graph} from './components/graph/Graph';
import {composeWithDevTools} from 'redux-devtools-extension';


const RENDER_INTERVAL_MILLIS = 100;

const App = (props) => (
  <div>
    <h3>This is an App. Nudge.</h3>
    <label>Simple Counter</label>
    <div>
      <div>Count: {props.count}</div>
      <button onClick={props.onIncrement}>Increment</button>
    </div>
    <div>
      <Feed/>
    </div>
    <div>
      <Graph />
    </div>
  </div>
)

App.propTypes = {
  count: PropTypes.number,
  onIncrement: PropTypes.func
}

const mapStateToProps = (state) => ({
  count: state.count
})

const mapDispatchToProps = (dispatch) => ({
  onIncrement: () => dispatch({type: 'INCREMENT'})
})

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);

const bucketize = (value) => Math.floor(value / 1000)

const INITIAL_TIMESTAMP_MILLIS = new Date().getTime();
const INITIAL_XAXIS_MAX = 1;

const INITIAL_GRAPH_STATE = {
  xaxis: {range: [bucketize(INITIAL_TIMESTAMP_MILLIS - (10 * 1000)), bucketize(INITIAL_TIMESTAMP_MILLIS)]},
  yaxis: {range: [0, INITIAL_XAXIS_MAX]},
  aggregates: {}
}

const graphReducer = (state = INITIAL_GRAPH_STATE, action) => {
  const aggregate = aggregateReducer(state.aggregates[action.type], action);
  return {
    xaxis: {
      range: [bucketize(INITIAL_TIMESTAMP_MILLIS - (10 * 1000)), bucketize(action._epoch)]
    },
    yaxis: {
      range: [0, Math.max(state.yaxis.range[1], aggregate.max)]
    },
    aggregates: {
      ...state.aggregates,
      [action.type]: aggregate
    }
  };
}

const aggregateReducer = (state = {max: 0, values: {}}, action) => {
  const value = bucketize(action._epoch || INITIAL_TIMESTAMP_MILLIS);
  const valueCount = state.values[value] ? state.values[value] + 1 : 1;
  return {
    max: Math.max(state.max, valueCount),
    values: {
      ...state.values,
      [value]: valueCount
    }
  };
}

const entriesReducer = (state = [], action) => ([
  ...state.reverse().slice(0, Math.min(state.length, 10)).reverse(),
  {timestamp: new Date().getTime(), value: action}
]);

const countReducer = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
  }
  return state;
}

const reducer = combineReducers({
  entries: entriesReducer,
  count: countReducer,
  graph: graphReducer
})

const epochMiddleware = store => next => action => next({...action, _epoch: new Date().getTime()})

const store = createStore(reducer, composeWithDevTools(applyMiddleware(epochMiddleware)));

console.log('store', store);

const interval = setInterval(() => {
  store.dispatch({type: 'TICK'})
}, RENDER_INTERVAL_MILLIS);

//setTimeout(() => {clearInterval(interval)}, 10000)

ReactDOM.render(
  <Provider store={store}>
    <ConnectedApp />
  </Provider>,
  document.getElementById('redux-sandbox')
);

console.log('this is working');
