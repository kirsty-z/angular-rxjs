import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Comm } from '../comm';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-comm',
  templateUrl: './comm.component.html',
  styleUrls: ['./comm.component.sass']
})
export class CommComponent implements OnInit {
  constructor(
    private heroService: HeroService
  ) { }
  comm: string = ""
  parent: Comm = {
    id: 1,
    msg: "父组件的数据传递到子组件中"
  }
  subMsg: string = ""
  ngOnInit() {
    this.heroService.getComm().then(comm => this.comm = comm)
  }
  onChangeMsg() {
    this.parent = {
      id: 2,
      msg: "改变了父组件的数据传递到子组件中"
    }
  }
  handleData($event: string) {
    if ($event) {
      this.subMsg = $event
    }
  }
}
