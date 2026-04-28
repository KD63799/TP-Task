import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface Task {
  id: number;
  title: string;
  done: boolean;
}

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  readonly tasks = signal<Task[]>([]);
  newTitle = '';
  private nextId = 1;

  readonly pendingCount = computed(() => this.tasks().filter((t) => !t.done).length);
  readonly doneCount = computed(() => this.tasks().filter((t) => t.done).length);

  addTask(): void {
    const title = this.newTitle.trim();
    if (!title) return;
    this.tasks.update((list) => [...list, { id: this.nextId++, title, done: false }]);
    this.newTitle = '';
  }

  toggleTask(id: number): void {
    this.tasks.update((list) => list.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  }

  deleteTask(id: number): void {
    this.tasks.update((list) => list.filter((t) => t.id !== id));
  }
}
