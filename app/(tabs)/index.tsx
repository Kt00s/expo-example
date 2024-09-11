import React, {useRef, useState} from 'react';
import {
  NativeSyntheticEvent,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import {
  YaMap,
  Animation,
  CameraPosition,
  Circle,
  Marker,
  Point,
  Polygon,
  Geocoder,
} from 'react-native-yamap';
import {USER} from '../images';
import {useNavigation} from '@react-navigation/native';
import styles from '../utils/styles';
import ButtonsBlock from '../utils/ButtonsBlock';

const MapWithPrimitives = () => {
  const [marker, setMarker] = useState<Point>();
  const [polyline, setPolyline] = useState<Point[]>([]);
  const [night, setNight] = useState(false);
  const [address, setAddress] = useState('');

  const navigation = useNavigation();

  const map = useRef<YaMap>(null);

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

  const onMapLongPress = async (event: NativeSyntheticEvent<Point>) => {
    const {lat, lon} = event.nativeEvent;
    const newMarker = {
      lat,
      lon,
    };
    setMarker(newMarker);
    setAddress('');
    const geoAddress = await Geocoder.geoToAddress(newMarker);
    if (geoAddress) {
      setAddress(geoAddress.formatted);
    }
  };

  const onMarkerPress = () => {
    setMarker(undefined);
  };

  const onMapPress = (event: NativeSyntheticEvent<Point>) => {
    const {lat, lon} = event.nativeEvent;
    const newPolyline = [
      ...polyline,
      {
        lat,
        lon,
      },
    ];
    setPolyline(newPolyline);
  };

  const zoomToMarker = () => {
    if (map.current && marker) {
      map.current.setCenter({...marker}, 14, 0, 0, 0.4, Animation.SMOOTH);
    }
  };

  const clear = () => {
    setMarker(undefined);
    setPolyline([]);
    setNight(false);
    setAddress('');
  };

  const toggleNightMode = () => {
    setNight(prevState => !prevState);
  };

  return (
    <View style={styles.container}>
      <YaMap
        ref={map}
        style={styles.container}
        userLocationIcon={USER}
        showUserPosition
        onMapPress={onMapPress}
        nightMode={night}
        onMapLongPress={onMapLongPress}>
        {marker ? (
          <>
            <Marker onPress={onMarkerPress} point={marker}>
              <View style={styles.clusterMarker} />
            </Marker>
            <Circle
              center={marker}
              radius={300}
              fillColor="#ff000080"
              strokeColor={'#ffff00'}
            />
          </>
        ) : null}
        {polyline.length > 2 && (
          <Polygon points={polyline} fillColor="#00ff0080" />
        )}
      </YaMap>
      {address && marker ? (
        <View style={styles.addressWrapper}>
          <SafeAreaView />
          <View style={styles.address}>
            <Text style={styles.addressText}>{address}</Text>
          </View>
        </View>
      ) : null}
      <ButtonsBlock
        night={night}
        marker={marker}
        zoomToMarker={zoomToMarker}
        toggleNightMode={toggleNightMode}
        clear={clear}
        zoomUp={zoomUp}
        zoomDown={zoomDown}
      />
    </View>
  );
};

export default MapWithPrimitives;
