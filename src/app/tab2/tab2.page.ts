import { Component } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { User } from '../models/user.model';
import { NavController } from '@ionic/angular'; // Importa NavController
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  currentUser: User | null = null;
  users: User[] = [];
  filteredUsers: User[] = [];
  searchTerm: string = '';

  constructor(
    private firebaseSvc: FirebaseService,
    private navCtrl: NavController,
    private router: Router
  ) {
    this.getUsers();
  }

    async getUsers() {
      try {
        // Obtener todos los usuarios de Firebase
        this.users = await this.firebaseSvc.getAllUsers();
        this.currentUser = await this.firebaseSvc.getCurrentUser();

        if (this.currentUser) {
          // Excluir al usuario actual de la lista
          this.filteredUsers = this.users.filter(user => user.uid !== this.currentUser.uid);
        } else {
          // Si currentUser es null, asigna todos los usuarios a filteredUsers
          this.filteredUsers = this.users;
        }
      } catch (error) {
        console.error('Error al obtener usuarios:', error);
      }
    }

    onSearch(event: any) {
      // Asignar el término de búsqueda desde el evento de input
      this.searchTerm = event.target.value.trim().toLowerCase();
      this.filterUsers();
    }

    filterUsers() {
      // Filtrar la lista de usuarios según el término de búsqueda
      this.filteredUsers = this.users.filter(user => {
        const username = user.username.toLowerCase();
        return username.includes(this.searchTerm);
      });
    }

    handleUserClick(user: User) {
      if (user && user.uid) {
        this.router.navigate(['/user-details', user.uid]);
      } else {
        console.error('El userId está indefinido');
      }
    }

}
