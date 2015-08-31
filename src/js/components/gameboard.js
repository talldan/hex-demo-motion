import React, { Component } from 'react';
import { Surface } from 'react-art';
import HexGrid from './hex-grid';
import { onResize, getDisplayDimensions } from '../utils/hex-layout';

export default class Gameboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dimensions: getDisplayDimensions(),
      size: {
        horizontal: 9,
        vertical: 9
      }
    }
  }

  setDisplayDimensions = (dimensions) => {
    this.setState({
      dimensions: dimensions
    })
  }

  componentWillMount() {
    onResize(this.setDisplayDimensions);
  }

  render() {
    return (
      <Surface { ...this.state.dimensions } >
        <HexGrid { ...this.state } />
      </Surface>
    );
  }
}
