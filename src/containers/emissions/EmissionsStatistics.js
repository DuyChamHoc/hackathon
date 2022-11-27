import {View, StyleSheet, Text} from 'react-native';
import React from 'react';
import {color} from '../../assets/colors/color';
import DropDownPicker from 'react-native-dropdown-picker';
import {useState} from 'react';
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryLabel,
  VictoryLegend,
  VictoryLine,
  VictoryScatter,
} from 'victory-native';
import {ScrollView} from 'react-native-gesture-handler';

const data = [
  {x: 'Jan 2021', y: 13},
  {x: 'Feb 2021', y: 12},
  {x: 'Mar 2021', y: 5},
  {x: 'Apr 2021', y: 11},
  {x: 'May 2021', y: 14},
  {x: 'Jun 2021', y: 25},
  {x: 'Jul 2021', y: 46},
  {x: 'Aug 2021', y: 50},
];

const sum = 50 * 120;
const tick = [
  {x: 'Jun 2022'},
  {x: 'Jul 2022'},
  {x: 'Aug 2022'},
  {x: 'Sep 2022'},
  {x: 'Oct 2022'},
  {x: 'Nov 2022'},
  {x: 'Dec 2022'},
];

const data1 = [
  {x: 'Jan 2021', y: '300$'},
  {x: 'Feb 2021', y: '320$'},
  {x: 'Mar 2021', y: '650$'},
  {x: 'Apr 2021', y: '380$'},
  {x: 'May 2021', y: '500$'},
  {x: 'Jun 2021', y: '470$'},
  {x: 'Jul 2021', y: '380$'},
  {x: 'Aug 2021', y: '400$'},
  {x: 'Sep 2021', y: '800$'},
  {x: 'Oct 2021', y: '730$'},
  {x: 'Nov 2021', y: '716$'},
  {x: 'Dec 2021', y: '100$'},
  {x: 'Jan 2022', y: '309$'},
  {x: 'Feb 2022', y: '320$'},
  {x: 'Mar 2022', y: '650$'},
  {x: 'Apr 2022', y: '380$'},
  {x: 'May 2022', y: '500$'},
  {x: 'Jun 2022', y: '470$'},
  {x: 'Jul 2022', y: '380$'},
  {x: 'Aug 2022', y: '480$'},
  {x: 'Sep 2022', y: '800$'},
  {x: 'Oct 2022', y: '730$'},
  {x: 'Nov 2022', y: '760$'},
  {x: 'Dec 2022', y: '100$'},
];
const EmissionsStatistics = () => {
  return (
    <View style={styles.container}>
      <VictoryChart
        height={280}
        width={400}
        style={{background: {fill: color.LightGrey}}}>
        <VictoryLabel x={25} y={30} style={styles.labelOne} text={'Km'} />

        <VictoryBar
          name="Bar-1"
          data={data}
          alignment="start"
          style={{data: {fill: color.greenop}}}
          events={[
            {
              target: 'data',
              childName: 'Bar-1',
              eventHandlers: {
                onClick: () => ({
                  target: 'data',
                  mutation: () => ({style: {fill: 'orange'}}),
                }),
              },
            },
          ]}
        />
        <VictoryAxis
          tickValues={tick}
          style={{
            tickLabels: {
              fontSize: 10,
              padding: 50,
              angle: -90,
              verticalAnchor: 'middle',
              textAnchor: 'start',
            },
          }}
        />

        <VictoryAxis
          dependentAxis
          orientation="left"
          standalone={false}
          style={{
            tickLabels: {padding: 10, fontSize: 10},
          }}
        />

        {/* <VictoryLegend
          x={125}
          y={500}
          orientation="horizontal"
          gutter={20}
          style={{title: {fontSize: 20}}}
          data={[
            {name: 'Average PSF', symbol: {fill: colors.DarkBlue}},
            {
              name: 'Resale',
              symbol: {fill: colors.LightBlue, type: 'square'},
            },
          ]}
        /> */}
      </VictoryChart>

      <View style={{paddingHorizontal: 20}}>
        <Text
          style={{
            fontWeight: 'bold',
            marginTop: 20,
            marginLeft: 10,
            fontSize: 18,
            color: 'black',
            marginBottom: 5,
          }}>
          Let's calculate CO2 emissions
        </Text>

        <Text
          style={{
            fontWeight: 'bold',
            marginTop: 20,
            marginLeft: 10,
            color: color.green1,
            justifyContent: 'center',
            marginBottom: 10,
          }}>
          Your CO2 emissions last month
        </Text>

        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Text
            style={{
              fontWeight: 'bold',
              marginTop: 20,
              marginLeft: 10,
              fontSize: 50,
              color: color.green1,
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 10,
            }}>
            {sum}
          </Text>
          <Text
            style={{
              fontWeight: 'bold',
              marginTop: 40,
              marginLeft: 10,

              color: color.green1,
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 10,
            }}>
            g CO2/ Km
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  labelOne: {
    fill: color.green,
    fontWeight: 'bold',
  },

  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
export default EmissionsStatistics;
