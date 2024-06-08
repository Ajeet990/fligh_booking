import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LayoutComponent } from './components/admin/layout/layout.component';
import { CommonModule } from '@angular/common';
import { VendorHeaderComponent } from './components/admin/vendor-header/vendor-header.component';
import { SuperHeaderComponent } from './components/admin/super-header/super-header.component';
import { ShareService } from './services/share.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LayoutComponent, CommonModule, VendorHeaderComponent, SuperHeaderComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'flight_booking';
  normal: boolean = false;
  vendor: boolean = false;
  super: boolean = false;

  share = inject(ShareService);

  ngOnInit(): void {
    this.share.userDetails.subscribe((res: any) => {
      console.log("userDetail:", res);
      switch (res.role) {
        case 1:
          this.updateHeaderDetail({ normalUser: false, vendorUser: true, superUser: false });
          break;
        case 2:
          this.updateHeaderDetail({ normalUser: true, vendorUser: false, superUser: false });
          break;
        case 3:
          this.updateHeaderDetail({ normalUser: false, vendorUser: false, superUser: true });
          break;
        default:
          this.updateHeaderDetail({ normalUser: false, vendorUser: false, superUser: false });
      }
    });
  }

  updateHeaderDetail(headerDetail: { normalUser: boolean, vendorUser: boolean, superUser: boolean }): void {
    this.share.headerDetail.next(headerDetail);
    this.share.headerDetail.subscribe((r: any) => {
      this.vendor = r.vendorUser;
      this.normal = r.normalUser;
      this.super = r.superUser;
    });
  }
}
