import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/common/interfaces/commonInterfaces';
import { DevelopmentService } from 'src/app/common/services/development.service';
import { ToastService } from 'src/app/common/services/toast.service';
import { UserService } from 'src/app/common/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'] // Fixed typo from 'styleUrl' to 'styleUrls'
})
export class UsersComponent implements OnInit {
  changePageSize($event: number) {
    throw new Error('Method not implemented.');
  }
  users: any[] = [];
  pagination: any = {};
  currentPage: number = 1; // Track current page for pagination
  limit: number = 10; // Number of users per page
  availableRoles: string[] = ['master', 'admin', 'moderator', 'curator', 'poster creator', 'premium user', 'free user', 'guest'];
  constructor(private userService: UserService, private toastService: ToastService, private DS: DevelopmentService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(page: number = this.currentPage): void {
    this.userService.getAllUsers({ page, limit: this.limit }).subscribe(
      (response) => {
        this.users = response.users;
        this.pagination = response.pagination;
        this.currentPage = response.pagination.currentPage;
      },
      (error) => {
        this.toastService.show(error.error.error, { class: 'bg-danger', title: 'Error fetching users:' });
      }
    );
  }

  changePage(page: number): void {
    this.loadUsers(page);
  }
  updateUserRole(userId: string, newRole: string): void {
    if (confirm(`Are you sure you want to assign the role "${newRole}" to this user? ${userId}`)) {
      this.userService.updateUser(userId, { roles: newRole }).subscribe(
        (response) => {
          this.toastService.show('User role updated successfully!', { class: 'bg-success', title: 'Success:' });
          this.loadUsers(); // Refresh the user list
        },
        (error) => {
          this.toastService.show(error.error.error, { class: 'bg-danger', title: 'Error updating role:' });
        }
      );
    }
  }
  private apiUrl = environment.MasterApi + '/auth/profile-image/';
  validateImage(username: string): string {
    const imageUrl = username
      ? `${this.apiUrl + username}?format=png&quality=10`
      : `https://dummyimage.com/300x300/F4F4F4/000000&text=USER`;
    return imageUrl;
  }
  makeCall(number: string) {
    this.DS.makeCall(number)
    return false;
  }
  sendMail(email: string, subject: string = '', body: string = '') {
    this.DS.sendMail(email, subject, body);
    return false;
  }
}
