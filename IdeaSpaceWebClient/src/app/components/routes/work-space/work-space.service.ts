import { Injectable } from '@angular/core';
import { Idea } from '../../models/idea';
import { Group } from '../../models/group';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class WorkSpaceService {

  private uri: string = "http://localhost:5000/"

  constructor(private http: HttpClient) { }

  getAllGroups(spaceId: string): Promise<Group[]> {
    return this.http.get<Group[]>(this.uri + "api/request/getGroupsInSpace/" + spaceId).toPromise();
  }

  createNewIdea(spaceId: string, input: Idea): Promise<any> {
    return this.http.post<Idea>(this.uri + "api/request/createIdea/" + spaceId, input).toPromise();
  }

  deleteIdea(spaceId: string, ideaName: string) {
    let path = "api/request/deleteIdea/" + spaceId + "/" + ideaName;
    return this.http.delete<Idea>(this.uri + path).toPromise();
  }
}
