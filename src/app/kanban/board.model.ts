export interface Board {
  id?: string; // ? means optional
  title?: string;
  priority?: number;
  tasks?: Task[];
}

export interface Task {
  description?: string;
  label?: 'purple' | 'blue' | 'green' | 'yellow' | 'red' | 'gray';
}