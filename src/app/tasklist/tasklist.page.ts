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
  taskList: AngularFireList<Task>;
  tasks: Observable<any[]>;
  itemName: string;

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public af: AngularFireDatabase) 
    {
    this.taskList = this.af.list('/tasks');
    this.tasks = this.taskList.valueChanges();
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
            let newTaskRef = this.taskList.push(
              { id: '', title: data.newTask, status: 'open' }
            );
            newTaskRef.update({ id: newTaskRef.key });

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
    this.taskList.update(task.id, task);
    slidingItem.close();
  }

  removeTask(slidingItem: IonItemSliding,task: Task) {
    task.status = "removed";
    this.taskList.remove(task.id);
    slidingItem.close();
  }
  
  ngOnInit() {
  }

}
