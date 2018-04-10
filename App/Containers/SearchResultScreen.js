import React, { Component } from 'react'
import { ScrollView, View, Text, Image, FlatList, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import { Metrics, Colors } from '../Themes/'
import Icon from 'react-native-vector-icons/Entypo'

// Styles
import styles from './Styles/SearchResultScrenStyle'
import { NavigationActions } from 'react-navigation'

class SearchResultScreen extends Component {
  // constructor (props) {
  //   super(props)
  //   this.state = {}
  // }

  getRandomColor () {
    var letters = '0123456789ABCDEF'
    var color = '#'
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)]
    }
    return color
  }

  renderPhoto = (uri) => {
    console.log('uri', uri)
    return (
      <View
        style={{
          backgroundColor: this.getRandomColor(),
          width: Metrics.screenWidth / 3,
          height: Metrics.screenWidth / 3
        }}>
        <Image
          style={{
            width: '100%',
            height: '100%'
          }}
          source={{uri: uri}}
        />
      </View>
    )
  }

  renderBackButton = () => {
    return (
      <TouchableOpacity
        style={styles.backButton}
        onPress={this.props.goBack}>
        <Icon
          name={'chevron-left'}
          size={45}
          color={Colors.fire}
        />
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
    )
  }

  renderImages = () => {
    const {photos} = this.props
    return (
      <FlatList
        contentContainerStyle={{paddingTop: 20, paddingBottom: 30}}
        keyExtractor={(item, index) => index}
        data={photos.photos}
        numColumns={3}
        horizontal={false}
        renderItem={({item}) => this.renderPhoto(item)}
      />
    )
  }

  render () {
    return (
      <ScrollView style={styles.container}>
        {this.renderBackButton()}
        {this.renderImages()}
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    photos: state.search.photos
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    goBack: () => dispatch(NavigationActions.back())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResultScreen)
