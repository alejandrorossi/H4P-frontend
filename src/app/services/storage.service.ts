import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { Response } from '../models/response.model';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private localStorageService;
  private currentSession: Response = null;

  constructor(private router: Router) {
    this.localStorageService = localStorage;
    this.currentSession = this.loadSessionData();
  }

  // METHODS
  /**
   * Set the currentSession and the currentUser in localStorage.
   */
  setCurrentSession(Response: Response): void {
    this.currentSession = Response;
    this.localStorageService.setItem('currentUser', JSON.stringify(Response));
  }

  /**
   * Returns an object Response, this contains the currentUser from the localStorage.
   */
  loadSessionData(): Response {
    const sessionStr = this.localStorageService.getItem('currentUser');
    return (sessionStr) ? <Response> JSON.parse(sessionStr) : null;
  }

  /**
   * Returns the current Response.
   */
  getCurrentSession(): Response {
    return this.currentSession;
  }

  /**
   * Remove the current user from localStorage and set null currentSession.
   */
  removeCurrentSession(): void {
    this.localStorageService.removeItem('currentUser');
    this.currentSession = null;
  }

  /**
   * Returns the user from currentSession.
   */
  getCurrentUser(): User {
    const Response: Response = this.getCurrentSession();
    return (Response && Response.data) ? Response.data as User: null;
  }

  /**
   * Returns true if the currentToken not is null.
   */
  // isAuthenticated(): boolean {
  //   return (this.getCurrentToken() != null) ? true : false;
  // }

  /**
   * Returns the token from the currentSession.
   */
  // getCurrentToken(): any {
  //   const Response = this.getCurrentSession();
  //   return (Response && Response.token) ? Response.token : null;
  // }

  /**
   * Remove the current Response and redirect for route login.
   */
  singOut(): void {
    this.removeCurrentSession();    
    this.router.navigate(["/landing"]);
  }

}
