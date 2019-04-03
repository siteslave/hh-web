import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { NotifierService } from 'angular-notifier';

import * as mqttClient from '../../vendor/mqtt';
import { MqttClient } from 'mqtt';

import { ModalInfoComponent } from '../modal-info/modal-info.component';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {

  hn: any;
  client: MqttClient;
  isOffline = false;
  total = 0;

  items: any = [];

  private readonly notifier: NotifierService;

  @ViewChild('modalInfo') modalInfo: ModalInfoComponent;

  constructor(notifierService: NotifierService,
    private zone: NgZone,
    private api: ApiService) {
    this.notifier = notifierService;
  }

  async getRequest() {
    try {
      var rs: any = await this.api.getRequsts();
      if (rs.ok) {
        this.items = rs.rows;
      } else {
        this.notifier.notify('error', rs.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  ngOnInit() {
    this.getRequest();
    this.connectWebSocket();
  }

  public unsafePublish(topic: string, message: string): void {
    try {
      this.client.end(true);
    } catch (error) {
      console.log(error);
    }
  }

  public ngOnDestroy() {
    try {
      this.client.end(true);
    } catch (error) {
      console.log(error);
    }
  }

  connectWebSocket() {
    try {
      this.client = mqttClient.connect('ws://localhost:8888', {
        username: 'q4u',
        password: '##q4u##'
      });
    } catch (error) {
      console.log(error);
    }

    const topic = `request/notify`;

    console.log(topic);

    const that = this;

    this.client.on('message', (topic, payload) => {
      try {
        console.log(payload.toString());

        that.getRequest();

        that.total++;
        that.notifier.notify('success', 'New patient request!');
      } catch (error) {
        console.log(error);
      }

    });

    this.client.on('connect', () => {
      console.log('Connected!');
      that.zone.run(() => {
        that.isOffline = false;
      });

      that.client.subscribe(topic, (error) => {
        if (error) {
          that.zone.run(() => {
            that.isOffline = true;
          });
        }
      });
    });

    this.client.on('close', () => {
      console.log('MQTT Conection Close');
    });

    this.client.on('error', (error) => {
      console.log('MQTT Error');
      that.zone.run(() => {
        that.isOffline = true;
      });
    });

    this.client.on('offline', () => {
      console.log('MQTT Offline');
      that.zone.run(() => {
        that.isOffline = true;
      });
    });
  }

  openInfo(hn: any) {
    this.modalInfo.open();
  }
}
