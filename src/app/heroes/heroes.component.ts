import { Component, OnInit } from '@angular/core';
import { HeroService } from '../hero.service';
import { Router, } from '@angular/router';

export interface Hero {
  id: number
  name: string
}
@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss'],
  providers: [HeroService]
})
export class HeroesComponent implements OnInit {
  constructor(
    private heroService: HeroService,
    private route: Router,
  ) { }
  title = 'Tour of Heroes';
  heroes: Hero[] = [];
  selectedHero?: Hero;

  // ngOnInit生命周期钩子：刚创建时，每次变化时，最终销毁时
  ngOnInit(): void {
    this.getHeroes();
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero
  }
  getHeroes(): void {
    this.heroService.getHeroes().subscribe({
      next: (heroes: Hero[]) => this.heroes = heroes,
      error: e => console.error(e)
    })
  }
  gotoDetail(): void {
    this.route.navigate(['/detail', this.selectedHero!.id])
  }
  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero).subscribe((hero: Hero) => this.heroes.push(hero))
  }
  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero)
    this.heroService.deleteHero(hero.id).subscribe()
  }
}
