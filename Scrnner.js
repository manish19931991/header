import React, { useRef, useState, useEffect } from 'react';
import { View, Image, StyleSheet, BackHandler, Dimensions, TouchableNativeFeedback, Text, StatusBar, Platform, TouchableOpacity } from 'react-native';
import Video from "react-native-video";
import Orientation from 'react-native-orientation-locker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Slider from '@react-native-community/slider';
import { normalize } from 'react-native-elements';
import PipHandler, { usePipModeListener } from 'react-native-pip-android';
const { width, height } = Dimensions.get("window");
Icon.loadFont();
let overlayTimer;
let Timer;
const VideoPlayerScreen = (props) => {
    let lastTap = null;
    const { navigation } = props;
    const [Fullscreen, setFullscreen] = useState(false);
    const [paused, setpaused] = useState(false);
    const [currentTime, setcurrentTime] = useState(0);
    const [duration, setduration] = useState(0.1);
    const [overlay, setoverlay] = useState(false);
    const [show, setShow] = useState(false)
    const [playbackRate, setPlaybackRate] = useState(1.0);


    const playerRef = useRef();
    const inPipMode = usePipModeListener();

    if (inPipMode) {
        return (
            <View style={styles.container}>
                <Text>PIP Mode</Text>
            </View>
        );
    }

    // useEffect(() => {
    //     const backHandler = BackHandler.addEventListener(
    //         "hardwareBackPress",
    //         backAction
    //     );
    //     return () => backHandler.remove();
    // }, [])

    // const backAction = () => {
    //     // navigation.goBack();
    //     return true;
    // }


    const FullscreenToggle = () => {

        if (Fullscreen) {
            Orientation.lockToPortrait();
            StatusBar.setHidden(false)
            navigation.setOptions({ headerShown: true });
            setFullscreen(false)
        } else {
            Orientation.lockToLandscape();
            StatusBar.setHidden(true)
            navigation.setOptions({ headerShown: false });
            setFullscreen(true);
        }

    }

    const handleDoubleTap = (doubleTapCallback, singleTapCallback) => {
        const now = Date.now();
        const DOUBLE_PRESS_DELAY = 300;
        if (lastTap && (now - lastTap) < DOUBLE_PRESS_DELAY) {
            clearTimeout(Timer);
            doubleTapCallback();
        } else {
            lastTap = now;
            Timer = setTimeout(() => {
                singleTapCallback();
            }, DOUBLE_PRESS_DELAY);
        }
    }

    const ShowHideOverlay = () => {
        handleDoubleTap(() => {
        }, () => {
            setoverlay(true)
            overlayTimer = setTimeout(() => setoverlay(false), 5000);
        })
    }
    const backward = () => {
        playerRef.current.seek(currentTime - 5);
        clearTimeout(overlayTimer);
        overlayTimer = setTimeout(() => setoverlay(false), 3000);
    }
    const forward = () => {
        playerRef.current.seek(currentTime + 5);
        clearTimeout(overlayTimer);
        overlayTimer = setTimeout(() => setoverlay(false), 3000);
    }
    const onslide = (slide) => {
        playerRef.current.seek(slide * duration);
        clearTimeout(overlayTimer);
        overlayTimer = setTimeout(() => setoverlay(false), 3000);
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
    const progress = ({ currentTime }) => setcurrentTime(currentTime);
    return (
        <View style={styles.container}>
            {Platform.OS === 'android' ?
                < View style={Fullscreen ? styles.fullscreenVideo : styles.video}>
                    <Video
                        source={{ uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' }}
                        style={{ ...StyleSheet.absoluteFill }}
                        ref={playerRef}
                        paused={paused}
                        repeat={true}
                        onLoad={load}
                        onProgress={progress}
                        rate={playbackRate}
                        resizeMode={"contain"}
                    // rate={1.0}
                    />
                    <View style={styles.overlay}>
                        {overlay ?
                            <View style={{ ...styles.overlaySet, backgroundColor: '#0006', alignItems: 'center', justifyContent: 'space-around' }}>
                                <TouchableOpacity onPress={backward} style={{ width: 50, height: 50 }}>
                                    <Image style={styles.icon} source={require('../google/forward7.png')} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setpaused(!paused)} style={{ width: 50, height: 50 }}>
                                    {paused ? (<Image style={styles.icon} source={require('../google/videopause4.png')} />) :
                                        (<Image style={styles.icon} source={require('../google/videoplay5.png')} />)}
                                </TouchableOpacity>
                                <TouchableOpacity onPress={forward} style={{ width: 50, height: 50 }}>
                                    <Image style={styles.icon} source={require('../google/forward4.png')} />
                                </TouchableOpacity>
                                <View style={styles.sliderCont}>
                                    <View style={{ ...styles.timer, alignItems: 'center' }}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={{ color: 'white' }}>{getTime(currentTime)}/</Text>
                                            <Text style={{ color: 'white' }}>{getTime(duration)}</Text>
                                        </View>
                                        <TouchableOpacity onPress={FullscreenToggle} style={{ margin: 5, }}>
                                            {Fullscreen ? (<Image style={{ width: 20, height: 20 }} source={require('../google/exit-full-screen-7.png')} />) :
                                                (<Image style={{ width: 20, height: 20 }} source={require('../google/images10.png')} />)}
                                        </TouchableOpacity>
                                        <View style={{ flexDirection: "column" }}>

                                            {show === true ? (<>
                                                <TouchableOpacity
                                                    style={{ alignSelf: "center" }}
                                                    onPress={() => setPlaybackRate(playbackRate + 0.25)}>
                                                    <Text style={{ textAlign: "center", color: "white" }}>Increase Speed</Text>
                                                </TouchableOpacity>

                                                <TouchableOpacity
                                                    style={{ marginTop: 30 }}
                                                    onPress={() => setPlaybackRate(playbackRate - 0.25)}
                                                >
                                                    <Text style={{ textAlign: "center", color: "white" }}>Decrease Speed</Text>
                                                </TouchableOpacity>

                                                <TouchableOpacity
                                                    style={{ marginTop: 30 }}
                                                    onPress={() => setPlaybackRate(1.0)}
                                                >
                                                    <Text style={{ textAlign: "center", color: "white" }}>Normal Speed</Text>
                                                </TouchableOpacity></>

                                            ) : (null)
                                            }
                                        </View>


                                        <TouchableOpacity
                                            onPress={() => setShow(!show)}
                                            style={{}}>
                                            <Image style={{ width: 30, height: 40 }} source={require('../google/images3.png')} />
                                        </TouchableOpacity>

                                    </View>
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
                            :
                            <View style={styles.overlaySet}>
                                <TouchableNativeFeedback onPress={ShowHideOverlay}><View style={{ flex: 1 }} /></TouchableNativeFeedback>
                            </View>
                        }
                    </View>

                </View>
                :
                // <View style={styles.video}>
                //     <Video
                //         source={{ uri: videoUri }}
                //         style={{ width: width, aspectRatio: width / (height - normalize(110)) }}
                //         controls
                //     // ref={(ref) => {
                //     //   this.player = ref;
                //     // }}
                //     />
                // </View>
                null
            }
            <View style={{ margiTop: 20, marginBottom: 30 }}>
                <TouchableOpacity
                    onPress={() => PipHandler.enterPipMode(300, 214)}
                    style={{ justifyContent: "center", alignItems: "center" }}>
                    <Text style={{ color: "red" }}>Click to Enter Pip Mode</Text>
                </TouchableOpacity>
            </View>

        </View >
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black'
    },
    // video: { width, height: width * .6, backgroundColor: 'black', justifyContent: 'center', alignItems: 'center' },
    video: { width: "100%", aspectRatio: width / (height - normalize(80)), backgroundColor: 'black', alignItems: 'center', justifyContent: 'center' },
    fullscreenVideo: {
        width: "100%",
        aspectRatio: 2 / 1,
        backgroundColor: 'black',
        ...StyleSheet.absoluteFill,
        elevation: 1
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
    },
    overlaySet: {
        flex: 1,
        flexDirection: 'row',
    },
    icon: {
        color: 'white',
        flex: 1,
        textAlign: 'center',
        textAlignVertical: 'center',
        width: 50,
        height: 20
    },
    TextStyle: {
        fontSize: 20, textAlign: 'center',
        marginVertical: 100, color: '#6200ee', fontWeight: 'bold'
    },
    sliderCont: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0
    },
    timer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 5
    },
});
export default VideoPlayerScreen;