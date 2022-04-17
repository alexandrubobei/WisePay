import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-information-panel',
  templateUrl: './information-panel.component.html',
  styleUrls: ['./information-panel.component.scss']
})
export class InformationPanelComponent {
  @Input() icon: string;
  @Input() color: string;
  @Input() background: string;
  @Input() amount: number;
  @Input() label: string;
}
