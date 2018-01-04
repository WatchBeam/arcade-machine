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
        <div class="box" arc arc-default-focus tabindex="0"
          *ngIf="defaultBox"
          (click)="toggleDefaultBox()">
          I capture default focus! Click me to toggle!
        </div>
      </div>
      <div class="box-wrapper">
        <div id="override1" class="box" arc tabindex="0" #override1
          [arc-focus-up]="override3"
          [arc-focus-down]="override2">
          up/down override
        </div>
      </div>
      <div class="box-wrapper">
        <div class="box" arc tabindex="0" #override2
          [arc-focus-up]="'#override1'"
          [arc-focus-down]="'#override3'">
          up/down override
        </div>
      </div>
      <div class="box-wrapper">
        <div id="override3" class="box" arc tabindex="0" #override3
          [arc-focus-up]="override2"
          [arc-focus-down]="override1">
          up/down override
        </div>
      </div>
    </div>

    <h1>A Grid</h1>
    <div class="area">
      <div class="box-wrapper" *ngFor="let box of boxes">
        <div class="box" #el arc tabindex="0" (click)="onClick(el)">{{ box }}</div>
      </div>
    </div>

    <h1>Focus Inside</h1>
    Transfer focus to elements inside me
    <div class="area" tabindex="0" arc arc-focus-inside="true" style="display: flex; align-items: center;">
      <div class="box" arc tabindex="0" style="display: inline-block; margin-left:50px; width:50px; height:50px">Short</div>
      <div id="focus-inside1" class="area" arc arc-focus-inside="true" tabindex="0" style="display: inline-block; margin:50px;">
        me too
        <div class="box" arc tabindex="0" style="margin-left:50px; width:50px; height:50px">Short</div>
        <div class="box" arc tabindex="0" style="margin-left:150px; width:50px; height:50px">Short</div>
        <div class="box" arc tabindex="0" style="margin-left:250px; width:50px; height:50px">Short</div>
      </div>
      <div class="box" arc tabindex="0" style="display: inline-block; margin-left:50px; width:50px; height:50px">Short</div>
    </div>

    <h1>Non-Overlapping Elements</h1>
    <div class="area">
      <div class="box-wrapper" *ngFor="let box of boxes.slice(0, 3); let i = index"
        style="padding-right: 200px">
        <div class="box" arc tabindex="0" style="height:50px">{{ box }}</div>
      </div>
      <br>
      <div class="box-wrapper" *ngFor="let box of boxes.slice(0, 3); let i = index"
        style="padding-left: 200px">
        <div class="box" arc tabindex="0" style="height:50px">{{ box }}</div>
      </div>
    </div>

    <h1>A Form</h1>
    <div class="area">
      <form>
        <div><input tabindex="0" placeholder="Username"></div>
        <div><input tabindex="0" placeholder="Password" type="password"></div>
        <div><textarea tabindex="0"></textarea></div>
        <div><button tabindex="0">Submit</button></div>
      </form>
    </div>

    <h1>Scrolling</h1>
    <div class="area scroll-restriction">
      <div class="box" arc tabindex="0">Lorem</div>
      <div class="box" arc tabindex="0">Ipsum</div>
      <div class="box" arc tabindex="0">Dolor</div>
      <div class="box" arc tabindex="0">Sit</div>
      <div class="box" arc tabindex="0">Amet</div>
      <div class="box" arc tabindex="0">Consectur</div>
    </div>

    <h1>Adding/Removing Elements</h1>
    <div class="area">
      <div class="box-wrapper" *ngFor="let box of boxes.slice(0, 15); let i = index">
        <div class="box" arc tabindex="0" *ngIf="(i + (ticker | async)) % 2 === 0">{{ box }}</div>
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
