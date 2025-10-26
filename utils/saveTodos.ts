import AsyncStorage from "@react-native-async-storage/async-storage";
import { Todo } from "../interfaces/todo";


export const saveMultipleTodos = async (newTodos: Todo[]): Promise<void> => {
  try {
    const data = await AsyncStorage.getItem("todos");
    let existingTodos: Todo[] = data ? JSON.parse(data) : [];

    const todoMap = new Map<string, Todo>();

    // Add existing todos first
    for (const todo of existingTodos) {
      todoMap.set(todo.id as any, todo);
    }

    const now = Date.now().toString();

  
    newTodos.forEach((newTodo, index) => { 
      const id = newTodo.id || `${Date.now().toString()}_${index}`;

      if (todoMap.has(id)) {
        const existing = todoMap.get(id)!;
        todoMap.set(id, {
          ...existing,
          ...newTodo,
          id,
          createdAt: existing.createdAt || now,
          updatedAt: now,
        });
      } else {
        todoMap.set(id, {
          ...newTodo,
          id,
          createdAt: now,
          updatedAt: now,
          completed: newTodo.completed ?? false,
          title: newTodo.title || "",
          description: newTodo.description || "",
        });
      }
    });

    const mergedTodos = Array.from(todoMap.values());
    await AsyncStorage.setItem("todos", JSON.stringify(mergedTodos));
  } catch (error) {
    console.error("❌ Error saving multiple todos:", error);
  }
};
