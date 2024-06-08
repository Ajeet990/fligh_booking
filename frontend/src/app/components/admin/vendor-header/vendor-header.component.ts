import { Component, inject } from '@angular/core';
import { ShareService } from '../../../services/share.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-vendor-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './vendor-header.component.html',
  styleUrl: './vendor-header.component.css'
})
export class VendorHeaderComponent {
  share = inject(ShareService)
  router = inject(Router)

  logoutVendor() {
    this.share.headerDetail.next({
      normalUser : false,
      vendorUser : false,
      superUser : false
    })
    console.log("out")
    localStorage.removeItem('userInfo')
    this.router.navigateByUrl('/login')
  }
}
