// heroes
// 1. 基本使用
//    *ngFor:循环
//    *ngIf：条件判断
//    [(ngModel)]="数据名"：数据绑定
      // (click)="事件名称"：事件绑定
// 2. 子组件创建使用
//   1.子组件创建
//     ng generate component '组件名称'
//     app.module.ts中@ngModule - declarations自动添加该组件
//   2. 使用
//     使用子组件在 .component.ts的@component - selector 的名称
//     父组件中显示子组件
//       把父组件的selectedHero方法绑定到子组件的hero属性上
//          <hero-detail [hero]="selectedHero"></hero-detail>
//       子组件.component.ts 使用@input装饰器，表明他是一个输入属性
//          @Input() hero:Hero|undefined;
// 3. 创建能被多个组件共享的服务类
      // 1.创建
        // 创建 ng generate service hero
        // 创建mock-heroes.ts 保存共享的数据
      // 2.导入常量，并使用getHeroes方法返回他，
        // 数据从远程服务器获取，为了协调视图与响应，使用Promise
        //getHeroes()Promise<Hero[]>{
        //   return Promise.resolve(HEROES);
        //}
      // 3. 导入HeroService
          // 添加一个构造函数，并定义一个私有属性
          // 添加组件的provides元数据，该服务被存入了一个私有变量heroService
            // constructor(provides heroService:HeroService){}
          // 调用服务，获取数据,包装成一个专门的方法;HeroService返回Promise
            // getHeroes(){
              // this.heroService.getHeroes().then((heroes)=>this.heroes=heroes)
            // }
          // 使用ngOnInit生命周期钩子：刚创建，每次变化，最终销毁时
            // ngOnInit(){
            //   getHeroes()
            // }
// 4.路由
    //创建 ng generate module app-routing --flat --module=app
    // app-routing.modules.ts中写路由信息
      // 在app.component.ts 中只用router-outlet,告诉路由器他的位置
      // 路由器就把激活的组件显示在<router-outlet>里面
          <router-outlet></router-outlet>
      //a标签跳转 锚点标签[routerLink]绑定
      [routerLink]="['/detail',hero.id]"
      [routerLink]="['/dashboard']"
      // 使用了forRoot（）方法，在应用根部提供配置好的路由器
      // 重定向路由
        // {
        //   path:"",
        //   redirectTo:"/dashboard",
        //   pathMatch:"full"
        // }
    // 在AppModule中引入RouterModule
    // 组件之间导航，使用Router,注入到构造函数中
      // this.route.navigate(["/path",id])
    // 返回使用上一个页面，在构造函数中注入Location
      // this.location.back()
    // 添加uppercase管道，格式化数据，显示成大写字母
    // angular自带管道：格式化字符串、金额、日期和其它显示数据；也可以自定义管道
// 5.HTTP
    //注册HTTP服务
      //  在app.module.ts文件根组件 AppModuleComponent的ngModule中引入HttpClientModule
    // 模拟web API：HTTP客户端通过一个模拟服务来获取保存数据
      // 新建一个数据文件 npm install angular-in-memory-web-api --save
      // 导入InMemoryWebApiModule并将其加入到模块imoport数组
        // 内存 Web API服务
        InMemoryWebApiModule.forRoot(InMemoryDataService)
        // forRoot()需要InMemoryWebApiModule类实列，用来向内存数据库填充数据
// 6.架构
    // 模块
      // 根模块，带有一个@NgModule装饰器
      // NgModule是一个装饰器函数，接受一个用来描述模块属性的元数据对象
          // declarations：声明本模块中拥有的视图类（组件，指令和管道）
          // exports：用于其他模块的组件
          // imports：本模块声明的组件模板需要的类所在的其他模块
          // provides：服务的创建者，并加入到全局服务列表中，可用于应用任何部分
          // bootstrap：指定应用的主视图（根组件）
    // 组件:屏幕上一小块视图
    // 模板:*ngIf (click)
    // 元数据：
      // @Component:紧随其后的类标记成组件类;实际就是一个@Directive装饰器，只是扩展了一些面向模板的特性
      // @Directive:控制器:更改DOM元素和angular组件的外观或行为
      // @Input：表明属性是一个输入属性，不是模板所属组件的一部分，存在信任问题，所以该属性必须带@Input装饰器
          [myHighlight]="color"
          // @Input color:string
      // @Output：输出指令
      // @Injectable:标识一个类可以被注入器实例化
    // 数据绑定
        // {{hero.name}}
        // [hero]="selectHero"
        // (click)="onSelect"
        // <input [(ngModel)]="hero.name"/>
    // 指令
        // 结构型和属性型
        // 结构型：*ngIf
        // 属性型：ngModel
    // 服务
    // 依赖注入
