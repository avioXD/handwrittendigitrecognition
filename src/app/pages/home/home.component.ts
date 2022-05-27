import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  formFields = {
    email: '',
    password: '',
  };
  constructor(private _api: ApiService, private _sanitizer: DomSanitizer) {}
  captchaText: any = '';
  captchaImage: any;
  predictThisChar: string = '';
  drawShow: boolean = false;
  charIterator: number = 0;
  success: boolean = false;
  ngOnInit(): void {
    this.setCaptcha();
  }

  setCaptcha() {
    this.charIterator = 0;
    this._api.createCaptcha().subscribe((res: any) => {
      console.log(res);
      this.captchaText = res.text;
      this.captchaImage = this._sanitizer.bypassSecurityTrustHtml(res.data);
      //  this.captchaText = '246';
      this.predictThisChar = this.captchaText[this.charIterator];
    });
  }
  onShowDraw() {
    this.drawShow = true;
  }
  onPredictSuccess(e) {
    if (e) {
      this.charIterator++;
      this.predictThisChar = this.captchaText[this.charIterator];
    }
    if (this.charIterator == this.captchaText.length) {
      this.drawShow = false;
      this.success = true;
    }
  }
}
