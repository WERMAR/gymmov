import {Component, OnInit} from '@angular/core';

const getNumbersForWeight = () => {
  const list = [];
  for (let i = 0; i <= 200; i++) {
    list.push({text: i, value: i});
  }
  return list;
}

const getNumbersForHeight = () => {
  const list = [];
  for (let i = 140; i <= 230; i++) {
    list.push({text: i, value: i});
  }
  return list;
}

@Component({
  selector: 'app-firstlogin',
  templateUrl: './firstlogin.page.html',
  styleUrls: ['./firstlogin.page.scss'],
})
export class FirstloginPage implements OnInit {

  pickerWeightColumns = [{
    name: 'Weight',
    options: getNumbersForWeight()
  }];

  pickerHeightColumns = [{
    name: 'Height',
    options: getNumbersForHeight()
  }];

  pickerButtons = [
    {
      text: 'Cancel',
      role: 'cancel'
    },
    {
      text: 'Confirm'
    }
  ];
  weight: number = 0;
  height: number = 0;

  constructor() {

  }

  ngOnInit() {
  }

  onDidMissPicker($event: any, varConstant: string) {
    if (varConstant === 'weight') {
      this.weight = $event.detail.data.Weight.value;
    } else {
      this.height = $event.detail.data.Height.value;
    }
  }

}
