import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import { saveTodo } from "../utils/saveTodo";
import { Link } from "expo-router";
import { RootDrawerParamList, } from "../App";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack" 
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons"; 
import { saveMultipleTodos } from "../utils/saveTodos";
import FAB from "../Components/fab";  
import { Todo } from "../interfaces/todo";

type NavigationProp = NativeStackNavigationProp<RootDrawerParamList>;

const AddTaskScreen: React.FC = () => {
  const [error, setError] = useState("");
  const [form, setForm] = useState<Todo[]>([{title: ''}]);
  const handleSave = async () => {
    const hasEmptyTitle = form.some((todo) => !todo.title?.trim());
    if (hasEmptyTitle) {
      setError("All todos must have a title");
      return;
    }
    saveMultipleTodos(form).then(() => {
      setForm([{title: ''}]);
      navigation.navigate("Drawer",{
        screen: "Todo List"
      });
    });
  };
  const navigation = useNavigation<NavigationProp>(); 
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Add Todo</Text> 
      <FAB form={form} setForm={setForm}/> 
      <View style={styles.formContainer}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          {form.map((formm: Todo, index: number) => (
            <View key={index} style={{display: 'flex', gap: 15, marginTop: 15}}>
          <View>    
            <Text style={styles.label}>Title</Text>
              <TextInput
                value={formm.title}
                onChangeText={(val) =>
                  setForm((prev) =>
                    prev.map((item, i) =>
                      i === index ? { ...item, title: val } : item
                    )
                  )
                }
                style={styles.input}
              /> 
              </View>
              <View>
                <Text style={styles.label}>Description</Text>
                <TextInput
                  value={formm.description}
                  onChangeText={(val) =>
                    setForm((prev) =>
                      prev.map((item, i) =>
                        i === index ? { ...item, description: val } : item
                      )
                    )
                  }
                  multiline
                  style={{ ...styles.input, height: 60, verticalAlign: "top" }}
                />
              </View>
              <View style={styles.addRemoveContainer}>
                <Pressable
                  onPress={() =>
                    setForm([
                      ...form,
                      {
                        title: "",
                      },
                    ])
                  }
                  style={styles.addRemove}
                >
                  <MaterialCommunityIcons
                    name="plus"
                    color={"white"}
                    size={16}
                  />
                </Pressable>
           {  form.length > 1 &&    <Pressable
                  onPress={() => {
                    setForm((prev) => prev.filter((_, i) => i !== index));
                  }}
                  style={styles.addRemove}
                >
                  <MaterialCommunityIcons
                    name="minus"
                    color={"white"}
                    size={16}
                  />
                </Pressable>}
              </View>
            </View>
          ))}
        </ScrollView>
        <Pressable
          onPress={handleSave}
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
            Submit
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    paddingHorizontal: 20, 
    gap: 15,
    display: "flex",
    flexDirection: "column", paddingBottom: 200
  },
  input: {
    borderWidth: 0.6,
    borderRadius: 12,
    marginTop: 5,
    borderColor: "purple",
    width: "100%",
    padding: 10,
    paddingHorizontal: 12,
  },
  label: { fontWeight: "semibold", fontSize: 14,  },
  container: {
    backgroundColor: "white",
    flex: 1,
    paddingHorizontal: 10,
  },
  heading: {
    textAlign: "center",
    marginTop: 15,
    fontWeight: "bold",
    fontSize: 20,
  },
  addRemoveContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center", marginTop: 10
  },
  addRemove: { backgroundColor: "purple", padding: 4, borderRadius: 8 },
});
export default AddTaskScreen;
