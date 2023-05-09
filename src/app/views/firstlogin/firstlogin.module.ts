import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FirstloginPageRoutingModule } from './firstlogin-routing.module';

import { FirstloginPage } from './firstlogin.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        FirstloginPageRoutingModule,
        ReactiveFormsModule
    ],
  declarations: [FirstloginPage]
})
export class FirstloginPageModule {}
