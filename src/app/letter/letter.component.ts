import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TimeService } from '../time/time.service';

@Component({
  selector: 'app-letter',
  standalone: true,
  imports: [],
  templateUrl: './letter.component.html',
  styleUrl: './letter.component.css'
})
export class LetterComponent {
  time: string | null = null;
  flap = false;

  constructor(private timeService: TimeService) {}

  ngOnInit() {
    if (this.timeService.selectedTime !== null && this.timeService.selectedTime !== '') {
      this.time = this.timeService.selectedTime.substring(0, 6);
    }
    
    else if(this.timeService.customTime!= null && this.timeService.customTime != ''){
      this.time = this.timeService.customTime;
    }

    else{
      this.time = '......'
    }
  }

  toggleFlap() {
      this.flap = !this.flap;
      console.log(this.flap)
  }
}
