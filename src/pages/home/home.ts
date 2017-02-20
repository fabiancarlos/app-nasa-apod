import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NavController, LoadingController, ToastController } from 'ionic-angular';

import { ApodService } from '../../services/apod.service';

import * as moment from 'moment';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [ApodService]
})
export class HomePage {

  loading: any;
  apod_data: {};
  date: string;
  today: string = moment().format('YYYY[-]MM[-]DD');

  constructor(public navCtrl: NavController,
              public loadingCtrl: LoadingController,
              public toastCtrl: ToastController,
              public sanitizer: DomSanitizer,
              public apodSrv: ApodService)
  {

  }



  ngOnInit(){
    this.loadData(this.today);
    this.date = this.today;
  }

  loadData(date: string){
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      duration: 10000
    });

    this.loading.present();

    this.apodSrv.findByDate(this.date).subscribe(
        data => { this.apod_data = data; this.loading.dismiss() },
        err => this.handleError(err)
    );
  }

  handleError(err){
    this.loading.dismiss()

    let toast = this.toastCtrl.create({
      message: `${err.msg} (${err.code})`,
      duration: 3000
    });
    toast.present();
  }

  sanetizeUrl(url: string){
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}
