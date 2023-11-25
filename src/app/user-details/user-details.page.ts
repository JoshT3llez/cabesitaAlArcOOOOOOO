import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.page.html',
  styleUrls: ['./user-details.page.scss'],
})
export class UserDetailsPage implements OnInit {
  userId: string;
  userProfile: User;

  constructor(
    private activatedRoute: ActivatedRoute,
    private firebaseSvc: FirebaseService
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      const userId = params.get('userId'); // Obtener el userId de la URL
      if (userId) {
        this.getUserDetails(); // Llamar a getUserDetails sin argumentos
      }
    });
  }

  getUserDetails() {
    if (this.userId) {
      this.firebaseSvc.getUserData(this.userId).then(user => {
        if (user) {
          this.userProfile = user;
        } else {
          console.error('No se encontraron datos para el usuario con el UID:', this.userId);
        }
      });
    }
  }
}
