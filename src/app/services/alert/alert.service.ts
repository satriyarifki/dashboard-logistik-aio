import { EventEmitter, Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertType } from './alert.model';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  private message = '';

  private type!: AlertType;
  invokeAlert = new EventEmitter();
  subsVar: Subscription | undefined;

  onCallAlert(message: string, type: AlertType) {
    
    
    this.invokeAlert.emit({ message, type });
  }
}
