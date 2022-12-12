import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  BehaviorSubject, from, fromEvent, map, Observable, ReplaySubject, scan, Subject,
  throttleTime, interval, merge, take, takeUntil, switchMap, of, mergeMap, concatMap,
  zip, combineLatest, filter, delay, concat
} from 'rxjs';

@Component({
  selector: 'app-rx-component',
  templateUrl: './rx-component.component.html',
  styleUrls: ['./rx-component.component.scss']
})
export class RxComponentComponent implements OnInit, OnDestroy {
  count: number = 0;
  throttleCount: number = 0;
  ngOnInit() {
    this.addCount()
    this.throttle()
    this.addMousePositionX()
    this.createObservable()
    this.generalization()
    this.subject()
    this.behaviorSubject()
    this.replaySubject()
    this.replaySubjectWindowTime()
    let input = from([1, 2, 3, 4]);
    let output = this.multiplyByTen(input) as Observable<number>;
    output.subscribe((x: number) => console.log("multiplyByTen: " + x));
    this.operators()
    this.mapOperator()
  }
  ngOnDestroy(): void {
  }
  addCount(): void {
    let button = document.querySelector(".add-count")
    if (!button) return;
    fromEvent(button, "click")
      .pipe(scan(count => this.count = count + 1, 0))
      .subscribe({
        next: () => console.log(`clicked,count=${this.count}`),
        error: (err: any) => console.log(`have error: ${err}`)
      })
  }
  throttle(): void {
    let button = document.querySelector(".throttle");
    if (!button) return;
    fromEvent(button, "click")
      .pipe(
        throttleTime(1000),
        scan(throttleCount => this.throttleCount = throttleCount + 1, 0)
      ).subscribe(count => console.log(`clicked ${this.throttleCount} times`))
  }
  addMousePositionX() {
    let button = document.querySelector(".add-mouse-positionX");
    if (!button) return
    fromEvent(button, 'click').pipe(
      throttleTime(1000),
      map((event: any) => event.clientX),
      scan((count, clientX) => count + clientX, 0)
    )
      .subscribe(count => console.log(count))
  }
  createObservable() {
    let observable = new Observable(function (observer) {
      observer.next(1);
      observer.next(2);
      observer.next(3);
      setTimeout(() => {
        observer.next(4);
        observer.complete();
      }, 1000)
    })
    console.log("just before subscribe");
    observable.subscribe({
      next: x => console.log(`get value ${x}`),
      error: (err) => console.error('some error: ' + err),
      complete: () => console.log("done")
    })
    console.log("just after subscribe")
  }
  generalization() {
    let observable = new Observable(function (observer) {
      console.log("hello");
      observer.next(42);
    })
    console.log("before")
    observable.subscribe(function (x) {
      console.log(x)
    })
    console.log("after");
  }
  subject() {
    let subject = new Subject()
    subject.subscribe({
      next: v => console.log("subject-observerA:" + v)
    })
    subject.subscribe({
      next: v => console.log("subject-observerB:" + v)
    })
    let observable = from([1, 2, 3])
    observable.subscribe(subject)
  }
  behaviorSubject() {
    let subject = new BehaviorSubject(0);// 0是初始值
    subject.subscribe({
      next: v => console.log("behavior-subjectA: " + v)
    })
    subject.next(1)
    subject.next(2)
    subject.subscribe({
      next: v => console.log("behavior-subjectB: " + v)
    })
    subject.next(3)
  }
  replaySubject() {
    let subject = new ReplaySubject(3)//为新的订阅者缓冲3个值
    subject.subscribe({
      next: v => console.log("replay-subjectA: " + v)
    })
    subject.next(1)
    subject.next(2)
    subject.next(3)
    subject.next(4)
    subject.subscribe({
      next: v => console.log("replay-subjectB: " + v)
    })
    subject.next(5)
  }
  replaySubjectWindowTime() {
    let i = 1;
    let subject = new ReplaySubject(10, 500);
    //10缓冲10个值，500毫秒之前的值可以记录
    subject.subscribe({
      next: v => console.log("replay-subject-window-time-before500-A: " + v)
    })
    let timer = setInterval(() => {
      if (i < 10) { subject.next(i++) } else {
        clearInterval(timer)
      }
    }, 200)
    setTimeout(() => {
      subject.subscribe({
        next: v => console.log("replay-subject-window-time-before500-B: " + v)
      })
    }, 1000)
  }
  multiplyByTen(input: any) {
    let output = new Observable(function subscribe(observer) {
      input.subscribe({
        next: (v: number) => observer.next(10 * v),
        error: (err: any) => observer.error(err),
        complete: () => observer.complete()
      })
    })
    return output;
  };
  operators() {
    // 定时输出
    let intervalOperator = () => {
      let observable1 = interval(1000)
      let observable2 = interval(300)
      let merged = merge(observable1, observable2)
      merged.subscribe(v => console.log("interval-operator: " + v))
    }
    // 生成observable
    let fromOperator = () => {
      let array = [10, 20, 30];
      let result = from(array)
      result.subscribe(v => console.log("from-operator: " + v));

      function* double(seed: number) {
        var i = seed;
        while (true) {
          yield i;
          i = 2 * i; // double it
        }
      }
      let iterator = double(3)
      let results = from(iterator).pipe(take(10))
      results.subscribe(v => console.log("from-operator-iterator: " + v))
    }
    // 筛选
    let filterOperator = () => {
      let data = of(1, 2, 3, 4, 5)
      let results = data.pipe(filter((e: any) => e >= 3))
      results.subscribe(x => console.log("filter-operator: " + x))
    }
    // 直到点击，不再执行interval
    let takeUntilOperator = () => {
      let intervalResult = interval(1000);
      let clicks = fromEvent(document, "click")
      let result = intervalResult.pipe(takeUntil(clicks))
      result.subscribe(x => console.log("operator-takeUntil: " + x))
    }
    // 点击开始从0开始interval，再次点击，从0开始interval
    let switchMapOperator = () => {
      let clicks = fromEvent(document, "click")
      let result = clicks.pipe(switchMap(e => interval(1000)))
      result.subscribe(v => console.log("switchMap-operator: " + v))
    }
    //interval和点击事件可同时进行
    let mergeOperator = () => {
      let clicks = fromEvent(document, "click");
      let timer = interval(1000);
      let clicksOrTimer = merge(clicks, timer);
      clicksOrTimer.subscribe(x => console.log("merge-operator: " + x))
    }
    //每个字符映射并打平输出
    let mergeMapOperator = () => {
      let letters = of("a", "b", "c");
      let result = letters.pipe(mergeMap(x =>
        interval(1000)
          .pipe(map(i => x + i))
      ))
      result.subscribe(x => console.log("mergeMap-operator: " + x))
      // a1 b1 c1
      // a2 b2 c3
    }
    //点击，从0开始interval输出，再次点击，从0开始interval
    let concatMapOperator = () => {
      let clicks = fromEvent(document, 'click');
      let result = clicks.pipe(concatMap(ev => interval(1000).pipe(take(4))))
      result.subscribe(x => console.log("concatMap-operator: " + x))
    }
    // 将多个observable发出的相同index位置的值组合在一起
    let zipOperator = () => {
      let age$ = of(27, 25, 29);
      let name$ = of("foo", "bar", "beer");
      let isDev$ = of(true, true, false);
      zip(age$, name$, isDev$, (age: number, name: string, isDev: boolean) => ({ age, name, isDev }))
        .subscribe(x => console.log(x))
    }
    // 组合多个observable创建一个observable，他的值根据每个输入observable最新值计算出来，输出最后一组值
    let combineLatestOperator = () => {
      let weight = of(70, 72, 76, 79, 75);
      let height = of(1.75, 1.77, 1.78);
      // let bmi = weight.pipe(combineLatest(height, (w, h) => w / (h * h)))
      // bmi.subscribe(x => console.log("combineLatest-operator: " + x))
    }
  }
  // map使用给定的project来处理每一个observable发出的值，交给下游
  mapOperator() {
    let button = document.querySelector(".get-mouse-positionX");
    if (!button) return;
    let clicks = fromEvent(button, "click")
    let positions = clicks.pipe(map((ev: any) => ev.clientX))
    positions.subscribe(x => console.log("map-operator-mouse-positionX: " + x))
  }

}
