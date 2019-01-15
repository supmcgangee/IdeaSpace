using IdeaSpace.Primary;
using IdeaSpace.Secondary;
using IdeaSpace.UseCases;

namespace IdeaSpacePresentationServices.Utilities
{
    public class DataAdapterFactory
    {
        public static IRequestHandler CreateRequestHandlerAdapter()
        {
            IStorageAdapter storageAdapter = new  StorageAdapter();
            ISpaceManager spaceManager = new SpaceManager(storageAdapter);
            IIdeaManager ideaManager = new IdeaManager(storageAdapter);
            return new RequestHandler(spaceManager, ideaManager);
        }
    }
}
