import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/core/services/auth/authentication.service';
import { RoleDto, UserDto } from 'src/app/models/user/userDto';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  title = 'Lista użytkowników';
  userList!: UserDto[];

  displayedColumns: string[] = [
    'index',
    'name',
    'email',
    'role',
    'moderator',
    'admin',
    'delete',
  ];
  dataSource!: MatTableDataSource<UserDto>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private _authService: AuthenticationService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.updateUserList();
    if (this.isAdmin()) {
      this.displayedColumns = [
        'index',
        'name',
        'email',
        'role',
        'moderator',
        'admin',
        'delete',
      ];
    } else if (this.isMod()) {
      this.displayedColumns = ['index', 'name', 'email', 'role', 'moderator'];
    }
  }

  updateUserList(): void {
    this._authService.getUsersList().subscribe((userList) => {
      this.userList = userList;
      this.dataSource = new MatTableDataSource(this.userList);
      this.dataSource.paginator = this.paginator;
    });
  }

  deleteUser(userEmail: string): void {
    this._authService.deleteUser(userEmail).subscribe(
      () => {
        this.toastr.warning('Usunięto użytkownika', 'Stan użytkownika');
        this.updateUserList();
      },
      (error) => {
        this.toastr.error(error.error, 'Stan użytkownika');
      }
    );
  }

  addToRole(roleName: string, email: string): void {
    const roleDto: RoleDto = { userEmail: email, roleName: roleName };
    this._authService.grantTheRole(roleDto).subscribe(
      () => {
        this.toastr.success('Przyznano rangę ' + roleName, 'Stan użytkownika');
        this._authService.getUsersList();
      },
      (error) => {
        this.toastr.error(error.error, 'Stan użytkownika');
      }
    );
  }

  isAdmin(): boolean {
    return this._authService.isAdmin();
  }

  isMod(): boolean {
    return this._authService.isMod();
  }
}
