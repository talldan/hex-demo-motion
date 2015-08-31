import React, { Component } from 'react';
import { Surface } from 'react-art';
import HexGrid from './hex-grid';
import { onResize, getDisplayDimensions } from '../utils/hex-layout';
import { Spring } from 'react-motion';

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
      <Spring
        defaultValue={ { val: this.state.dimensions } }
        endValue={ { val: this.state.dimensions, config: [100, 20] } }>

        { interpolated => (
          <Surface { ...this.state.dimensions } >
            <HexGrid
              dimensions={ interpolated.val }
              size={ this.state.size } />
          </Surface>) }

      </Spring>
    );
  }
}
