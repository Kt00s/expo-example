import React, {useRef, useState} from 'react';
import {
  NativeSyntheticEvent,
  View,
} from 'react-native';
import {
  CameraPosition,
  ClusteredYamap,
  Marker,
  Point,
} from 'react-native-yamap';
import {BLACK} from '../assets';
import ButtonsBlock from '../utils/ButtonsBlock';
import styles from '../utils/styles';
import {useNavigation} from '@react-navigation/native';

const ClusteredMap = () => {
  const map = useRef<ClusteredYamap>(null);
  const [markers, setMarkers] = useState<Point[]>([]);
  const navigation = useNavigation();

  const onMapPress = (event: NativeSyntheticEvent<Point>) => {
    const {lat, lon} = event.nativeEvent;
    const newPolyline = [
      ...markers,
      {
        lat,
        lon,
      },
    ];
    setMarkers(newPolyline);
  };

  const getCurrentPosition = () => {
    return new Promise<CameraPosition>(resolve => {
      if (map.current) {
        map.current.getCameraPosition(position => {
          resolve(position);
        });
      }
    });
  };

  const zoomUp = async () => {
    const position = await getCurrentPosition();
    if (map.current) {
      map.current.setZoom(position.zoom * 1.1, 0.1);
    }
  };

  const zoomDown = async () => {
    const position = await getCurrentPosition();
    if (map.current) {
      map.current.setZoom(position.zoom * 0.9, 0.1);
    }
  };

  const clear = () => {
    setMarkers([]);
  };

  return (
    <View style={{flex: 1}}>
      <ClusteredYamap
        clusterColor={'red'}
        clusteredMarkers={markers.map(marker => ({data: {}, point: marker}))}
        ref={map}
        onMapPress={onMapPress}
        renderMarker={(info, index) => (
          <Marker key={index} point={info.point}>
            <View style={styles.clusterMarker} />
          </Marker>
        )}
        showUserPosition={false}
        style={{flex: 1}}
        userLocationIcon={BLACK}
      />
      <ButtonsBlock clear={clear} zoomUp={zoomUp} zoomDown={zoomDown} />
    </View>
  );
};

export default ClusteredMap;
