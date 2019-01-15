using System.Collections.Generic;
using IdeaSpace.Models;

namespace IdeaSpace.Primary
{
    public interface IIdeaManager
    {
        void ChangeCurrentSpaceDir(string spaceId);
        void SaveIdea(Idea idea);
        List<Idea> GetAllIdeas();
        void DeleteIdeaWithTitle(string title);
    }
}
