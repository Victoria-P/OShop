import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AppUser } from 'src/app/models/app-user';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.scss']
})
export class BsNavbarComponent implements OnInit{
  appUser: AppUser;

  constructor(private auth: AuthService, private shoppingCartService: ShoppingCartService) {
   }

  logout(){
    this.auth.logout();
  }

  async ngOnInit(){
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
    this.shoppingCartService.getItemsFromCart();
  }
}
