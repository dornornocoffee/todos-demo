import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { TodosService } from '../../service/todo.service';
import { FilterEnum } from '../../types/filter.enum';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  todoService = inject(TodosService)
  filterSig = this.todoService.filterSig;
  filterEnum = FilterEnum
  activeCount = computed(()=> {
    return this.todoService.todosSig().filter((todo) => !todo.isCompleted).length
  })
  
  itemLeftText = computed(()=> `item${this.activeCount() !== 1 ? 's' : ' '} left`)

  changeFilter(event: Event, filterName: FilterEnum): void {
    event.preventDefault()
    this.todoService.changeFilter(filterName)
  }
}
