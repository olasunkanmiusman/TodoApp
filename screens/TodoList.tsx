import { FlatList, Pressable, ScrollView, StyleSheet, Text, View } from "react-native" 
import { DateType } from "react-native-ui-datepicker";
import React, { useCallback, useEffect, useState } from "react";
import FilterSection from "../Components/todoFilter";
import { getAllTodos } from "../utils/getAllTodos";
import { formatDateTime } from "../utils/formatDateTime";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootDrawerParamList } from "../App";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Todo } from "../interfaces/todo";
type NavigationProp = NativeStackNavigationProp<RootDrawerParamList>;

const TodoList : React.FC = () => {
    const navigation = useNavigation<NavigationProp>();
  
       const [selected, setSelected] = useState<boolean | undefined>(undefined); 
       const [selectedDate, setSelectedDate] = useState<{
    startDate: DateType;
    endDate: DateType;
  }>({
    startDate: undefined,
    endDate: undefined,
  });  
    const [results, setResults] = useState<Todo[]>([])
     const toJSDate = (value?: DateType | null): Date | undefined => {
  if (!value) return undefined; // handle undefined/null
  if (value instanceof Date) return value;
  if (typeof value === "string" || typeof value === "number") return new Date(value);
  if (typeof value === "object" && "toDate" in value && typeof (value as any).toDate === "function") {
    return (value as any).toDate();
  }
  throw new Error("Invalid date value");
};      useFocusEffect(
  useCallback(() => {
    getAllTodos({
      completed: selected,
      endDate: toJSDate(selectedDate.endDate),
      startDate: toJSDate(selectedDate.startDate),
    }).then(data => setResults(data));
  }, [selected, selectedDate])
);
    return <View style={{padding: 10}}>
<FilterSection selected={selected} selectedDate={selectedDate}
  setSelected={setSelected} setSelectedDate={setSelectedDate}
/>

{results?.length > 0 ? <FlatList
      data={results}
      contentContainerStyle={styles.listContainer}
      // keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Pressable
         onPress={() => navigation.navigate("TodoDetails", { id: item.id })}
          style={styles.itemContainer}
        >
          <View style={styles.textContainer}>
            <Text numberOfLines={1} style={styles.nameText}>
              {item.title}
            </Text>
            <Text style={styles.emailText}>{formatDateTime(item.createdAt || '')}</Text>
          </View>

          <Text style={styles.balanceText}>
            {item.completed ? "Completed" : "Not Completed"}
          </Text>
        </Pressable>
      )}
    />: <Text style={{margin: 20, fontWeight: '700', fontSize: 20}}>No Task Found</Text>}
    </View>
}

export default TodoList

const styles = StyleSheet.create({
  listContainer: {
    marginTop: 24, 
    paddingBottom: 100, 
    paddingHorizontal: 8, 
  },
  itemContainer: {
    margin: 8, 
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textContainer: {
    flex: 1,
    marginRight: 8, // space between text and balance
  },
  nameText: {
    textTransform: "capitalize",
    color: "#000",
    fontWeight: "500", // font-medium
    fontSize: 16,
  },
  emailText: {
    fontSize: 12, // text-xss
    color: "#333",
  },
  balanceText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000",
  },
});