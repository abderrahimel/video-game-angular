import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { APIResponse, Game } from 'src/app/models';
import { HttpService } from '../../services/http.service';
/* error related to initialisation of property 
Go to your tsconfig.json file and change the property:

 "noImplicitReturns": false
  and then add

 "strictPropertyInitialization": false

*/
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  public sort: string;
  public games: Array<Game>;
  private routeSub: Subscription;
  private gameSub: Subscription;
  constructor( private httpService: HttpService, private router: Router , private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.routeSub = this.activatedRoute.params.subscribe((params: Params) =>{
        //   here we get the param from  path: 'search/:game-search'
          if(params['game-search']){
            
            this.searchGames('metacrit', params['game-search']);
          }else{
            this.searchGames('metacrit');
          }
    });
    this.activatedRoute.params.subscribe((params: Params) => {
      if(params['game-search']){
        this.searchGames('metacrit', params['game-search']);
      } else{
        this.searchGames('metacrit');
      }
       console.log("game-search"+params['game-search']);

    })
  }
  searchGames(sort: string, search?: string): void{
    this.gameSub = this.httpService
    .getGameList(sort, search)
    .subscribe((gameList: APIResponse<Game>) =>{
      this.games = gameList.results;
      console.log(gameList);
    });
  }
  openGameDetails(id: number): void {
    //  when we click on , this will take us into /details/id
    //  and we will get that id by params['id']
    this.router.navigate(['details', id]);
  }

  ngOnDestroy(): void {
    if(this.gameSub){
      this.gameSub.unsubscribe();
    }
    if(this.routeSub){
      this.routeSub.unsubscribe();
    }
  }

}
