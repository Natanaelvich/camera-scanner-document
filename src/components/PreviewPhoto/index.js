import React from 'react';

import * as S from './styles';

const PreviewPhoto = ({uri}) => {
  return (
    <S.Container>
      <S.Image source={{uri}} />
    </S.Container>
  );
};

export default PreviewPhoto;
