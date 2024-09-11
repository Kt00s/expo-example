import styles from './styles';
import {Image, TouchableOpacity, View} from 'react-native';
import {CLEAR, LOCATION, MINUS, NIGHT, PLUS, SUN} from '../images';
import React from 'react';
import {Point} from 'react-native-yamap';

interface Props {
  marker?: Point;
  night?: boolean;
  zoomToMarker?: () => void;
  toggleNightMode?: () => void;
  clear?: () => void;
  zoomUp?: () => void;
  zoomDown?: () => void;
}

const ButtonsBlock = ({
  marker,
  night,
  zoomToMarker,
  toggleNightMode,
  clear,
  zoomUp,
  zoomDown,
}: Props) => {
  return (
    <View style={styles.buttonsBlock}>
      {marker && (
        <TouchableOpacity onPress={zoomToMarker} style={styles.buttonWrapper}>
          <View style={styles.button}>
            <Image source={LOCATION} style={styles.icon} />
          </View>
        </TouchableOpacity>
      )}
      {toggleNightMode ? (
        <TouchableOpacity
          onPress={toggleNightMode}
          style={styles.buttonWrapper}>
          <View style={styles.button}>
            <Image source={!night ? NIGHT : SUN} style={styles.icon} />
          </View>
        </TouchableOpacity>
      ) : null}
      {clear ? (
        <TouchableOpacity onPress={clear} style={styles.buttonWrapper}>
          <View style={styles.button}>
            <Image source={CLEAR} style={styles.icon} />
          </View>
        </TouchableOpacity>
      ) : null}
      {zoomUp ? (
        <TouchableOpacity onPress={zoomUp} style={styles.buttonWrapper}>
          <View style={styles.button}>
            <Image source={PLUS} style={styles.icon} />
          </View>
        </TouchableOpacity>
      ) : null}
      {zoomDown ? (
        <TouchableOpacity onPress={zoomDown} style={styles.buttonWrapper}>
          <View style={styles.button}>
            <Image source={MINUS} style={styles.icon} />
          </View>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default ButtonsBlock;
