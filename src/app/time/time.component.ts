import { CommonModule } from '@angular/common';
import { HttpClient,HttpClientModule } from '@angular/common/http';
import {  ChangeDetectorRef, Component, HostListener, NgZone } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TimeService } from './time.service';
import { PlanService } from '../plan/plan.service';

interface ServerResponse {
  status: number;
  message: string;
  response?: any;
}

@Component({
  selector: 'app-time',
  standalone: true,
  imports: [CommonModule,FormsModule,HttpClientModule],
  templateUrl: './time.component.html',
  styleUrl: './time.component.css'
})

export class TimeComponent {
  
  showOptions = false;
  showNewQuestion = false; 
  selectedTime: string | null = null;
  customTime: string = '';
  timeOptions: string[] = ["9:30am to night", "12:30pm to night", "6:30pm to night"];
  pickupOption: string | null = null;
  formData: any;
  isSendingEmail = false;

  constructor(private http: HttpClient,private router:Router,
    private timeService:TimeService,private planService:PlanService,
    private cdRef: ChangeDetectorRef,
    private ngZone: NgZone
    ) {}

  ngOnInit(){
    this.formData = this.planService.getFormData();
  }

  toggleOptions() {
    this.showOptions = !this.showOptions;
    this.showNewQuestion = false;
  }

  selectTime(time: string) {
    this.selectedTime = time;
    this.customTime = '';
  }
  

  isConfirmButtonEnabled() {
    return this.selectedTime !== null || (this.customTime && this.customTime.trim() !== '');
  }

  confirmSelection() {
    this.timeService.selectedTime = this.selectedTime;
    this.timeService.customTime = this.customTime;
    this.showNewQuestion = true;
  }

  confirmNewQuestion() {
    // Start showing spinner
    this.isSendingEmail = true;

    this.http.post<ServerResponse>('https://aniiiwebsite.onrender.com/send-email', {
      selectedTime: this.selectedTime,
      customTime: this.customTime,
      pickupOption: this.pickupOption,
      name: this.formData?.name,
      age: this.formData?.age,
      gender: this.formData?.sex,
      hot_cute: this.formData?.selection
    }).subscribe(response => {
      // Stop showing spinner
      this.isSendingEmail = false;

      if (response && response.status >= 200 && response.status < 300) {
        // Redirect upon successful response
        this.router.navigate(['/letter']);
      } else {
        window.alert("Please try again")
        console.error('Unexpected response status:', response.status);
      }
    }, error => {
      // Stop showing spinner in case of error
      this.isSendingEmail = false;
      window.alert("Please try again")
      console.error('Error sending email', error);
    });
  }
}
  
  // onContainerClick(event: Event): void {
  //   const target = event.target as HTMLElement;
  //   if (!target.closest('.time-boxes')) {
  //     this.selectedTime = null;
  //   }
  // }
