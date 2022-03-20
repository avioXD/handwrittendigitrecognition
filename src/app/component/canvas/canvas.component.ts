import {
  Component,
  Input,
  ElementRef,
  AfterViewInit,
  ViewChild,
  OnInit,
} from '@angular/core';
import { fromEvent } from 'rxjs';
import { switchMap, takeUntil, pairwise } from 'rxjs/operators';
import { DrawableDirective } from './drawable.directive';
import * as tf from '@tensorflow/tfjs';
@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css'],
})
export class CanvasComponent implements OnInit {
  // a reference to the canvas element from our template
  linearModel: tf.Sequential;
  prediction: any;
  predictedNumber: string;

  model: tf.LayersModel;
  predictions: any;

  @ViewChild(DrawableDirective) canvas;

  ngOnInit() {
    this.loadModel();
  }

  //// LOAD PRETRAINED KERAS MODEL ////

  async loadModel() {
    this.model = await tf.loadLayersModel('../../../assets/model.json');
  }

  async predict(imageData: ImageData) {
    const pred = await tf.tidy(() => {
      // Convert the canvas pixels to
      let img = tf.browser.fromPixels(imageData, 1);
      img = img.reshape([1, 28, 28, 1]);
      img = tf.cast(img, 'float32');

      // Make and format the predications
      const output = this.model.predict(img) as any;

      // Save predictions on the component
      this.predictions = Array.from(output.dataSync());
      const arr = [
        '0',
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        'A',
        'B',
        'C',
        'D',
        'E',
        'F',
        'G',
        'H',
        'I',
        'J',
        'K',
        'L',
        'M',
        'N',
        'O',
        'P',
        'Q',
        'R',
        'S',
        'T',
        'U',
        'V',
        'W',
        'X',
        'Y',
        'Z',
      ];
      for (let i = 0; i < this.predictions.length; i++) {
        if (this.predictions[i] == '1') {
          this.predictedNumber = arr[i];
        }
      }
      if (this.predictedNumber == '') {
        this.predictedNumber = ':(';
      }
    });
  }

  clear() {
    this.predictedNumber = '';
  }
}
