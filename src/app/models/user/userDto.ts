export interface UserDto {
  userName: string;
  userEmail: string;
  userRole: string;
}

export interface RoleDto {
  userEmail: string;
  roleName: string;
}
