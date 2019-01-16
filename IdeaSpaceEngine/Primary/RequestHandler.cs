using System;
using IdeaSpace.Models;
using Newtonsoft.Json;

namespace IdeaSpace.Primary
{
    public class RequestHandler : IRequestHandler
    {
        private readonly ISpaceManager spaceManager;
        private readonly IIdeaManager ideaManager;

        public RequestHandler(ISpaceManager spaceManager, IIdeaManager ideaManager)
        {
            this.spaceManager = spaceManager;
            this.ideaManager = ideaManager;
        }

        public void CreateNewSpace(Space data)
        {
            spaceManager.SaveSpace(data);
        }

        public void CreateNewIdea(string spaceId, string data)
        {
            var newIdea = JsonConvert.DeserializeObject<Idea>(data);

            ideaManager.ChangeCurrentSpaceDir(spaceId);
            ideaManager.SaveIdea(newIdea);
        }

        public string GetAllSpaces()
        {
            var data = JsonConvert.SerializeObject(spaceManager.GetSpacesList());
            return data;
        }

        public string GetAllIdeas(string spaceId)
        {
            ideaManager.ChangeCurrentSpaceDir(spaceId);
            var data = JsonConvert.SerializeObject(ideaManager.GetAllIdeas());

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
