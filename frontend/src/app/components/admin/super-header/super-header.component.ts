import { Component, inject } from '@angular/core';
import { ShareService } from '../../../services/share.service';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-super-header',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './super-header.component.html',
  styleUrl: './super-header.component.css'
})
export class SuperHeaderComponent {
  share = inject(ShareService)
  router = inject(Router)
  logoutSuper() {
    this.share.headerDetail.next({
      normalUser : false,
      superUser : false,
      vendorUser : false
    })
    localStorage.removeItem('userInfo')
    this.router.navigateByUrl('/login')
  }
}
