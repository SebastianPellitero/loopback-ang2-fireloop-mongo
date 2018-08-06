import { Component } from '@angular/core';
import { Population, FireLoopRef } from './shared/sdk/models';
import { RealTime } from './shared/sdk/services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  title = 'Population Application';

  public population: Population = new Population();
  public reference : FireLoopRef<Population>;
  private populations: Array<Population>;
  private clientSub: Subscription;

  constructor(public rt: RealTime) {
    /*this.rt.onReady().subscribe(() => { 

      this.reference = this.rt.FireLoop.ref<Population>(Population),
            this.reference.on('change').subscribe((populations: Array<Population>) => {
              this.populations = populations;
              //console.log('constructor', populations);
            }) */
            /*this.reference.on('value').subscribe((populations: Array<Population>) => {
              this.populations = populations.concat();
              console.log('population',this.populations);
            })*/
        /*}); */
  }

  ngOnInit() {
    console.log('rt es ', this.rt);
    console.log('client sub es ', this.clientSub);
    if ( this.rt.connection.isConnected() && this.rt.connection.authenticated ) {
        this.rt.onReady().subscribe(() => this.setup());
    } else {
      this.rt.onAuthenticated().subscribe(() => this.setup());
      this.rt.onReady().subscribe();
    }
  }

  setup(): void {
    // Make sure you never have duplicated references and subscriptions
    //this.ngOnDestroy();
    //this.reference = this.rt.FireLoop.ref<Population>(Population);
    //this.clientSub = this.reference.on('change').subscribe((populations: Population[]) => console.log("logged in",populations));

    this.rt.onReady().subscribe(() => {

      this.reference = this.rt.FireLoop.ref<Population>(Population),
      this.clientSub = this.reference.on('change').subscribe((populations: Array<Population>) => {
              this.populations = populations;
              console.log('clientSub', this.clientSub);
            })
            /*this.reference.on('value').subscribe((populations: Array<Population>) => {
              this.populations = populations.concat();
              console.log('population',this.populations);
            })*/
        });
  }

  ngOnDestroy() {
    if (this.reference) this.reference.dispose();
    if (this.clientSub) this.clientSub.unsubscribe();
  }

  add(): void {
    //this.reference.create(this.population).subscribe(() => this.population = new Population());
    //this.reference.create(this.population).subscribe((instance: Population) => {console.log('create',instance)});
    this.reference.create(this.population).subscribe();
  }

  update(population: Population): void {
    this.reference.upsert(population).subscribe();
  }

  remove(population: Population): void {
    this.reference.remove(population).subscribe();
  }
}