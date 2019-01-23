using IdeaSpace.Models;
using Newtonsoft.Json;

namespace IdeaSpace.Primary
{
    public class RequestHandler : IRequestHandler
    {
        private readonly ISpaceManager spaceManager;
        private readonly IIdeaManager ideaManager;
        private readonly IGroupManager groupManager;

        public RequestHandler(ISpaceManager spaceManager, IIdeaManager ideaManager, IGroupManager groupManager)
        {
            this.spaceManager = spaceManager;
            this.ideaManager = ideaManager;
            this.groupManager = groupManager;
        }

        public void CreateNewSpace(Space data)
        {
            spaceManager.SaveSpace(data);
        }

        public void CreateNewIdea(string spaceId, Idea data)
        {
            ideaManager.ChangeCurrentSpaceDir(spaceId);
            ideaManager.SaveIdea(data);
        }

        public string GetAllSpaces()
        {
            var data = JsonConvert.SerializeObject(spaceManager.GetSpacesList());
            return data;
        }

        public string GetAllGroups(string spaceId)
        {
            ideaManager.ChangeCurrentSpaceDir(spaceId);
            var data = JsonConvert.SerializeObject(groupManager.OrganiseIdeasIntoGroups(spaceId));

            return data;
        }

        public void DeleteSpace(string spaceId)
        {
            spaceManager.DeleteSpaceWithId(spaceId);
        }

        public void DeleteIdea(string spaceId, string idea)
        {
            ideaManager.ChangeCurrentSpaceDir(spaceId);
            ideaManager.DeleteIdeaWithTitle(idea);
        }
    }
}
