import AsyncStorage from "@react-native-async-storage/async-storage";
import { Todo } from "../interfaces/todo";

export const deleteTodo = async (id: string): Promise<void> => {
  try {
    const data = await AsyncStorage.getItem("todos");
    let todos: Todo[] = data ? JSON.parse(data) : []; 
    todos = todos.filter((todo) => todo.id !== id); 
    await AsyncStorage.setItem("todos", JSON.stringify(todos));
  } catch (error) {
    console.error("❌ Error deleting todo:", error);
  }
};
