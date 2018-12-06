import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, Slider, Dimensions, AsyncStorage } from 'react-native';
import { Expo, Asset, Audio, FileSystem, Font, Permissions } from 'expo';
import { Topics } from '../Themes'
import { Icon } from 'react-native-elements'

const uris = [];

const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get('window');
const BACKGROUND_COLOR = '#FFF8ED';
const LIVE_COLOR = '#FF0000';
const DISABLED_OPACITY = 0.5;
const RATE_SCALE = 3.0;

export default class YoungTopicScreen extends React.Component {
  constructor(props) {
    super(props);
    this.recording = null;
    this.sound = null;
    this.isSeeking = false;
    this.shouldPlayAtEndOfSeek = false;
    this.state = {
      haveRecordingPermissions: false,
      isLoading: false,
      isPlaybackAllowed: false,
      muted: false,
      soundPosition: null,
      soundDuration: null,
      recordingDuration: null,
      shouldPlay: false,
      isPlaying: false,
      isRecording: false,
      fontLoaded: false,
      shouldCorrectPitch: true,
      volume: 1.0,
      rate: 1.0,
      recording: "test",
    };
    this.recordingSettings = JSON.parse(JSON.stringify(Audio.RECORDING_OPTIONS_PRESET_LOW_QUALITY));
  }

  componentDidMount() {
    this._askForPermissions();
  }

  _askForPermissions = async () => {
    const response = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
    this.setState({
      haveRecordingPermissions: response.status === 'granted',
    });
  };

  _updateScreenForSoundStatus = status => {
    if (status.isLoaded) {
      this.setState({
        soundDuration: status.durationMillis,
        soundPosition: status.positionMillis,
        shouldPlay: status.shouldPlay,
        isPlaying: status.isPlaying,
        rate: status.rate,
        muted: status.isMuted,
        volume: status.volume,
        shouldCorrectPitch: status.shouldCorrectPitch,
        isPlaybackAllowed: true,
      });
    } else {
      this.setState({
        soundDuration: null,
        soundPosition: null,
        isPlaybackAllowed: false,
      });
      if (status.error) {
        console.log(`FATAL PLAYER ERROR: ${status.error}`);
      }
    }
  };

  _updateScreenForRecordingStatus = status => {
    if (status.canRecord) {
      this.setState({
        isRecording: status.isRecording,
        recordingDuration: status.durationMillis,
      });
    } else if (status.isDoneRecording) {
      this.setState({
        isRecording: false,
        recordingDuration: status.durationMillis,
      });
      if (!this.state.isLoading) {
        this._stopRecordingAndEnablePlayback();
      }
    }
  };

