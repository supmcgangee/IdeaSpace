using IdeaSpace.Models;

namespace IdeaSpace.Primary
{
    public interface IRequestHandler
    {
        void CreateNewSpace(Space data);
        void CreateNewIdea(string spaceId, Idea data);
        string GetAllSpaces();
        string GetAllIdeas(string spaceId);
        string GetAllGroups(string spaceId);
        void DeleteSpace(string spaceId);
        void DeleteIdea(string spaceId, string idea);
    }
}
