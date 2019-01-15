using System.Collections.Generic;
using IdeaSpace.Models;

namespace IdeaSpace.Primary
{
    public interface ISpaceManager
    {
        void SaveSpace(Space newSpace);
        List<Space> GetSpacesList();
        void DeleteSpaceWithId(string id);
    }
}
