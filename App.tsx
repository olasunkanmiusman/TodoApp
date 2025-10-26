import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddTaskScreen from "./screens/AddTaskScreen";
import TodoList from "./screens/TodoList";
import TodoDetailsScreen from "./screens/TodoDetailsScreen";
import Header from "./Components/header";

export type RootStackParamList = {
  Drawer: undefined;
  TodoDetails: { id: string };
};

export type RootDrawerParamList = {
  TodoList: undefined;
  AddTask: undefined;
};

const Drawer = createDrawerNavigator<RootDrawerParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

const DrawerNavigator = () => (
  <Drawer.Navigator
    screenOptions={({ navigation }: any) => ({
      header: () => <Header navigation={navigation} />,
    })}
  >
    <Drawer.Screen name="Todo List"  component={TodoList} />
    <Drawer.Screen name="Add Task" component={AddTaskScreen} />
  </Drawer.Navigator>
);

const App: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator
         screenOptions={{ headerShown: false }}
         >
          <Stack.Screen name="Drawer" component={DrawerNavigator} />
          <Stack.Screen name="TodoDetails" 
           options={{
    headerShown: true,
    title: "More details",
    headerStyle: {
      backgroundColor: "purple",
    },
    headerTintColor: "white", // sets back arrow and title text color
    headerTitleStyle: {
      fontWeight: "bold",
    },
  }}
         component={TodoDetailsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;