import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Slider,
  Platform,
  PermissionsAndroid,
  ImageBackground,
  Dimensions
} from 'react-native';
import TrackPlayer, {
  Capability,
  useTrackPlayerEvents,
  usePlaybackState,
  TrackPlayerEvents,
} from 'react-native-track-player';
const height = Dimensions.get("screen").height
const width = Dimensions.get("screen").width

const Xary = () => {
    const [isTrackPlayerInit, setIsTrackPlayerInit] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [sliderValue, setSliderValue] = useState(0);
    useEffect(() => {
        setupTrackPlayer();
      }, []);
    
      const setupTrackPlayer = async () => {
        if (!isTrackPlayerInit) {
          TrackPlayer.setupPlayer().then(() => {
            // Add event listeners
            TrackPlayer.addEventListener(TrackPlayerEvents.PLAYBACK_STATE, async () => {
              const state = await TrackPlayer.getState();
              setIsPlaying(state === TrackPlayer.STATE_PLAYING);
            });
    
            setIsTrackPlayerInit(true);
          });
        }
      };
    
      const handlePlayPause = async () => {
        if (isPlaying) {
          await TrackPlayer.pause();
        } else {
          await TrackPlayer.play();
        }
      };
    
      const handleForward = async () => {
        const position = await TrackPlayer.getPosition();
        await TrackPlayer.skipToNext();
        await TrackPlayer.seekTo(position);
      };
    
      const handleBackward = async () => {
        const position = await TrackPlayer.getPosition();
        if (position < 3) {
          await TrackPlayer.skipToPrevious();
        } else {
          await TrackPlayer.seekTo(0);
        }
      };
    
      const handleSliderChange = async (value) => {
        setSliderValue(value);
        await TrackPlayer.seekTo(value);
      };
    
      const requestStoragePermission = async () => {
        if (Platform.OS === 'android') {
          try {
            const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            );
            return granted === PermissionsAndroid.RESULTS.GRANTED;
          } catch (err) {
            console.warn(err);
            return false;
          }
        } else {
          return true;
        }
      };
    
      const initializePlayer = async () => {
        const granted = await requestStoragePermission();
    
        if (granted) {
          await TrackPlayer.setupPlayer();
          await TrackPlayer.updateOptions({
            capabilities: [
              Capability.Play,
              Capability.Pause,
              Capability.SkipToNext,
              Capability.SkipToPrevious,
            ],
          });
        }
      };
    
    //   useEffect(() => {
    //     initializePlayer();
    //   }, []);
    
    //   useTrackPlayerEvents([TrackPlayerEvents.PLAYBACK_TRACK_CHANGED], async (event) => {
    //     const track = await TrackPlayer.getTrack(event.nextTrack);
    //     console.log('track', track);
    //   });
    
      const playbackState = usePlaybackState();
  return (
    <View
      style={{
        flex: 1,
      }}>
    {/* <ImageBackground resizeMode={"cover"} source={require('../google/image0.png')} style={{width:width,height:height}} > */}
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TouchableOpacity onPress={handlePlayPause}>
        <Text>{isPlaying ? 'Pause' : 'Play'}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleForward}>
        <Text>Next</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleBackward}>
        <Text>Previous</Text>
      </TouchableOpacity>
      <Slider
        style={{ width: '80%', marginTop: 20 }}
        minimumValue={0}
        maximumValue={100}
        value={sliderValue}
        onValueChange={handleSliderChange}
        thumbTintColor="#000000"
        minimumTrackTintColor="#000000"
        maximumTrackTintColor="#000000"
      />
      <Text>Playback State: {playbackState}</Text>
    </View>
      {/* </ImageBackground> */}
    </View>
  );
}
export default Xary;