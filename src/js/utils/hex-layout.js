import _ from 'lodash';
import { Path } from 'react-art';

const SIZE_TO_PACKED_WIDTH = 1.7320508075688772;
const SIZE_TO_PACKED_HEIGHT = 1.5;

function getOptimalSize(widthPixels, heightPixels, countHorizontal, countVertical) {
  // add extra amounts for offset rows and bottom points of hexes on last row
  const packedhexWidth = widthPixels / (parseInt(countHorizontal, 10) + 0.5);
  const adjustedGridHeight = (heightPixels * SIZE_TO_PACKED_HEIGHT) / (parseInt(countVertical, 10) + 0.5);
  const packedHexHeight =  adjustedGridHeight / SIZE_TO_PACKED_HEIGHT;

  var size = null;

  if ((packedhexWidth / SIZE_TO_PACKED_WIDTH) < (packedHexHeight / SIZE_TO_PACKED_HEIGHT)) {
    size = packedhexWidth / SIZE_TO_PACKED_WIDTH;
  }
  else {
    size = packedHexHeight / SIZE_TO_PACKED_HEIGHT;
  }

  return size.toFixed(8);
}

function calculatePixelCoordinates(baseVector, hexSize, axialXCoord, axialYCoord) {
  return {
    x: baseVector.x + (hexSize * Math.sqrt(3) * (axialXCoord + axialYCoord / 2)),
    y: baseVector.y + (hexSize * 3 / 2 * axialYCoord)
  };
}

export function makeRadialGrid(widthPixels, heightPixels, countHorizontal, countVertical) {
  var size = getOptimalSize(
    widthPixels,
    heightPixels,
    countHorizontal,
    countVertical
  );

  var centreX = Math.floor(widthPixels / 2);
  var centreY = Math.floor(heightPixels / 2);
  var gridRadiusVertical = (countVertical - 1) / 2;
  var centreVector = {
    x: Math.floor(widthPixels / 2),
    y: Math.floor(heightPixels / 2)
  };
  var hexSize = parseFloat(size, 10);
  var widthOffset = (countHorizontal - countVertical) / 2;

  var rows = [];
  _.times(countVertical, function(indexVertical) {
    var axialYCoord = indexVertical - gridRadiusVertical;
    var distanceFromCentreVertical = Math.abs(axialYCoord);
    var adjustedCountHorizontal = countHorizontal - distanceFromCentreVertical;

    var row = [];

    _.times(adjustedCountHorizontal, function(indexHorizontal) {
      var axialXCoord = indexHorizontal - Math.min(indexVertical, gridRadiusVertical) - widthOffset;
      var cubeXCoord = 0;
      var cubeYCoord = 0;

      row.push({
        keyName: 'tile_' + axialXCoord + '_' + axialYCoord,
        axialCoordinates: {
          x: axialXCoord,
          y: axialYCoord
        },
        cubeCoordinates: {
          x: axialXCoord,
          y: (-axialXCoord) - axialYCoord,
          z: axialYCoord
        },
        size: hexSize - 0.4,
        pixelCoordinates: calculatePixelCoordinates(centreVector, hexSize, axialXCoord, axialYCoord)
      });
    });

    rows.push(row);
  });

  return rows;
}

export function makeHexPath(size, centre) {
  var path = new Path();
  var point = 0;
  var angle = null;
  var x = null;
  var y = null;

  while (point < 6) {
    angle = 2 * Math.PI / 6 * (point + 0.5);
    x = centre.x + size * Math.cos(angle);
    y = centre.y + size * Math.sin(angle);

    if (point === 0) {
      path.moveTo(x, y);
    }
    else {
      path.lineTo(x, y);
    }

    point = point + 1;
  }

  return path;
}

export function getDisplayDimensions() {
  return {
    width: window.innerWidth,
    height: window.innerHeight
  };
}

export function onResize(onResizeCallback) {
  window.addEventListener('resize', _.debounce(function() {
    onResizeCallback(getDisplayDimensions());
  }, 200));
}
