import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {connect, Provider} from 'react-redux';
import PropTypes from 'prop-types';

const App = (props) => (
  <div>
    <h3>This is an App. Nudge.</h3>
    <label>Simple Counter</label>
    <div>
      <input type="number" defaultValue={props.state} disabled />
      <button onClick={props.onIncrement}>Increment</button>
    </div>
  </div>
)

App.propTypes = {
  state: PropTypes.string,
  onIncrement: PropTypes.func
}

const mapStateToProps = (state) => ({
  state: state
})

const mapDispatchToProps = (dispatch) => ({
  onIncrement: dispatch({type: 'INCREMENT'})
})

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);

const reducer = (state, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
  }
  return state || 0
}

const store = createStore(reducer);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedApp />
  </Provider>,
  document.getElementById('redux-sandbox')
);

console.log('this is working');