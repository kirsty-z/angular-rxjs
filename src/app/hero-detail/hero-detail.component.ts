import { Location } from '@angular/common'
import { Component, OnInit, Input, OnDestroy } from '@angular/core'
import { ActivatedRoute, Params, Router } from '@angular/router'
import { switchMap } from 'rxjs/operators'
import { Hero } from '../app.component'
import { HeroService } from '../hero.service'

@Component({
  selector: 'hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss'],

})
export class HeroDetailComponent implements OnInit, OnDestroy {
  constructor(
    private heroService: HeroService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  @Input() hero?: Hero
  ngOnInit(): void {
    if (!this.hero) {
      this.route.params
        .pipe(switchMap((params: Params) => this.heroService.getHero(+params['id'])))
        .subscribe({ next: (hero: Hero) => (this.hero = hero), error: e => console.error(e) })
    }

  }
  goBack(): void {
    this.location.back()
  }
  save(): void {
    if (this.hero) {
      this.heroService.updateHero(this.hero).subscribe(() => this.goBack())
    }
  }
  ngOnDestroy() {

  }
}
