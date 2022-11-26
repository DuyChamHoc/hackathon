import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import Icon1 from 'react-native-vector-icons/MaterialIcons';

const PostItem = () => {
  return (
    <TouchableOpacity style={styles.Border}>
      <Text style={{width: 190}}>
        Co chuyen di sang mai tu Quan 1 ve Thu Duc, ai can di nho thi lien he
        0123456789
      </Text>
      <View style={{left: 10}}>
        <View style={{flexDirection: 'row'}}>
          <Icon name="calendar" size={25} color="black" />
          <Text style={{width: 115, left: 5}}>27/07/2022, 10h</Text>
        </View>
        <View style={{flexDirection: 'row', marginVertical: 5}}>
          <Icon name="location" size={25} color="black" />
          <Text style={{left: 5, width: 115}}>27/07/2022, 10h</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Icon1 name="my-location" size={25} color="black" />
          <Text style={{width: 115, left: 5}}>
            27/07/2022, 1dddddddddddddddddddddd
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PostItem;

const styles = StyleSheet.create({
  Border: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#6CC165',
    padding: 10,
    flexDirection: 'row',
    marginHorizontal: 10,
  },
});
