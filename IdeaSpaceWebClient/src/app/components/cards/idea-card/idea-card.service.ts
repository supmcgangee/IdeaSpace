import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Idea } from '../../models/idea';

@Injectable({
  providedIn: 'root'
})
export class IdeaCardService {

  private uri: string = "http://localhost:5000/"

  constructor(private http: HttpClient) { }

  createNewIdea(spaceId: string, input: Idea): Promise<any> {
    return this.http.post<Idea>(this.uri + "api/request/createIdea/" + spaceId, input).toPromise();
  }

  deleteIdea(spaceId: string, ideaName: string) {
    let path = "api/request/deleteIdea/" + spaceId + "/" + ideaName;
    return this.http.delete<Idea>(this.uri + path).toPromise();
  }
}
