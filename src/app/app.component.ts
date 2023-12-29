import { Component } from '@angular/core';
import { WelcomeComponent } from './welcome/welcome.component';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [WelcomeComponent, RouterLink, RouterOutlet],
  template: `
    <main>
      <header class="brand-name">
        <h1 class="brand-logo" alt="logo" aria-hidden="true">Music Express</h1>
      </header>
      <section class="content">
        <router-outlet></router-outlet>
      </section>
    </main>
  `,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'MusicExpress';
}
