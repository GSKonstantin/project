import { Component} from '@angular/core';
// import {NgClass} from "@angular/common";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  start = false;
  in_game_total = 3;

  scores = {
    win: 0,
    loose: 0,
    current_number: 0,
    last_number: 0
  };

  settings = {
    global_time: 30,
    click_time: 2
  };

  timers = {
    global_timer: 0,
    click_timer: 0,
    global_count: 0
  };


  private stop_game(){ 
    window.clearInterval(this.timers.global_timer);
    window.clearInterval(this.timers.click_timer);
    this.timers.global_count = this.settings.global_time;
    this.start = false;
  };

  public start_game(){

    this.init_game();
    this.start = true;

    this.timers.global_timer = window.setInterval(() => {
      if(this.timers.global_count <= 0){
         this.stop_game();
      } else {
        this.timers.global_count--;
      }
    }, 1000);

  };

  
  private next_number(){

    this.timers.click_timer = window.setInterval(() => {
      this.change_number();
    }, this.settings.click_time * 1000);

  };

  private change_number(){

    do{
      this.scores.current_number = (Math.floor(Math.random() * ((this.in_game_total + 1) - 1) + 1));
    } while(this.scores.last_number == this.scores.current_number);
    this.scores.last_number = this.scores.current_number;
  };

  public select_number(value: number){

    if(value == this.scores.current_number){
      this.scores.win++;
    } else {
      this.scores.loose++;
    }

    window.clearInterval(this.timers.click_timer);
    this.change_number();
    this.next_number();

  };

  private init_game(){

    this.timers.global_count = this.settings.global_time;
    this.scores.win = this.scores.loose = 0;
    this.change_number();

  };
  
  constructor(){
    this.init_game();
  };
  
}