  async _stopPlaybackAndBeginRecording() {
    this.setState({
      isLoading: true,
    });
    if (this.sound !== null) {
      await this.sound.unloadAsync();
      this.sound.setOnPlaybackStatusUpdate(null);
      this.sound = null;
    }
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      playThroughEarpieceAndroid: false
    });
    if (this.recording !== null) {
      this.recording.setOnRecordingStatusUpdate(null);
      this.recording = null;
    }

    const recording = new Audio.Recording();
    await recording.prepareToRecordAsync(this.recordingSettings);
    recording.setOnRecordingStatusUpdate(this._updateScreenForRecordingStatus);

    this.recording = recording;
    await this.recording.startAsync(); // Will call this._updateScreenForRecordingStatus to update the screen.
    this.setState({
      isLoading: false,
    });
  }

  async _stopRecordingAndEnablePlayback() {
    this.setState({
      isLoading: true,
    });
    try {
      await this.recording.stopAndUnloadAsync();
    } catch (error) {
      console.log(error); // eslint-disable-line
    }

    if (this.recording) {
      var fileUrl = this.recording.getURI();
      this.setState({ recording: fileUrl });
      try{
        var allKeys = await AsyncStorage.getAllKeys();
        console.log("all keys: ", allKeys);
        var numFiles = 0;
        if (allKeys !== undefined){
          numFiles = allKeys.length;
        }else{
          numFiles = 0;
        }

        var fileName = "question" + numFiles.toString();
        await AsyncStorage.setItem(fileName, fileUrl);
      } catch(error){

      }
    }

    //MAGIC HAPPENS HERE

    try {
      const testAudioUrl = await AsyncStorage.getItem('question2');
      const { sound: soundObject, status } = await Expo.Audio.Sound.createAsync(
        { uri: testAudioUrl },
        { shouldPlay: false }
      );
      await soundObject.playAsync();
      // Your sound is playing!
    } catch (error) {
      // An error occurred!
    }


    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      playsInSilentLockedModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      playThroughEarpieceAndroid: false
    });
    const { sound, status } = await this.recording.createNewLoadedSoundAsync(
      {
        isLooping: true,
        isMuted: this.state.muted,
        volume: this.state.volume,
        rate: this.state.rate,
        shouldCorrectPitch: this.state.shouldCorrectPitch,
      },
      this._updateScreenForSoundStatus
    );
    this.sound = sound;
    this.setState({
      isLoading: false,
    });
  }

  _onRecordPressed = () => {
    if (this.state.isRecording) {
      this._stopRecordingAndEnablePlayback();
    } else {
      this._stopPlaybackAndBeginRecording();
    }
  };

  _onPlayPausePressed = () => {
    if (this.sound != null) {
      if (this.state.isPlaying) {
        this.sound.pauseAsync();
      } else {
        this.sound.playAsync();
      }
    }
    // const soundObject = new Audio.Sound();
    // var uri = uris[0];
    // console.log(uri);
    // try {
    //   var uri = "" + this.uris[0];
    //   console.log(uri);
    //   await soundObject.loadAsync(require(uri));
    //   await soundObject.playAsync();
    //   // Your sound is playing!
    // } catch (error) {
    //   // An error occurred!
    // }
  };

  _onStopPressed = () => {
    if (this.sound != null) {
      this.sound.stopAsync();
    }
  };

  _onMutePressed = () => {
    if (this.sound != null) {
      this.sound.setIsMutedAsync(!this.state.muted);
    }
  };

  _onVolumeSliderValueChange = value => {
    if (this.sound != null) {
      this.sound.setVolumeAsync(value);
    }
  };

  _trySetRate = async (rate, shouldCorrectPitch) => {
    if (this.sound != null) {
      try {
        await this.sound.setRateAsync(rate, shouldCorrectPitch);
      } catch (error) {
        // Rate changing could not be performed, possibly because the client's Android API is too old.
      }
    }
  };

  _onRateSliderSlidingComplete = async value => {
    this._trySetRate(value * RATE_SCALE, this.state.shouldCorrectPitch);
  };

  _onPitchCorrectionPressed = async value => {
    this._trySetRate(this.state.rate, !this.state.shouldCorrectPitch);
  };

  _onSeekSliderValueChange = value => {
    if (this.sound != null && !this.isSeeking) {
      this.isSeeking = true;
      this.shouldPlayAtEndOfSeek = this.state.shouldPlay;
      this.sound.pauseAsync();
    }
  };

  _onSeekSliderSlidingComplete = async value => {
    if (this.sound != null) {
      this.isSeeking = false;
      const seekPosition = value * this.state.soundDuration;
      if (this.shouldPlayAtEndOfSeek) {
        this.sound.playFromPositionAsync(seekPosition);
      } else {
        this.sound.setPositionAsync(seekPosition);
      }
    }
  };

  _getSeekSliderPosition() {
    if (
      this.sound != null &&
      this.state.soundPosition != null &&
      this.state.soundDuration != null
    ) {
      return this.state.soundPosition / this.state.soundDuration;
    }
    return 0;
  }

  _getMMSSFromMillis(millis) {
    const totalSeconds = millis / 1000;
    const seconds = Math.floor(totalSeconds % 60);
    const minutes = Math.floor(totalSeconds / 60);

    const padWithZero = number => {
      const string = number.toString();
      if (number < 10) {
        return '0' + string;
      }
      return string;
    };
    return padWithZero(minutes) + ':' + padWithZero(seconds);
  }

  _getPlaybackTimestamp() {
    if (
      this.sound != null &&
      this.state.soundPosition != null &&
      this.state.soundDuration != null
    ) {
      return `${this._getMMSSFromMillis(this.state.soundPosition)} / ${this._getMMSSFromMillis(
        this.state.soundDuration
      )}`;
    }
    return '';
  }

  _getRecordingTimestamp() {
    if (this.state.recordingDuration != null) {
      return `${this._getMMSSFromMillis(this.state.recordingDuration)}`;
    }
    return `${this._getMMSSFromMillis(0)}`;
  }

  render() {
    //this contains all paramaters sent from previous profile screen
    const params = this.props.navigation.state.params;

    return (
      <View style={styles.container}>

        <View style={styles.categoryContainer}>
          <Image
            source={require('../../assets/images/recordPlayer.png')}
            style={styles.categoryImage}
          />
          <Text style={styles.categoryTitle}> On {(params !== undefined) ? params.topic : 'Sample Topic'} </Text>
        </View>

        <View style={styles.sampleQuestionsContainer}>
          <Text style={styles.sampleQuestionsTitle}> Sample Questions </Text>
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal
            data={params.questions}
            renderItem={({ item: rowData}) => {
              return (
                  <View style={styles.sampleQuestionCard}>
                    <Text> {rowData} </Text>
                  </View>
              );
            }}
            keyExtractor={(item, index) => params.questions[index]}
          />
        </View>


        <View style={styles.audioContainer}>
          <View style={styles.recordingContainer}>
            <TouchableOpacity
              style={styles.playerButton}
              onPress={this._onRecordPressed}
              disabled={this.state.isLoading}>
              <Icon name='mic' color='#FFFFFF' type='feather'/>
            </TouchableOpacity>
            <View style={styles.recordingDataContainer}>
              <Text style={styles.recordingTimestamp}>
                {this._getRecordingTimestamp()}
              </Text>
            </View>
          </View>

          <View style={styles.playbackContainer}>
            <Slider
              style={styles.playbackSlider}
              value={this._getSeekSliderPosition()}
              onValueChange={this._onSeekSliderValueChange}
              onSlidingComplete={this._onSeekSliderSlidingComplete}
              disabled={!this.state.isPlaybackAllowed || this.state.isLoading}
            />
            <Text style={styles.playbackTimestamp}>
              {this._getPlaybackTimestamp()}
            </Text>
          </View>
          <View style={[styles.buttonsContainerBase, styles.buttonsContainerTopRow]}>
            <View style={styles.playStopContainer}>
              <TouchableOpacity
                underlayColor={BACKGROUND_COLOR}
                style={styles.playerButton}
                onPress={this._onPlayPausePressed}
                disabled={!this.state.isPlaybackAllowed || this.state.isLoading}>
                <Icon
                  name={this.state.isPlaying ? "pause" : "play"}
                  type='feather'
                  color='#FFFFFF' />
              </TouchableOpacity>
            </View>
          </View>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryContainer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryImage: {
    width: 150,
    height: 150,
    resizeMode: 'contain'
  },
  categoryTitle: {
    fontSize: 36,
  },
  sampleQuestionsContainer: {
    flex: 2,
    alignItems:'flex-start',
    justifyContent: 'center',
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderColor: '#ededed',
    marginLeft: 20,
    marginRight: 20,
  },
  sampleQuestionsTitle: {
    fontSize: 28,
    marginTop:20,
  },
  sampleQuestionCard: {
    width: 120,
    height: 120,
    borderWidth: 2,
    borderRadius: 15,
    borderColor: '#ededed',
    margin: 15,
    marginBottom: 0,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  audioContainer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'column',
    padding: 15
  },
  recordingContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  playbackContainer:{
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    width:'100%'
  },
  playbackSlider:{
    width:400
  },
  image: {
    backgroundColor: '#ededed'
  },
  playerButton:{
    alignItems: 'center',
    justifyContent: 'center',
    height:50,
    width:50,
    borderRadius:25,
    backgroundColor: "#FF0000",
  }
});
