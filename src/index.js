import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, combineReducers} from 'redux';
import {connect, Provider} from 'react-redux';
import PropTypes from 'prop-types';
import {Feed} from './components/feed/Feed';

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
  count: countReducer
})

const store = createStore(reducer);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedApp />
  </Provider>,
  document.getElementById('redux-sandbox')
);

console.log('this is working');
