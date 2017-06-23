import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-1',
  styles: [`
    :host {
      font-family: monospace;
      max-width: 960px;
      margin: 15px auto;
      display: block;
    }

    h1 {
      font-weight: normal;
      font-size: 12px;
      margin: 0;
      padding: 0;
    }

    .area {
      border: 1px solid #000;
      margin: 15px 0;
    }

    .area:after {
      content: "";
      display: block;
    }

    .area.arc--selected {
      border-color: #f00;
    }

    .box-wrapper {
      width: 100px;
      display: inline-block;
    }

    .box {
      margin: 15px;
      background: #000;
      color: #fff;
    }

    .box:focus {
      background: #f00;
    }

    form {
      display: flex;
      margin: 15px;
      align-content: center;
    }

    form div {
      margin-right: 5px;
    }

    input, button, textarea {
      border: 1px solid #000;
      padding: 5px 8px;
      border-radius: 0;
      box-shadow: 0;
      outline: 0 !important;
    }

    input:focus, button:focus, textarea:focus {
      border-color: #f00;
    }

    .scroll-restriction {
      overflow: auto;
      height: 100px;
    }
  `],
  template: `
    <h1>Page 1</h1>
    <h1>Back Button Binding</h1>
    <div class="area">
      <a tabindex="0" [routerLink]="['/page2']">Goto Page 2</a>
    </div>

    <h1>Special Handlers</h1>
    <div class="area">
      <div class="box-wrapper" style="width:200px">
        <div class="box" arc arc-default-focus
          *ngIf="defaultBox"
          (click)="toggleDefaultBox()">
          I capture default focus! Click me to toggle!
        </div>
      </div>
      <div class="box-wrapper">
        <div id="override1" class="box" arc #override1
          [arc-focus-up]="override3"
          [arc-focus-down]="override2">
          up/down override
        </div>
      </div>
      <div class="box-wrapper">
        <div class="box" arc #override2
          [arc-focus-up]="'#override1'"
          [arc-focus-down]="'#override3'">
          up/down override
        </div>
      </div>
      <div class="box-wrapper">
        <div id="override3" class="box" arc #override3
          [arc-focus-up]="override2"
          [arc-focus-down]="override1">
          up/down override
        </div>
      </div>
    </div>

    <h1>A Grid</h1>
    <div class="area">
      <div class="box-wrapper" *ngFor="let box of boxes">
        <div class="box" #el arc (click)="onClick(el)">{{ box }}</div>
      </div>
    </div>

    <h1>Non-Overlapping Elements</h1>
    <div class="area">
      <div class="box-wrapper" *ngFor="let box of boxes.slice(0, 3); let i = index"
        style="padding-right: 200px">
        <div class="box" arc style="height:50px">{{ box }}</div>
      </div>
      <br>
      <div class="box-wrapper" *ngFor="let box of boxes.slice(0, 3); let i = index"
        style="padding-left: 200px">
        <div class="box" arc style="height:50px">{{ box }}</div>
      </div>
    </div>

    <h1>A Form</h1>
    <div class="area">
      <form>
        <div><input placeholder="Username"></div>
        <div><input placeholder="Password" type="password"></div>
        <div><textarea></textarea></div>
        <div><button>Submit</button></div>
      </form>
    </div>

    <h1>Scrolling</h1>
    <div class="area scroll-restriction">
      <div class="box" arc>Lorem</div>
      <div class="box" arc>Ipsum</div>
      <div class="box" arc>Dolor</div>
      <div class="box" arc>Sit</div>
      <div class="box" arc>Amet</div>
      <div class="box" arc>Consectur</div>
    </div>

    <h1>Adding/Removing Elements</h1>
    <div class="area">
      <div class="box-wrapper" *ngFor="let box of boxes.slice(0, 15); let i = index">
        <div class="box" arc *ngIf="(i + (ticker | async)) % 2 === 0">{{ box }}</div>
      </div>
    </div>

    <div class="area">
      <h1>Focus Child Elements Only</h1>
      <button tabindex="0" (click)="isDialogVisible=true">Open Dialog</button>
    </div>

    <dialog class="area"
      *ngIf="isDialogVisible"
      (onClose)="isDialogVisible=false">
      <div>
        <button tabindex="0">Button 1</button>
        <button tabindex="0">Button 2</button>
      </div>
      <div>
        <button tabindex="0">Button 3</button>
        <button tabindex="0">Button 4</button>
      </div>
      <div>
        <button tabindex="0" (click)="isChildDialogVisible=true">Open Sub Dialog</button>
      </div>
      <dialog *ngIf="isChildDialogVisible" (onClose)="isChildDialogVisible=false">
        <div>
          <button tabindex="0">Button 5</button>
          <button tabindex="0">Button 6</button>
        </div>
      </dialog>
    </dialog>
  `,
})
export class Page1Component {
  public boxes: string[] = [];
  public ticker = Observable.interval(2500);
  public defaultBox = true;
  public isDialogVisible = false;

  constructor() {
    for (let i = 0; i < 50; i++) {
      this.boxes.push(String(`Box ${i}`));
    }
  }

  public toggleDefaultBox() {
    this.defaultBox = false;
    setTimeout(() => this.defaultBox = true, 1000);
  }

  public onClick(el: HTMLElement) {
    el.style.background = '#0f0';
  }
}
