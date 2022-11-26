import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const PostItem = () => {
  return (
    <TouchableOpacity style={styles.Border}>
      <Text style={{width: 250}}>
        Co chuyen di sang mai tu Quan 1 ve Thu Duc, ai can di nho thi lien he
        0123456789
      </Text>
      <View style={{flexDirection: 'column'}}>
        <View></View>
        <View>
          <View>
            <Icon name="location" size={30} color="#900" />
            <Text>27/07/2022, 10h</Text>
          </View>
          <View>
            <Icon name="calendar" type="evilicon" color="black" />
            <Text>27/07/2022, 10h</Text>
          </View>
          <View>
            <Icon name="calendar" type="evilicon" color="black" />
            <Text>27/07/2022, 10h</Text>
          </View>
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
    padding: 20,
    flexDirection: 'row',
  },
});
