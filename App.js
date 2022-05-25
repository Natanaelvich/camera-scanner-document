import React, {useState} from 'react';
import {View, Image} from 'react-native';

import DocumentScanner from 'react-native-document-scanner';

const App = () => {
  const [image, setImage] = useState();

  return (
    <View>
      <DocumentScanner
        useBase64
        saveInAppDocument={false}
        onPictureTaken={
          data => setImage(data.croppedImage)
          //   this.setState({
          //     image: data.croppedImage,
          //     initialImage: data.initialImage,
          //     rectangleCoordinates: data.rectangleCoordinates,
          //   })
        }
        overlayColor="rgba(255,130,0, 0.7)"
        enableTorch={false}
        brightness={0.3}
        saturation={1}
        contrast={1.1}
        quality={0.5}
        onRectangleDetect={({stableCounter, lastDetectionType}) =>
          console.log({
            stableCounter,
            lastDetectionType,
          })
        }
        detectionCountBeforeCapture={5}
        detectionRefreshRateInMS={50}
        onPermissionsDenied={() => console.log('Permissions Denied')}
      />
      <Image
        source={{uri: `data:image/jpeg;base64,${image}`}}
        resizeMode="contain"
      />
    </View>
  );
};

export default App;
