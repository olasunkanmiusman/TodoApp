export interface Todo {
  id?: string;
  title: string;
  description?: string;
  completed?: boolean;
  createdAt?: string; 
  updatedAt?: string;
}

export interface TodoFilter {
  startDate?: Date;
  endDate?: Date;
  completed?: boolean | undefined;
}