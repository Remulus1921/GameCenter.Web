export interface UserDto {
  userName: string;
  userEmail: string;
  userRole: string;
}

export interface UserUpdateDto {
  firstName: string;
  lastName: string;
  userName: string;
  userEmail: string;
  password: string;
}

export interface RoleDto {
  userEmail: string;
  roleName: string;
}
