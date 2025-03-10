import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/common/interfaces/commonInterfaces';
import { AuthService } from 'src/app/common/services/auth.service';
import { DevelopmentService } from 'src/app/common/services/development.service';
import { ToastService } from 'src/app/common/services/toast.service';
import { UserService } from 'src/app/common/services/user.service';
import { environment } from 'src/environments/environment';
declare const bootstrap: any;
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'], // Fixed typo from 'styleUrl' to 'styleUrls'
})
export class UsersComponent implements OnInit {
  changePageSize(newLimit: number): void {
    this.limit = newLimit;
    this.currentPage = 1; // Reset to first page when changing page size
    this.loadUsers();
  }
  users: any[] = [];
  pagination: any = {};
  currentPage: number = 1; // Track current page for pagination
  limit: number = 10; // Number of users per page
  availableRoles: string[] = [
    'master',
    'admin',
    'moderator',
    'curator',
    'poster creator',
    'premium user',
    'free user',
    'guest',
    'user',
  ];

  selectedUser: any = null;
  selectedRoles: { [key: string]: boolean } = {};
  @ViewChild('rolesModal') rolesModal!: ElementRef;
  constructor(
    private userService: UserService,
    private toastService: ToastService,
    private DS: DevelopmentService,
    public authService: AuthService
  ) {}

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
        this.toastService.show(error.error.error, {
          class: 'bg-danger',
          title: 'Error fetching users:',
        });
      }
    );
  }

  changePage(page: number): void {
    this.loadUsers(page);
  }
  updateUserRole(userId: string, newRole: string): void {
    if (
      confirm(
        `Are you sure you want to assign the role "${newRole}" to this user? ${userId}`
      )
    ) {
      this.userService.updateUser(userId, { roles: newRole }).subscribe(
        (response) => {
          this.toastService.show('User role updated successfully!', {
            class: 'bg-success',
            title: 'Success:',
          });
          this.loadUsers(); // Refresh the user list
        },
        (error) => {
          this.toastService.show(error.error.error, {
            class: 'bg-danger',
            title: 'Error updating role:',
          });
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
    this.DS.makeCall(number);
    return false;
  }
  sendMail(email: string, subject: string = '', body: string = '') {
    this.DS.sendMail(email, subject, body);
    return false;
  }
  modal: any;
  openRolesModal(user: any): void {
    if (!this.authService.hasRole(['master'])) {
      this.toastService.show('Only master users can modify roles', {
        class: 'bg-danger',
        title: 'Permission Denied',
      });
      return;
    }
    this.selectedUser = user;
    this.availableRoles.forEach((role) => {
      this.selectedRoles[role] = user.roles.includes(role);
    });
    this.modal = new bootstrap.Modal(this.rolesModal.nativeElement);
    this.modal.show();
  }
  updateRoles(): void {
    const newRoles = this.availableRoles.filter(
      (role) => this.selectedRoles[role]
    );

    if (confirm(`Update roles for ${this.selectedUser.fullname}?`)) {
      console.log(this.selectedUser);
      this.userService
        .updateUser(this.selectedUser.id, { roles: newRoles.join(', ') })
        .subscribe({
          next: (response) => {
            this.selectedUser.roles = newRoles;
            this.toastService.show('Roles updated successfully!', {
              class: 'bg-success',
              title: 'Success',
            });
            this.modal.hide();
          },
          error: (error) => {
            this.toastService.show(error.error.error, {
              class: 'bg-danger',
              title: 'Update Failed',
            });
          },
        });
    }
  }
}
