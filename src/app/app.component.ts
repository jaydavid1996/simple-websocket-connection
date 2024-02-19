import { Component } from '@angular/core';
import { io } from 'socket.io-client';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'websocket-sample';
  echo: any;
  private socket = io('http://localhost:6002/',{
    query: {token: environment.sampleToken }
  }).connect();
  
  constructor() {
    this.socket.on('connect', () => {
        console.log('CONNECTED');
    });
    this.socket.on('transaction_changes', (data: any) => {
        console.log('MESSAGE', data);
        
    });
    console.log(this.echo);
  }

  btnTransactionSave() {
    this.socket.emit('transaction_update', 
      {
        barangay_id: 1,
        transaction_id: 1
      }
    );
  }
}
