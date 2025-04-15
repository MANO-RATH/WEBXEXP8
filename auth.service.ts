import { Injectable } from '@angular/core';

interface User {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser: string | null = null;
  private validUsers: User[] = [
    { username: "admin", password: "password123" },
    { username: "tejas", password: "tejas123" }
  ];

  login(credentials: { username: string; password: string }): { success: boolean; message: string } {
    const user = this.validUsers.find(u => 
      u.username === credentials.username && 
      u.password === credentials.password
    );

    if (user) {
      this.currentUser = credentials.username;
      return { success: true, message: "Login Successful!" };
    }
    return { success: false, message: "Invalid Credentials!" };
  }

  logout(): void {
    this.currentUser = null;
  }

  isAuthenticated(): boolean {
    return this.currentUser !== null;
  }

  getCurrentUser(): string | null {
    return this.currentUser;
  }
}