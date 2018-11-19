import React from 'react';
import Plot from 'react-plotly.js';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const StatelessGraph = (props) => (
    <Plot
        data={props.traces}
        layout={{
            paper_bgcolor: 'black',
            plot_bgcolor: 'black',
            xaxis: {
                title: 'Time',
                gridcolor: '#333',
                range: props.xaxis.range,
                fixedrange: true
            },
            yaxis: {
                title: 'Count',
                gridcolor: '#333',
                zeroline: true,
                zerolinecolor: 'white',
                range: props.yaxis.range,
                fixedrange: true
            },
            margin: {l: 0, r: 0, t: 0, b:  0},
            width: 600,
            height: 300
        }} />
)

const AXIS_PROPTYPE = {
    range: PropTypes.arrayOf(PropTypes.number)
}

StatelessGraph.propTypes = {
    xaxis: PropTypes.objectOf(AXIS_PROPTYPE),
    yaxis: PropTypes.objectOf(AXIS_PROPTYPE),
    traces: PropTypes.arrayOf(PropTypes.object)
}

const mapStateToProps = (state) => ({
    xaxis: state.graph.xaxis,
    yaxis: state.graph.yaxis,
    traces: Object.entries(state.graph.aggregates)
        .map(([name, aggregate]) => ({
            name,
            type: 'scatter',
            mode: 'lines+points',
            x: Object.entries(aggregate.values).map(([x, y]) => x),
            y: Object.entries(aggregate.values).map(([x, y]) => y)
        }))
})

const mapDispatchToProps = () => ({})

export const Graph = connect(mapStateToProps, mapDispatchToProps)(StatelessGraph);