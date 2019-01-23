import { Idea } from "./idea";

export class Group {
    public Name: string;
    public Ideas: Idea[];
    public open: boolean = false;
}