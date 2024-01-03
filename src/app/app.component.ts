import { Component } from '@angular/core';
import { WelcomeComponent } from './welcome/welcome.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FooterComponent } from "./footer/footer.component";

@Component({
    selector: 'app-root',
    standalone: true,
    template: `
    <main>
      <header class="brand-name">
        <h1 class="brand-logo" alt="logo" aria-hidden="true">Music Express</h1>
      </header>
      <section class="content">
        <router-outlet></router-outlet>
      </section>

      <app-footer></app-footer>
    </main>
  `,
    styleUrls: ['./app.component.css'],
    imports: [WelcomeComponent, RouterLink, RouterOutlet, FooterComponent]
})
export class AppComponent {
  title = 'MusicExpress';
}
