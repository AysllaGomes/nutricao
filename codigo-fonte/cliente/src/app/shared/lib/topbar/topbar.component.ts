import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../shared/service/layout.service';

@Component({
  selector: 'ung-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {

  constructor(
      public layoutService: LayoutService
  ) {}

  ngOnInit() {}

}
