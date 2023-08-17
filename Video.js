import { Component, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, Dimensions, StatusBar } from 'react-native';
import Video from 'react-native-video';
import Orientation from 'react-native-orientation-locker';
import { useState, useRef } from 'react';
import Videocontrol from './Videocontrol';
import
MediaControls, { PLAYER_STATES }
    from 'react-native-media-controls';
import { Slider } from 'react-native-elements';
let overlayTimer;
let Timer;
const windowHeight = Dimensions.get('screen').width * (9 / 12);
const windowWidth = Dimensions.get('screen').width;
const height = Dimensions.get('screen').width;
const width = Dimensions.get('screen').height;

const Real = () => {
    const videoPlayer = useRef(null);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [play, setplay] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setduration] = useState(0.1);
    const [playbackRate, setPlaybackRate] = useState(1.0);
    const [show, setShow] = useState(false)
    const onslide = (slide) => {
        videoPlayer.current.seek(slide * duration);
        // clearTimeout(overlayTimer);
        // overlayTimer = setTimeout(() => setoverlay(false), 3000);
    }
    const getTime = (t) => {
        const digit = n => n < 10 ? `0${n}` : `${n}`;
        const sec = digit(Math.floor(t % 60));
        const min = digit(Math.floor((t / 60) % 60));
        const hr = digit(Math.floor((t / 3600) % 60));
        // return hr + ':' + min + ':' + sec; 
        return min + ':' + sec;
    }
    const load = ({ duration }) => setduration(duration);
    const progress = ({ currentTime }) => setCurrentTime(currentTime);

    console.log("currentTime:", currentTime);
    useEffect(() => {
        Orientation.addOrientationListener(handleOrientation);
        return () => {
            Orientation.removeOrientationListener(handleOrientation)
        };
    });
    const handlechange = () => {
        if (isFullScreen) {
            Orientation.unlockAllOrientations();
        } else {

            Orientation.lockToLandscapeLeft();
        }
        setIsFullScreen(!isFullScreen);
    }
    console.log("ssdfgsdgdfgdf");
    const handleOrientation = (orientation) => {
        if (orientation === 'LANDSCAPE-LEFT' || orientation === 'LANDSCAPE-RIGHT') {
            setIsFullScreen(true);
            StatusBar.setHidden(true);
        } else {
            setIsFullScreen(false);
            StatusBar.setHidden(false);
        }
    }
    const handleplay = () => {
        setplay(true)
    }
    const handlepause = () => {
        if (play) {
            setplay(false);
            return;
        }
        setplay(true)
    }
    const skipBackward = () => {
        videoPlayer.current.seek(currentTime - 15);
        setCurrentTime(currentTime - 15);
    }
    const skipForward = () => {
        videoPlayer.current.seek(currentTime + 15);
        setCurrentTime(currentTime + 15);
    }

    return (
        <View style={styles.container}>

            <Video
                ref={videoPlayer}
                source={{ uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' }}
                resizeMode="contain"
                muted={false}
                style={isFullScreen ? styles.fullscreenVideo : styles.Video}
                paused={!play}
                rate={playbackRate}
                onLoad={load}
                onProgress={progress}


                // controls={true}
                seek={currentTime}
            />
            <View style={{
                top: 0, bottom: 0, left: 0, right: 0, position: "absolute"
            }}>
                <TouchableOpacity
                    onPress={() => setShow(!show)}
                    style={{

                        // justifyContent:"space-evenly"



                    }}>
                    <Image style={{ width: 30, height: 40 }} source={require('../google/images3.png')} />
                </TouchableOpacity>
                {show === true ? (<>
                    <TouchableOpacity
                        style={{ marginTop: 30, alignSelf: "center" }}
                        onPress={() => setPlaybackRate(playbackRate + 0.25)}>
                        <Text style={{ textAlign: "center" }}>Increase Speed</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{ marginTop: 30 }}
                        onPress={() => setPlaybackRate(playbackRate - 0.25)}
                    >
                        <Text style={{ textAlign: "center" }}>Decrease Speed</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{ marginTop: 30 }}
                        onPress={() => setPlaybackRate(1.0)}
                    >
                        <Text style={{ textAlign: "center" }}>Normal Speed</Text>
                    </TouchableOpacity></>

                ) : (null)
                }

            </View>
            <View>
                <TouchableOpacity onPress={handlechange}
                    style={{
                        bottom: 0, right: 0, position: "absolute"
                    }}>
                    <Image style={{ width: 30, height: 30, }} source={require('../google/fullscreen2.png')} />
                </TouchableOpacity>
            </View>
            <Videocontrol onPlay={handleplay}
                onPause={handlepause}
                playing={play}
                skipBackwards={skipBackward}
                skipForwards={skipForward} />
            <View style={{ flexDirection: 'row' }}>
                <Text style={{ color: 'white' }}>{getTime(currentTime)}/</Text>
                <Text style={{ color: 'white' }}>{getTime(duration)}</Text>
            </View>

            <View style={{ flex: 1, alignItems: 'stretch', justifyContent: 'center' }}>
                <Slider
                    style={{ margin: 5 }}
                    maximumTrackTintColor='white'
                    minimumTrackTintColor='white'
                    thumbTintColor='white'
                    value={currentTime / duration}
                    onValueChange={onslide}
                />
            </View>

        </View>
    );
}

export default Real
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "gray"
    },
    Video: {
        height: windowHeight,
        width: windowWidth,
        backgroundColor: "gray",
        marginTop: 270
        //    justifyContent:"center",
        // alignItems:"center"
    },
    fullscreenVideo: {
        flex: 1,
        height: height,
        width: width,
        backgroundColor: "gray",
        right: 40,

    }

});