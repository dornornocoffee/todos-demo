import { Component, inject } from '@angular/core';
import { TodosService } from '../../service/todo.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  todoService = inject(TodosService)
  text:string =''

  changeText(event: Event): void {
    const target = event.target as
    HTMLInputElement;
    this.text = target.value
  }

  addTodo(): void {
    this.todoService.addTodo(this.text)
    this.text = '';

  }
}
