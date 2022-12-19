import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Comm } from '../comm';
export const commDefault: Comm = { id: 0, msg: "" }
@Component({
  selector: 'app-sub-comm',
  templateUrl: './sub-comm.component.html',
  styleUrls: ['./sub-comm.component.sass']
})
export class SubCommComponent implements OnInit, OnChanges {
  id: number = 0
  msg: string = ""
  @Input() parent: Comm = commDefault
  @Output() sendMsg: EventEmitter<string> = new EventEmitter<string>()
  /**
   * 1.setter
  private _option: Comm = commDefault
    @Input()
    set parent(value: Comm) {
      this._option = value
      this.id = this._option.id
      this.msg = this._option.msg
    }
    get parent(): Comm {
      return this._option
    }
  */
  ngOnInit() {
    //后续父组件更改，子组件不会改变，两个解决方案：1.setter  2.ngOnChange
    this.id = this.parent.id;
    this.msg = this.parent.msg
  }
  // 2.ngOnChange
  ngOnChanges(changes: SimpleChanges): void {
    let parent = changes['parent'];
    if (!parent.firstChange) {
      this.id = parent.currentValue.id
      this.msg = parent.currentValue.msg
      this.sendMsg.next("我是子组件数据")
    }
  }
}
