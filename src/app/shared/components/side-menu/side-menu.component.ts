import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Information } from '../../models/information.model';

/**
 * Side menu component
 */
@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {
  public informationPanelElements: Information[];

  /**
   * Constructor
   */
  constructor(private route: ActivatedRoute) {
  }

  /**
   * Initialize component data
   */
  public ngOnInit(): void {
    this.route.url.subscribe(url => console.log(url[0].path));
    this.route.data.subscribe(data => console.log(data));

    this.initializeComponentProperties();
  }

  private initializeComponentProperties(): void {
    this.informationPanelElements = [{
      amount: 476,
      icon: 'local_atm',
      background: 'icon-background-blue',
      color: 'icon-color-blue',
      label: 'Cash'
    }, {
      amount: 4777,
      icon: 'credit_card',
      background: 'icon-background-purple',
      color: 'icon-color-purple',
      label: 'Credit card'
    }, {
      amount: 35534,
      icon: 'receipt',
      background: 'icon-background-red',
      color: 'icon-color-red',
      label: 'Bills'
    }, {
      amount: 555,
      icon: 'work_outline',
      background: 'icon-background-orange',
      color: 'icon-color-orange',
      label: 'Business'
    }];
  }
}
