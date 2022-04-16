import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

/**
 * Side menu component
 */
@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {
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
  }
}
