import AsyncStorage from "@react-native-async-storage/async-storage";
import { Todo, TodoFilter } from "../interfaces/todo";




export const getAllTodos = async (filter?: TodoFilter): Promise<Todo[]> => {
  try {
    const data = await AsyncStorage.getItem("todos");
    let todos: Todo[] = data ? JSON.parse(data) : [];

    if (!filter || (filter.startDate === undefined && filter.endDate === undefined && filter.completed === undefined)) {
      // Sort newest to oldest
      return todos.sort((a, b) => {
        const timeA = /^\d+$/.test(a.updatedAt || '') ? Number(a.updatedAt) : new Date(a.updatedAt || 0).getTime();
        const timeB = /^\d+$/.test(b.updatedAt || '') ? Number(b.updatedAt) : new Date(b.updatedAt || 0).getTime();
        return timeB - timeA;
      });
    }

    const { startDate, endDate, completed } = filter;

    const startTime = startDate ? new Date(startDate).setHours(0, 0, 0, 0) : undefined;
    const endTime = endDate ? new Date(endDate).setHours(23, 59, 59, 999) : undefined;

    todos = todos.filter((todo) => {
      const todoTime = /^\d+$/.test(todo.createdAt || '')
        ? Number(todo.createdAt)
        : new Date(todo.createdAt || 0).getTime();

      if (isNaN(todoTime)) return false;

      const withinDateRange =
        (!startTime || todoTime >= startTime) &&
        (!endTime || todoTime <= endTime);

      const matchesCompletion =
        completed === undefined ? true : todo.completed === completed;

      return withinDateRange && matchesCompletion;
    });

    // Sort newest to oldest
    return todos.sort((a, b) => {
      const timeA = /^\d+$/.test(a.updatedAt || '') ? Number(a.updatedAt) : new Date(a.updatedAt || 0).getTime();
      const timeB = /^\d+$/.test(b.updatedAt || '') ? Number(b.updatedAt) : new Date(b.updatedAt || 0).getTime();
      return timeB - timeA;
    });
  } catch (error) {
    console.error("❌ Error filtering todos:", error);
    return [];
  }
};



