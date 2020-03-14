import { Component } from "@angular/core";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "";
  tasks = [];
  isDoneValue =false ;
  url = "http://localhost:3000/tasks/";

  constructor(private http : HttpClient){
  }

  onClick() {
    this.http.post(this.url,
    { title : this.title , isDone : this.isDoneValue = false}).subscribe((data) => {
      this.tasks.push(data);
    })
  }
  remove(id) {
    this.http.delete(`${this.url}${id}`).subscribe((data) => {
    this.tasks = this.tasks.filter(task => {
      return task.id !== id;
  });
 } )
  }
  isDone(id) {
    this.isDoneValue = !this.isDoneValue;
    this.http.put(`${this.url}${id}`,
    {title : this.title, isDone : this.isDoneValue}).subscribe((data) => {
      this.tasks.filter(t => {
        if (t.id === id) {
          t.isDone = !t.isDone;
        }
      });
    });

  }
}
