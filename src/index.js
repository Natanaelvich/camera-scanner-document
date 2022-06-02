import React, {useEffect, useRef, useState} from 'react';
import {View, Dimensions, Button} from 'react-native';

import Scanner, {RectangleOverlay} from 'react-native-rectangle-scanner';
import PreviewPhoto from './components/PreviewPhoto';

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
  const [image, setImage] = useState('');
  const [previewSize, setPreviewSize] = useState(null);
  const [onTakingPhoto, setOnTakingPhoto] = useState(false);

  useEffect(() => {
    function getPreviewSize() {
      const dimensions = Dimensions.get('window');
      // We use set margin amounts because for some reasons the percentage values don't align the camera preview in the center correctly.
      const heightMargin =
        ((1 - device.previewHeightPercent) * dimensions.height) / 2;
      const widthMargin =
        ((1 - device.previewWidthPercent) * dimensions.width) / 2;
      if (dimensions.height > dimensions.width) {
        // Portrait
        setPreviewSize({
          height: device.previewHeightPercent,
          width: device.previewWidthPercent,
          marginTop: heightMargin,
          marginLeft: widthMargin,
        });
        return;
      }

      // Landscape
      setPreviewSize({
        width: device.previewHeightPercent,
        height: device.previewWidthPercent,
        marginTop: widthMargin,
        marginLeft: heightMargin,
      });
    }

    getPreviewSize();
  }, [device]);

  function handleOnPictureProcessed(data) {
    setImage(data.croppedImage);
    setOnTakingPhoto(true);

    setTimeout(() => {
      setOnTakingPhoto(false);
    }, 1000);
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

  function handleTakePicture() {
    cameraRef.current.capture();
  }

  return (
    <View style={{flex: 1}}>
      {!onTakingPhoto && (
        <Scanner
          onPictureProcessed={handleOnPictureProcessed}
          onRectangleDetected={({
            detectedRectangle: detectedRectangleScanner,
          }) => setDetectedRectangle(detectedRectangleScanner)}
          onDeviceSetup={onDeviceSetup}
          onPictureTaken={event => console.log({event})}
          capturedQuality={0.6}
          ref={cameraRef}
          style={{flex: 1}}
        />
      )}

      <RectangleOverlay
        detectedRectangle={detectedRectangle}
        previewRatio={previewSize}
        backgroundColor="transparent"
        // backgroundColor="rgba(255,181,6, 0.2)"
        borderColor="blue"
        borderWidth={4}
        // == These let you auto capture and change the overlay style on detection ==
        // detectedBackgroundColor="rgba(255,181,6, 0.3)"
        // detectedBorderWidth={6}
        // detectedBorderColor="rgb(255,218,124)"
        // onDetectedCapture={this.capture}
        // allowDetection
      />

      <Button title="TAKE PICTURE" onPress={handleTakePicture} />

      {!!image && <PreviewPhoto uri={image} />}
    </View>
  );
};

export default App;
