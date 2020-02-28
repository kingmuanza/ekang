import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/services/notification.service';
import { NotificationEkang } from 'src/app/models/notification.model';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {

  notifications = new Array<NotificationEkang>();
  constructor(private notifService: NotificationService) { }

  ngOnInit() {
    this.getNotifications();
  }

  getNotifications() {
    this.notifService.getNotifications().then((notifications)=>{
      this.notifications = notifications;
    })
  }

}
