import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-information-panel',
  templateUrl: './information-panel.component.html',
  styleUrls: ['./information-panel.component.scss']
})
export class InformationPanelComponent implements OnInit {
  @Input() icon: string;
  @Input() iconColorClass: string;
  @Input() iconBackgroundClass: string;
  @Input() amount: string;

  constructor() {
  }

  ngOnInit(): void {
  }
}
