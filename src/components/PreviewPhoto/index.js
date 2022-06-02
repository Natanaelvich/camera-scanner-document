import React from 'react';

import * as S from './styles';

const PreviewPhoto = ({uri}) => {
  return (
    <S.Container>
      <S.Image source={{uri}} resizeMode="contain" />
    </S.Container>
  );
};

export default PreviewPhoto;
