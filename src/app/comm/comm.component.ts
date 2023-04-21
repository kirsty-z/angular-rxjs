import { ChangeDetectorRef, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Comm } from '../comm';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-comm',
  templateUrl: './comm.component.html',
  styleUrls: ['./comm.component.sass']
})
export class CommComponent implements OnInit {
  constructor(
    private heroService: HeroService,
    private cd: ChangeDetectorRef
  ) { }
  comm: string = ""
  parent: Comm = {
    id: 1,
    msg: "父组件的数据传递到子组件中"
  }
  subMsg: string = ""
  ngOnInit() {
    this.heroService.getComm().then(comm => this.comm = comm);
  }
  onChangeMsg() {
    this.parent = {
      id: 2,
      msg: "改变了父组件的数据传递到子组件中"
    }
  }
  // 子组件的ngOnInit在父组件的DOM更新之前被调用，出现ExpressionChangedAfterItHasBeenCheckedError
  // 两个解决方案：
  // 1.强制变化检测
  ngAfterViewInit() {
    this.cd.detectChanges()
  }
  handleData($event: string) {
    // 2.异步更新
    // setTimeout(() => {
    this.subMsg = $event
    // }, 0)
  }
}
