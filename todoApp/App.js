import { StatusBar } from 'expo-status-bar';
import React, {useState, useCallback, useMemo, useEffect} from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity} from 'react-native';
import { NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5 } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLoading from 'expo-app-loading';

import {Calendar, CalendarList, Agenda} from 'react-native-calendars';

import { Container } from './styles/appStyles';
import Home from "./components/Home"
import PomodoroTimer from './components/PomodoroTimer'

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === 'Tasks') {
              iconName = 'tasks'
            } else if (route.name === 'Calendar') {
              iconName = 'calendar-alt'
            } else if (route.name === 'Timer') {
              iconName = 'user-clock'
            }
            return <FontAwesome5 name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#ff73c0',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Tasks" component={HomeScreen} />
        <Tab.Screen name="Timer" component={TimerScreen} />
        {/* <Tab.Screen name="Calendar" component={CalendarScreen} /> */}
      </Tab.Navigator>
    </NavigationContainer>
  );
}

function HomeScreen() {

  const taskTest = [];
  const [todos, setTodos] = useState(taskTest);
  const [ready, setReady] = useState(false);
  
  //Take item from async storage
  const loadTodos = async () => {
    await AsyncStorage.getItem("storedTodos").then(data => {
      if(data != null) {
        const jsonValue = JSON.parse(data)
        setTodos(jsonValue)
      }
    }).catch((error) => console.log(error));
  }

  //Load the application
  if(!ready) {
    return(
      <AppLoading
        startAsync={loadTodos}
        onFinish={() => setReady(true)}
        onError={console.warn}
      />
    )
  }

  return (
    <Container>
      <Home todos={todos} setTodos={setTodos}/>
      <StatusBar style="auto" />
    </Container>
  );
}

function TimerScreen() {
  return(
    <ScrollView style={styles.container}>
        <PomodoroTimer />
    </ScrollView>
    )
}

//In development
function CalendarScreen() {

  async function createEventAsync(calID) {
    var data = {
      calendarId:calID,
      allDay:true,
      availability:Calendar.Availability.FREE,
      startDate:Date.now(),
      endDate:Date.now(),
      id: 1,
      location: "your house",
      notes:"notes",
      status:Calendar.EventStatus.CONFIRMED,
      recurrenceRule: Calendar.Frequency.DAILY,
      timeZone:"UTC+8",
      title:"family dinnerz",
      alarms:[],

      title:"test your house",
      startDate:Date.now(),
      endDate:Date.now()

    }
    const eventID = await Calendar.createEventAsync(calID, data)
    console.log("your new: " + eventID)
  }

  async function getDefaultCalendarSource() {
    const defaultCalendar = await Calendar.getDefaultCalendarAsync();
    return defaultCalendar.source;
  }
  
  async function createCalendar() {
    const defaultCalendarSource =
      Platform.OS === 'ios'
        ? await getDefaultCalendarSource()
        : { isLocalAccount: true, name: 'Expo 1 Calendar' };
        console.log("debug")
        console.log(defaultCalendarSource)
    const newCalendarID = await Calendar.createCalendarAsync({
      title: 'Expo 1 Calendar',
      color: 'blue',
      entityType: Calendar.EntityTypes.EVENT,
      sourceId: defaultCalendarSource.id,
      source: defaultCalendarSource,
      name: 'internalCalendarName',
      ownerAccount: 'personal',
      accessLevel: Calendar.CalendarAccessLevel.OWNER,
    });
    console.log(`Your new calendar ID is: ${newCalendarID}`);
    await createEventAsync("5802D334-58F0-42E8-BF04-F2F80EB37CC0")
    await createEventAsync(defaultCalendarSource.id)
  }

  useEffect(() => {
    (async () => {
      const { status } = await Calendar.requestCalendarPermissionsAsync();
      if (status === 'granted') {
        const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
        console.log('Here are all your calendars:');
        console.log({ calendars });
        console.log("creating a new event")
      }
    })();
  }, []);

  const initialDate = '2022-08-29';
  const nextWeekDate = '2022-09-05';
  const nextMonthDate = '2022-09-29';

  const [selected, setSelected] = useState(initialDate);

  const onDayPress = useCallback((day: DateData) => {
    console.log(day.dateString)
    setSelected(day.dateString);
  }, []);

  const marked = useMemo(() => {
    return {
      [nextWeekDate]: {
        selected: selected === nextWeekDate,
        selectedTextColor: '#5E60CE',
        marked: true
      },
      [nextMonthDate]: {
        selected: selected === nextMonthDate,
        selectedTextColor: '#5E60CE',
        marked: true
      },
      [selected]: {
        selected: true,
        disableTouchEvent: true,
        selectedColor: '#5E60CE',
        selectedTextColor: 'white'
      }
    };
  }, [selected]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View style={{ flex: 10, justifyContent: 'center', alignItems: 'center' }}>
        <CalendarList
          // Callback which gets executed when visible months change in scroll view. Default = undefined
          onVisibleMonthsChange={(months) => {console.log('now these months are visible', months);}}
          // Max amount of months allowed to scroll to the past. Default = 50
          pastScrollRange={3}
          // Max amount of months allowed to scroll to the future. Default = 50
          futureScrollRange={3}
          // Enable or disable scrolling of calendar list
          scrollEnabled={true}
          // Enable or disable vertical scroll indicator. Default = false
          showScrollIndicator={true}
          onDayPress={onDayPress}
          markedDates={marked}
        />
      </View>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <TouchableOpacity style={styles.addButton}>
          <View>
            <Text style={styles.textAdd}>
              Add Date
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightpink',
  },

});