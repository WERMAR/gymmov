import {Component, OnInit} from '@angular/core';
import Chart from 'chart.js/auto';


@Component({
  selector: 'app-training-summary',
  templateUrl: './training-summary.component.html',
  styleUrls: ['./training-summary.component.scss'],
})
export class TrainingSummaryComponent implements OnInit {

  private data = {
    labels: [
      'Pull-Day',
      'Push-Day',
      'Legday',
      'Cardio'
    ],
    datasets: [{
      label: 'Trainings',
      data: [11, 14, 7, 10],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(75, 192, 192)',
        'rgb(255, 205, 86)',
        'rgb(201, 203, 207)',
        'rgb(54, 162, 235)'
      ]
    }]
  };

  private config = {
    type: 'bar',
    data: this.data,
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  };

  constructor() {

  }

  ngOnInit() {
    const myChart = new Chart(
      // @ts-ignore
      document.getElementById('myChart'),
      this.config
    );
  }

  onClick() {
    console.log("test");
  }
}
