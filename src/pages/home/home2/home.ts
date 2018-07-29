import { Component, NgZone } from '@angular/core';

import { Platform } from 'ionic-angular';

declare var ApiAIPromises: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  answers = [];

  constructor(public platform: Platform, public ngZone: NgZone) {
    console.log('hii');
    platform.ready().then(() => {
      ApiAIPromises.init({
        clientAccessToken: "294dbb12e7f242119a3501a34da745ef"
      }).then(result => console.log(result));
    }).catch(e => {console.log(e);});
    console.log(ApiAIPromises);
  }

  ask(question) {
    ApiAIPromises.requestText({
      query: question
    })
      .then(({ result: { fulfillment: { speech } } }) => {
        this.ngZone.run(() => {
          this.answers.push(speech);
        });
      }).catch(e => {
        console.log(e);
      })
  }
}