import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PlanComponent } from './plan/plan.component';
import { TimeComponent } from './time/time.component';
import { LetterComponent } from './letter/letter.component';

export const routes: Routes = [
    {path:"", component:HomeComponent},
    {path:"plan", component:PlanComponent},
    {path:"time", component:TimeComponent},
    {path:"letter",component:LetterComponent}
];
