import React, { Component } from 'react';
import { Group } from 'react-art';
import HexTile from './hex-tile';
import { makeRadialGrid } from '../utils/hex-layout';

export default class HexGrid extends Component {
  render() {

    const widthPixels = this.props.dimensions.width;
    const heightPixels = this.props.dimensions.height;
    const sizeHorizontal = this.props.size.horizontal;
    const sizeVertical = this.props.size.vertical;

    const hexPositions = makeRadialGrid(
      widthPixels,
      heightPixels,
      sizeHorizontal,
      sizeVertical
    );

    const hexGrid = hexPositions.map(function(hexRow, index) {
      let rowElements = hexRow.map(function(hexData) {
        let hexKey = hexData.keyName;
        return (
          <HexTile
            key={ hexKey }
            size={ hexData.size }
            centre={ hexData.pixelCoordinates } />
        );
      });

      return (
        <Group key={ 'row_' + index }>
          { rowElements }
        </Group>
      );
    });

    return (
      <Group>
        { hexGrid }
      </Group>
    );
  }
}
