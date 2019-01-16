import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { Space } from '../models/space';

@Injectable({
  providedIn: 'root'
})
export class SpacelistService {

  
  private uri : string = "http://localhost:5000/"

  constructor(private http : HttpClient) { }

  getAllSpaces() : Promise<Space[]>{
    return this.http.get<Space[]>(this.uri + "api/request/getSpaces").toPromise();
  }

  createNewSpace(input : Space) : Promise<any>{
    return this.http.post<Space>(this.uri + "api/request/createSpace", input).toPromise();
  }
}
