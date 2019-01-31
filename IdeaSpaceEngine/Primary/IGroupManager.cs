using System;
using System.Collections.Generic;
using System.Text;
using IdeaSpace.Models;

namespace IdeaSpace.Primary
{
    public interface IGroupManager
    {
        List<Group> SortIdeasIntoGroups(string currentSpaceDir);
    }
}