// 7.表单
    // 标识符前面加#，就能声明一个模板引用变量,必须绑定事件，否则将完全无法工作
      // <input #box (keyup)="0"/>
      // <p>{{box.value}}</p>
    // ngForm:通过绑定bgForm的有效性状态，控制Submit按钮的禁用状态
      // <from #heroForm="ngForm">
            // <input type="text" #name="ngModel" required [(ngModel)]="model.name" name="name"/>
      //    <button [disabled]="!heroForm.form.valid">submit</button>
      // </from>
// 8. 生命周期顺序
    // ngOnChanges():（重新）设置数据绑定输入属性值时响应，绑定的输入属性值发生变化时调用，首次调用发生在OnInit之前
    // ngOnInit():第一次显示数据绑定和设置指令/组件的输入属性之后，初始化指令/组件，在OnChanges之后，只调用一次
    // ngDoCheck():检测，在每个angular变更周期中调用

    // ngAfterContentInit():把内容投影到组件内容的变更检测之后调用；只适用于组件
    // ngAfterContentChecked():每次完成被投影组件内容的变更检查之后调用，适合组件
    // ngAfterViewInit():初始化完成视图及其子视图之后调用；只适合组件
    // ngAfterViewChecked():每次做完组件视图和子视图的变更检测之后第哦啊用；只适合组件

    // ngOnDestroy():每次销毁指令/组件之前调用并清扫
// 9.生命周期钩子
    // Peek-a-boo:展示每个生命中期钩子，每个钩子方法都会在屏幕上显示一条日志
    // Spy:利用ngOnInit和ngOnDestroy狗仔，在他监视的每个元素被创建或销毁时输出日志
    // OnChanges:每个组件输入属性发生变化时，changes对象最为参数去嗲用ngOnChange（）钩子，展示了该如何理解和使用changes对象
    // DoCheck:实现ngDoCheck方法，通过他可以自定义变更检测逻辑
    // AfterView:显示angular中的视图所指的时什么
    // AfterContent:展示如何把外部内容投影进组件中
    // 计数器
// 10.管道
    // 管道把数据作为输入，然后转换它，给出期望的输出
    // date:
        //  {{birthday | date}}
        // 让birthday值通过管道操作符 （|）流动到右侧的Date管道函数中
        // data 和currency管道需要ECMScript国际化 API,但safari和其老式浏览器不支持，可以用垫片（Polyfill）解决
            // <script src="https://cdn.polyfill.io/v2/polyfill.min.js?features=Intl.~locale.en"></script>
    // angular内置管道
        // DatePipe、UpperCasePipe、LowerCasePipe、CurrencyPipe和PercentPipe
        // date:
            // | data   |data:"MM/DD/YY"  | data:format(两个值可选'shortDate' : 'fullDate')
        // 链式管道
            // | data:"fullDate" | uppercase
    // 自定义管道
      // 1.管道是一个带有”管道元数据“装饰器的类
      // 2.管道类实现pipeTransform接口的transform方法，接受一个输入值和一些可选参数，并返回转换zhi
      // 3.当每个输入值被传给transform方法时，还会带上另一个参数，比如我们管道中的exponent（放大值）
      // 4.通过@pipe装饰器允许我们定义管道的名字，这个名字会被用在模板表达式中；它必须是一个有效的JavaScript标识符，例如名字exponentialStrength
      /**
       * ng generate pipe exponential-strength
        exponential-strength.pipe.ts
        import {Pipe,PipeTransform} from "@angular/core"
        @pipe({name:"exponentialStrength"})
        export class ExponentialStrengthPipe implements PipeTransform{
          transform(value:number,exponent:string):number{
            let exp=parseFloat(exponent);
            return Math.pow(value,isNaN(exp)?1:exp)
          }
        }
      */


