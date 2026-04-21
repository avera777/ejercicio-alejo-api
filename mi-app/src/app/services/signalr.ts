import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {
  private hubConnection!: signalR.HubConnection;

  startConnection(): Promise<void> {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:5127/expensesHub')
      .withAutomaticReconnect()
      .build();

    return this.hubConnection
      .start()
      .then(() => {
        console.log('Conectado a SignalR');
      })
      .catch(error => {
        console.error('Error al conectar SignalR:', error);
      });
  }

  onExpensesUpdated(callback: () => void) {
    this.hubConnection.on('ExpensesUpdated', () => {
      console.log('Evento ExpensesUpdated recibido');
      callback();
    });
  }
}