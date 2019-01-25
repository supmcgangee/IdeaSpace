export class Space {
    public Name: string;
    public Description: string;
    public Groups: string[] = [];
    public canBeDeleted: boolean;
    public canCreateIdeas: boolean;
}