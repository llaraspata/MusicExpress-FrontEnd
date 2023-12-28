import {Routes} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';

const routeConfig: Routes = [
  {
    path: '',
    component: DashboardComponent,
    title: 'Music Express',
  },
];

export default routeConfig;
