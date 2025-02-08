import { CommonModule } from '@angular/common';
import { Component, ElementRef, Renderer2 } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  gifSource = "../../assets/gifs/gif1.gif";
  question = "Will you go out with me tomorrow?";
  showPlanButton = false;

  constructor(private renderer: Renderer2, private el: ElementRef,private router: Router) {}

  onYesClick() {
    this.question = "Let's plan one now";
    this.gifSource = "../../assets/gifs/gif2.gif";
    this.showPlanButton = true;
  }

  onNoMouseOver() {
    const noBtn = this.el.nativeElement.querySelector('.no-btn') as HTMLElement;
    const noBtnRect = noBtn.getBoundingClientRect();
    const maxX = window.innerWidth - noBtnRect.width;
    const maxY = window.innerHeight - noBtnRect.height;

    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    this.renderer.setStyle(noBtn, 'left', `${randomX}px`);
    this.renderer.setStyle(noBtn, 'top', `${randomY}px`);
  }

  onPlanClick() {
    this.router.navigate(['/plan']);
    // , { skipLocationChange: true });
   }

  onPlanClickNo() {
    window.alert("You cannot say no now");
  }
}
