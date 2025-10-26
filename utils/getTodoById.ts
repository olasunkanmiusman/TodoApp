import AsyncStorage from "@react-native-async-storage/async-storage";
import { Todo } from "../interfaces/todo";

export const getTodoById = async (id: string): Promise<Todo | null> => {
  try {
    const data = await AsyncStorage.getItem("todos");
    if (!data) return null;

    const todos: Todo[] = JSON.parse(data);
    const todo = todos.find(t => t.id === id) || null;

    return todo;
  } catch (error) {
    console.error("❌ Error getting todo by ID:", error);
    return null;
  }
};