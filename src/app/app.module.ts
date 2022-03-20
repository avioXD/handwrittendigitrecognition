import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CanvasComponent } from './component/canvas/canvas.component';
import { DrawableDirective } from './component/canvas/drawable.directive';
@NgModule({
  declarations: [AppComponent, CanvasComponent, DrawableDirective],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
