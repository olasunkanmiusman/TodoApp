import AsyncStorage from "@react-native-async-storage/async-storage";
import { Todo } from "../interfaces/todo";


export const updateTodo = async (id: string, updates: Partial<Todo>): Promise<void> => {
  try {
    const data = await AsyncStorage.getItem("todos");
    let todos: Todo[] = data ? JSON.parse(data) : [];

    const index = todos.findIndex((todo) => todo.id === id);

    if (index === -1) {
      console.warn(`Todo with id "${id}" not found`);
      return;
    }
 
    todos[index] = { ...todos[index], ...updates };

    await AsyncStorage.setItem("todos", JSON.stringify(todos));
  } catch (error) {
    console.error("❌ Error updating todo:", error);
  }
};
