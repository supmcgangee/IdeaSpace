using System.Collections.Generic;
using System.IO;
using System.Linq;
using IdeaSpace.Models;
using IdeaSpace.Primary;
using IdeaSpace.Secondary;

namespace IdeaSpace.UseCases
{
    public class SpaceManager : ISpaceManager
    {
        private readonly IStorageAdapter storageAdapter;
        private const string rootDir = @"C:\Users\ukbdav\Documents\Projects\IdeaSpace\Repo\TestStorage\";
        private const string spaceData = @"\SpaceDat";
        private const string ext = ".txt";

        private List<Space> SpacesList = new List<Space>();

        public SpaceManager(IStorageAdapter storageAdapter)
        {
            this.storageAdapter = storageAdapter;
        }

        public void SaveSpace(Space newSpace)
        {
            storageAdapter.WriteToFile(newSpace);
            UpdateSpacesList();
        }

        public Space FindSpaceWithId(string id)
        {
            UpdateSpacesList();
            Space foundSpace = null;

            foreach (var space in SpacesList)
            {
                if (space.Name == id)
                {
                    foundSpace = space;
                }
            }

            return foundSpace;
        }

        public List<Space> GetSpacesList()
        {
            UpdateSpacesList();
            return SpacesList;
        }

        public void DeleteSpaceWithId(string id)
        {
            storageAdapter.DeleteDirectoryWithFiles(id);
        }

        private void UpdateSpacesList()
        { 
            var directories = Directory.GetDirectories(rootDir);
            if (!directories.Any(path => path.Contains(@"\Default Dir\")))
            {
                InitDefaultSpace();
                directories = Directory.GetDirectories(rootDir);
            }
            SpacesList = directories.Select(dir => storageAdapter.ReadSpaceFromFile(dir + spaceData + ext)).ToList();
        }

        private void InitDefaultSpace()
        {
            storageAdapter.InitDefaultDir();
        }
    }
}
