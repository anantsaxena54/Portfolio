import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TerminalService {
  private isOpenSubject = new BehaviorSubject<boolean>(false);
  public isOpen$ = this.isOpenSubject.asObservable();

  toggleTerminal() {
    this.isOpenSubject.next(!this.isOpenSubject.getValue());
  }

  openTerminal() {
    this.isOpenSubject.next(true);
  }

  closeTerminal() {
    this.isOpenSubject.next(false);
  }
}
