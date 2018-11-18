import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

const FeedEntry = (props) => (
  <div style={{border: '1px solid gray'}}>
    <div><b>Timestamp:</b>&nbsp;{new Date(props.timestamp).toString()}</div>
    <div><b>Entry:</b>&nbsp;{JSON.stringify(props.value)}</div>
  </div>
)

FeedEntry.propTypes = {
  timestamp: PropTypes.number,
  value: PropTypes.object
}

const StatelessFeed = (props) => (
  <div>
    {props.entries.map(entry => (
      <FeedEntry key={entry.timestamp}
        timestamp={entry.timestamp}
        value={entry.value} />
    ))}
  </div>
)

StatelessFeed.propTypes = {
  entries: PropTypes.arrayOf(PropTypes.object)
}

const mapStateToProps = (state) => ({
  entries: state.entries
})

const mapDispatchToProps = (dispatch) => ({
})

export const Feed = connect(mapStateToProps, mapDispatchToProps)(StatelessFeed);
