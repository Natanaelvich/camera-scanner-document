import React, {useRef, useState} from 'react';
import {View, Dimensions} from 'react-native';

import Scanner, {RectangleOverlay} from 'react-native-rectangle-scanner';

const App = () => {
  const cameraRef = useRef();

  const [device, setDevice] = useState({
    initialized: false,
    hasCamera: false,
    permissionToUseCamera: false,
    flashIsAvailable: false,
    previewHeightPercent: 1,
    previewWidthPercent: 1,
  });

  const [detectedRectangle, setDetectedRectangle] = useState(false);

  function handleOnPictureProcessed(data) {
    console.log({data});
  }

  function getPreviewSize() {
    const dimensions = Dimensions.get('window');
    // We use set margin amounts because for some reasons the percentage values don't align the camera preview in the center correctly.
    const heightMargin =
      ((1 - device.previewHeightPercent) * dimensions.height) / 2;
    const widthMargin =
      ((1 - device.previewWidthPercent) * dimensions.width) / 2;
    if (dimensions.height > dimensions.width) {
      // Portrait
      return {
        height: device.previewHeightPercent,
        width: device.previewWidthPercent,
        marginTop: heightMargin,
        marginLeft: widthMargin,
      };
    }

    // Landscape
    return {
      width: device.previewHeightPercent,
      height: device.previewWidthPercent,
      marginTop: widthMargin,
      marginLeft: heightMargin,
    };
  }

  function onDeviceSetup(deviceDetails) {
    const {
      hasCamera,
      permissionToUseCamera,
      flashIsAvailable,
      previewHeightPercent,
      previewWidthPercent,
    } = deviceDetails;

    //   setloadingCamera(false)
    setDevice({
      initialized: true,
      hasCamera,
      permissionToUseCamera,
      flashIsAvailable,
      previewHeightPercent: previewHeightPercent || 1,
      previewWidthPercent: previewWidthPercent || 1,
    });
  }

  return (
    <View style={{flex: 1}}>
      <Scanner
        onPictureProcessed={handleOnPictureProcessed}
        onRectangleDetected={({detectedRectangle}) =>
          setDetectedRectangle(detectedRectangle)
        }
        onDeviceSetup={onDeviceSetup}
        ref={cameraRef}
        style={{flex: 1}}
      />

      <RectangleOverlay
        detectedRectangle={detectedRectangle}
        previewRatio={getPreviewSize()}
        backgroundColor="rgba(255,181,6, 0.2)"
        borderColor="rgb(255,181,6)"
        borderWidth={4}
        // == These let you auto capture and change the overlay style on detection ==
        // detectedBackgroundColor="rgba(255,181,6, 0.3)"
        // detectedBorderWidth={6}
        // detectedBorderColor="rgb(255,218,124)"
        // onDetectedCapture={this.capture}
        // allowDetection
      />
    </View>
  );
};

export default App;
