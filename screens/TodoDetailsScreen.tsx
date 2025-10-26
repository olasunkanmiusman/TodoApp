import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable, Alert } from "react-native";
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootDrawerParamList } from "../App"; // make sure path is correct
import { getTodoById } from "../utils/getTodoById";
import { deleteTodo } from "../utils/deleteTodo";
import { useNavigation } from "@react-navigation/native";
import { formatDateTime } from "../utils/formatDateTime";
import { updateTodo } from "../utils/updateTodo";
import { Todo } from "../interfaces/todo";

type Props = NativeStackScreenProps<RootDrawerParamList, "TodoDetails">;
type NavigationProp = NativeStackNavigationProp<RootDrawerParamList>;
const TodoDetailsScreen: React.FC<Props> = ({ route }) => {
  const { id } = route.params; 
const [result, setResult] = useState<Todo | undefined>(undefined)
const navigate = useNavigation<NavigationProp>()
    useEffect(() => {
getTodoById(id).then((data: any) => setResult(data))
    },[id])  
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Title: {result?.title}</Text> 
      <Text style={styles.text}>Description: {result?.description}</Text>
      <Text style={styles.text}>Date Created: {formatDateTime(result?.createdAt || '')}</Text>
    { result?.createdAt !== result?.updatedAt &&  <Text style={styles.text}>Last Updated: {formatDateTime(result?.updatedAt || '')}</Text> }
      <Text style={{...styles.text, marginBottom: 20}}>Status: {result?.completed ? "Completed" : "Not Completed"}</Text> 
      
         <Pressable     onPress={() => {
                         Alert.alert(
  `Move to ${result?.completed ? "uncompleted" : 'completed'}`,
  `Are you sure you want to move this todo to ${result?.completed ? "uncompleted" : 'completed'}?`,
  [
    { text: "Cancel", style: "cancel" },
    {
      text: "Yes",
      style: "destructive",
      onPress: () =>  updateTodo(id, {completed: !result?.completed,  updatedAt: Date.now().toString()}).then(data => navigate.replace("Drawer")),
    },
  ]
)
              }}           
                style={{
                  width: "100%",
                  marginTop: 10,
                  backgroundColor: "purple",
                  borderRadius: 8,
                  padding: 10,
                }}
              >
                <Text
                  style={{ color: "white", fontWeight: "bold", textAlign: "center" }}
                >
               Move to {result?.completed ? "uncompleted" : "completed"}
                </Text>
              </Pressable>

      
              <Pressable     onPress={() => {
                         Alert.alert(
  "Delete Todo",
  "Are you sure you want to delete this todo?",
  [
    { text: "Cancel", style: "cancel" },
    {
      text: "Delete",
      style: "destructive",
      onPress: () =>  deleteTodo(id).then(data => navigate.replace("Drawer")),
    },
  ]
)
              }}           
                style={{
                  width: "100%",
                  marginTop: 10,
                  backgroundColor: "red",
                  borderRadius: 8,
                  padding: 10,
                }}
              >
                <Text
                  style={{ color: "white", fontWeight: "bold", textAlign: "center" }}
                >
                 Delete Todo
                </Text>
              </Pressable>
    </View>
  );
};

export default TodoDetailsScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10},
  text: { fontSize: 18, marginTop: 6 },
});
