import { Component } from '@angular/core';
import { Hero } from '../app.component';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  heroes: Hero[] = [];
  constructor(private heroService: HeroService) { }
  ngOnInit(): void {
    this.heroService.getHeroes().subscribe(
      (heroes: Hero[]) => this.heroes = heroes.slice(1, 5)
    )
  }
}
