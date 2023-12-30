import { Component, inject } from '@angular/core';
import { WelcomeComponent } from './welcome/welcome.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [WelcomeComponent, RouterLink, RouterOutlet, HttpClientModule],
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
  rootUrl = "http://localhost:8000"
  http: HttpClient = inject(HttpClient);

  constructor() {
    this.http.get(this.rootUrl).subscribe((data) => {
      console.log("ME-BE Data: ", data)
    })
  }
}
