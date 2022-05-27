import {
  Component,
  Input,
  ViewChild,
  OnInit,
  Output,
  EventEmitter,
  AfterViewInit,
  OnChanges,
} from '@angular/core';
import { DrawableDirective } from './drawable.directive';
import * as tf from '@tensorflow/tfjs';
const numberModels = '../../../assets/numericTrainedSet/model.json';
const characterModel = '../../../assets/charTrainingSet/model.json';
const numberArr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const characterArr = [
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
@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss'],
})
export class CanvasComponent implements OnInit, AfterViewInit, OnChanges {
  // a reference to the canvas element from our template
  @Input() character;
  @Output() predictedCharEvent = new EventEmitter<any>();
  linearModel: tf.Sequential;
  prediction: any;
  predictedChar: string;
  predictError: boolean = false;
  model: tf.LayersModel;
  predictions: any;
  predictionCorrect: boolean = false;
  arr: any[] = [];
  chartype: string = 'none';
  @ViewChild(DrawableDirective) canvas;
  ngOnChanges() {
    if (isNaN(this.character)) {
      this.loadModel(characterModel);
      this.arr = characterArr;
      this.chartype = 'Character';
    } else {
      this.loadModel(numberModels);
      this.arr = numberArr;
      this.chartype = 'Number';
    }
  }
  ngOnInit() {
    if (isNaN(this.character)) {
      this.loadModel(characterModel);
      this.arr = characterArr;
      this.chartype = 'Character';
    } else {
      this.loadModel(numberModels);
      this.arr = numberArr;
      this.chartype = 'Number';
    }
  }
  ngAfterViewInit(): void {}

  //// LOAD PRETRAINED KERAS MODEL ////

  async loadModel(modelType) {
    this.model = await tf.loadLayersModel(modelType);
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
      for (let i = 0; i < this.predictions.length; i++) {
        if (this.predictions[i] == '1') {
          this.predictedChar = this.arr[i];
          if (this.character == this.predictedChar) {
            this.onCorrect();
          } else this.onError();
        }
      }
      if (this.predictedChar == '') {
        this.onError();
      }
    });
  }

  clear() {
    this.predictedChar = '';
    this.canvas.clear();
    this.predictError = false;
    this.predictionCorrect = false;
  }
  onCorrect() {
    this.predictionCorrect = true;
    this.predictError = false;
    setTimeout(() => {
      this.clear();
      this.predictionCorrect = false;
      this.predictedCharEvent.emit(true);
    }, 2000);
  }
  onError() {
    this.predictError = true;
    setTimeout(() => {
      this.clear();
      this.predictError = false;
      this.predictedCharEvent.emit(false);
    }, 4000);
  }
}
