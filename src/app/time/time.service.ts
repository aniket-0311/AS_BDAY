import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimeService {
  selectedTime: string | null = null;
  customTime: string = '';
  constructor() { }
}
