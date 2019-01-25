namespace IdeaSpace.Models
{
    public class Space
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string[] Groups { get; set; }
        public bool canBeDeleted = true;
        public bool canCreateIdeas = true;
    }
}
