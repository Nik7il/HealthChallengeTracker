import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

interface Workout {
  type: string;
  minutes: number;
}

interface UserData {
  id: number;
  name: string;
  workouts: Workout[];
}

@Component({
  selector: 'app-explore',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './explore.component.html',
  styleUrl: './explore.component.css',
})
export class ExploreComponent {
  filterForm = new FormGroup({
    name: new FormControl(''),
    type: new FormControl('All'),
  });

  UserData: UserData[] | null = null;

  ngOnInit() {
    const initialUserData: UserData[] = [
      {
        id: 1,
        name: 'John Doe',
        workouts: [
          { type: 'Running', minutes: 30 },
          { type: 'Cycling', minutes: 45 }
        ]
      },
      {
        id: 2,
        name: 'Jane Smith',
        workouts: [
          { type: 'Swimming', minutes: 60 },
          { type: 'Running', minutes: 20 }
        ]
      },
      {
        id: 3,
        name: 'Mike Johnson',
        workouts: [
          { type: 'Yoga', minutes: 50 },
          { type: 'Cycling', minutes: 40 }
        ]
      }
    ];

    if (!localStorage.getItem('UserData')) {
      localStorage.setItem('UserData', JSON.stringify(initialUserData));
    }

    this.UserData = JSON.parse(localStorage.getItem('UserData') || '[]');
  }
  getWorkoutTypes(workouts: Workout[]): string {
    return workouts.map((workout) => workout.type).join(', ');
  }

  getTotalMinutes(workouts: Workout[]): number {
    return workouts.reduce((total, workout) => total + workout.minutes, 0);
  }

  filteredUserData(): UserData[] {
    // Retrieve the form values
    const formValue = this.filterForm.value;
    const UserData = JSON.parse(localStorage.getItem('UserData') || '[]');
    return UserData.filter((user: UserData) => {
      if (
        formValue.name &&
        !user.name.toLowerCase().includes(formValue.name.toLowerCase())
      ) {
        return false;
      }
      // for all workout types
      if (formValue.type === 'All') {
        return true;
      }
      if (formValue.type) {
        const workouts = user.workouts.filter(
          (workout) => workout.type === formValue.type
        );
        if (workouts.length === 0) {
          return false;
        }
      }
      return true;
    });
  }

  // pagination
  currentPage = 1;
  itemsPerPage = 2;
  pageChange(page: number) {
    this.currentPage = page;
  }

  prevPage() {
    this.currentPage--;
  }

  get totalPages() {
    return Math.ceil(this.filteredUserData().length / this.itemsPerPage);
  }

  nextPage() {
    this.currentPage++;
  }

  changeItemsPerPage(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.itemsPerPage = parseInt(target.value, 10);
  }

  get paginatedData() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredUserData().slice(
      startIndex,
      startIndex + this.itemsPerPage
    );
  }
}
