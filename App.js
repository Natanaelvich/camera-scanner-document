import React from 'react';
import {View} from 'react-native';

import Scanner from 'react-native-rectangle-scanner';
import {useRef} from 'react/cjs/react.production.min';

const App = () => {
  const cameraRef = useRef();

  function handleOnPictureProcessed(data) {
    console.log({data});
  }

  return (
    <View style={{flex: 1}}>
      <Scanner
        onPictureProcessed={handleOnPictureProcessed}
        ref={cameraRef}
        style={{flex: 1}}
      />
    </View>
  );
};

export default App;
