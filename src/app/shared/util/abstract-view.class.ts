import {Component, OnDestroy} from "@angular/core";
import {Subject} from "rxjs";

@Component({
  template: ''
})
export abstract class AbstractViewClass implements OnDestroy {
  protected onDestroy: Subject<any>;

  protected constructor() {
    this.onDestroy = new Subject<any>();
  }

  ngOnDestroy() {
    this.onDestroy.next(null);
    this.onDestroy.complete();
  }
}
