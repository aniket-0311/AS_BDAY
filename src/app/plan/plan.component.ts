import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PlanService } from './plan.service';
import { Renderer2 } from '@angular/core';


@Component({
  selector: 'app-plan',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './plan.component.html',
  styleUrl: './plan.component.css',
})
export class PlanComponent {
  isFlipped = false;
  containerScale = 1;
  isRotationComplete: boolean = false;

  constructor(private router:Router,private planService:PlanService,private renderer: Renderer2){
    
  }

  formData: any = {
    name: '',
    age: null,
    sex: '',
    selection: '',
  };

  flipCard() {
    this.isFlipped = !this.isFlipped;
    this.isRotationComplete = true;
  
  }
  

  showBackContent() {
    console.log("aa")
  }

  onCLick(){
    this.planService.setFormData(this.formData);
    this.router.navigate(['/time'])
  }
}
