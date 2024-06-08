import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ShareService } from '../../../services/share.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  share = inject(ShareService)
  router = inject(Router)
  logoutNormalUser() {
    this.share.headerDetail.next({
      normalUser:false,
      superUser:false,
      vendorUser:false
    })
    localStorage.removeItem('userInfo')
    this.router.navigateByUrl('/login')
  }
}
