import { Injectable } from '@angular/core';
import { Space } from '../../models/space';
import { Idea } from '../../models/idea';
import { Group } from '../../models/group';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WorkSpaceService {

  private uri: string = "http://localhost:5000/"

  constructor(private http: HttpClient) { }

  getAllGroups(spaceId: string): Promise<Group[]> {
    return this.http.get<Group[]>(this.uri + "api/request/getGroupsInSpace/" + spaceId).toPromise();
  }

  createNewSpace(input: Space): Promise<any> {
    return this.http.post<Space>(this.uri + "api/request/createSpace", input).toPromise();
  }
}
