import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[myHighlight]'
})
export class HighlightDirective {

  constructor(private el: ElementRef) {
  }
  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }
  @Input('myHighlight') highlightColor: string = "";
  @Input() defaultColor: string = "pink";
  @HostListener('mouseenter') onMouseEnter() {
    this.highlight(this.highlightColor || 'red');
  }
  @HostListener('mouseleave') onMouseLeave() {
    this.highlight("");
  }
}
