import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, IonItemSliding } from '@ionic/angular';
import { Task } from './task';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.page.html',
  styleUrls: ['./tasklist.page.scss'],
})
export class TasklistPage implements OnInit {
  tasks: Array<Task> = [];
  itemName: string;

  constructor(public navCtrl: NavController,public alertCtrl: AlertController) {
  }

  async addItem(){
    let prompt = await this.alertCtrl.create({
      header: 'Add item',
      message: 'Enter the item you wish to add.',
      inputs: [
        {name: 'itemName', 
        type: 'text'
        }
      ],
      buttons: [
        {text: 'Cancel',
        role: 'cancel'
      },
      {
        text: 'Add',
        handler: data => {
          this.itemName = data.itemName;

          if (this.itemName !== '') {
            this.tasks.push({
              title: this.itemName,
              status: 'open'
            });
          }
          this.itemName = '';
        }
      }
      ]
    });
    prompt.present();
  }

  markAsDone(slidingItem: IonItemSliding, task: Task) {
    task.status = "done";
    slidingItem.close();
  }

  removeTask(slidingItem: IonItemSliding,task: Task) {
    task.status = "removed";
    let index = this.tasks.indexOf(task);
    if (index > -1) {
      this.tasks.splice(index, 1);
    }
    slidingItem.close();
  }
  
  ngOnInit() {
  }

}
