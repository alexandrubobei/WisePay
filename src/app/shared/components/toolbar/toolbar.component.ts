import { Component, EventEmitter, OnInit, Output } from '@angular/core';

/**
 * Toolbar component
 */
@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  links = ['Transactions', 'Scheduler', 'Reports', 'Other'];
  activeLink = this.links[0];
  /**
   * Event emitter for hiding the side menu
   */
  @Output() public hideSideMenuEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  /**
   * Constructor
   */
  constructor() {
  }

  /**
   * Initialize component data
   */
  public ngOnInit(): void {
  }

  /**
   * Emits an event to hide the side menu
   */
  public hideSideMenu(): void {
    this.hideSideMenuEvent.emit(true);
  }
}
