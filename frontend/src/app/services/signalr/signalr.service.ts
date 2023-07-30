import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder, HubConnectionState } from '@microsoft/signalr';
import { Properties } from 'src/app/constants/properties';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {

  private _connection: HubConnection;

  get connection(): HubConnection {
    return this._connection;
  }

  start(userId: string) {
    if (!this.connection || this._connection?.state == HubConnectionState.Disconnected) {
      const builder: HubConnectionBuilder = new HubConnectionBuilder();

      const hubConnection: HubConnection = builder.withUrl(`${Properties.URL}/chat-hub?user-id=` + encodeURIComponent(userId))
        .withAutomaticReconnect()
        .build();

      hubConnection.start()
        .then(() => console.log(`Connected to chat-hub`))
        .catch(error => setTimeout(() => this.start(userId), 2000));

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
