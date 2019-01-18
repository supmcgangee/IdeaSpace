import { Injectable } from '@angular/core';
import { Idea } from '../models/idea';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class WorkSpaceService {

  private uri : string = "http://localhost:5000/"

  constructor( private http : HttpClient ) { }

  getAllIdeas(spaceId : string) : Promise<Idea[]>{
      return this.http.get<Idea[]>(this.uri + "api/request/getIdeasInSpace/" + spaceId).toPromise();
  }

  createNewIdea(spaceId : string, input : Idea) : Promise<any>{
    return this.http.post<Idea>(this.uri + "api/request/createIdea/" + spaceId, input).toPromise();
  }

  deleteIdea(spaceId : string, ideaName : string){
    let path = "api/request/deleteIdea/" + spaceId + "/" + ideaName;
    return this.http.delete<Idea>(this.uri + path).toPromise();
  }
}
