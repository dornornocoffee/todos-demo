import { Component, computed, inject } from '@angular/core';
import { TodosService } from '../../service/todo.service';
import { CommonModule } from '@angular/common';
import { FilterEnum } from '../../types/filter.enum';
import { TodoComponent } from "../todo/todo.component";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, TodoComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  todoService = inject(TodosService)
  editingId: string | null = null

  visibleTodos = computed(() => {
    const todos = this.todoService.todosSig()
    const filter = this.todoService.filterSig()

    if (filter === FilterEnum.active){
      return todos.filter((todo) => !todo.isCompleted)
    } else if (filter === FilterEnum.completed) {
      return todos.filter((todo) => todo.isCompleted)
    }
    return todos
  })

  isAllTodosSelected = computed(()=> this.todoService.todosSig().every((todo)=> todo.isCompleted))

  setEditingId(editingId: string|null): void {
    this.editingId = editingId
  }

  toggleAllTodos(event: Event): void {
    const target = event.target as HTMLInputElement
    this.todoService.toggleAll(target.checked)
  }
}
