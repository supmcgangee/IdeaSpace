import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Idea } from '../../models/idea';
import { Space } from '../../models/space';

@Injectable({
  providedIn: 'root'
})
export class GroupCardService {

  private uri: string = "http://localhost:5000/"

  constructor(private http: HttpClient) { }

  createNewSpace(input: Space): Promise<any> {
    return this.http.post<Space>(this.uri + "api/request/createSpace", input).toPromise();
  }

  createNewIdea(spaceId: string, input: Idea): Promise<any> {
    return this.http.post<Idea>(this.uri + "api/request/createIdea/" + spaceId, input).toPromise();
  }

  deleteIdea(spaceId: string, ideaName: string) {
    let path = "api/request/deleteIdea/" + spaceId + "/" + ideaName;
    return this.http.delete<Idea>(this.uri + path).toPromise();
  }
}
