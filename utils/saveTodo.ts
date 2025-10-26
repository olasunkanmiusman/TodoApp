import AsyncStorage from "@react-native-async-storage/async-storage";
import { Todo } from "../interfaces/todo";



export const saveTodo = async (title: string, description?: string): Promise<void> => {
  try { 
    const newTodo: Todo = {
      updatedAt: Date.now().toString(),
      id: Date.now().toString(),
      createdAt: Date.now().toString(),
      title,
      description,
      completed: false,
    };

    const existingData = await AsyncStorage.getItem("todos");
    const todos: Todo[] = existingData ? JSON.parse(existingData) : [];
 
    todos.push(newTodo);
 
    await AsyncStorage.setItem("todos", JSON.stringify(todos));

  } catch (error) {
    console.error("❌ Error saving todo:", error);
  }
};
