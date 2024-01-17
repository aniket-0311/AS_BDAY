import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { PlanService } from './plan.service';

@Component({
  selector: 'app-plan',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './plan.component.html',
  styleUrl: './plan.component.css',
})
export class PlanComponent {
  isFlipped = false;
  containerScale = 1;

  constructor(private router:Router,private planService:PlanService){}

  formData: any = {
    name: '',
    age: null,
    sex: '',
    selection: '',
  };

  flipCard() {
    this.isFlipped = !this.isFlipped;
  }

  onCLick(){
    this.planService.setFormData(this.formData);
    this.router.navigate(['/time'])
  }
}
