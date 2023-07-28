import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder, HubConnectionState } from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {

  private _connection: HubConnection;
  
  get connection(): HubConnection {
    return this._connection;
  }

  start() {
    if (!this.connection || this._connection?.state == HubConnectionState.Disconnected) {
      const builder: HubConnectionBuilder = new HubConnectionBuilder();

      const hubConnection: HubConnection = builder.withUrl("https://localhost:7030/chat-hub")
        .withAutomaticReconnect()
        .build();

      hubConnection.start()
        .then(() => console.log(`Connected to chat-hub`))
        .catch(error => setTimeout(() => this.start(), 2000));

      this._connection = hubConnection;
    }

    this._connection.onreconnected(connectionId => console.log("Reconnected"));
    this._connection.onreconnecting(error => console.log("Reconnecting"));
    this._connection.onclose(error => console.log("Close connection"));
  }

  on(procedureName: string, callBack: (...message: any) => void) {
    this.connection.on(procedureName, callBack);
  }

  off() {
    this._connection.stop()
  }
}
