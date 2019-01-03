using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.IO;
using System.Linq;
using IdeaSpaceEngine.Models;

namespace IdeaSpaceEngine.Primary
{
    public class SpaceManager
    {
        private const string rootDir = @"C:\Users\ukbdav\Documents\Projects\IdeaSpace\Repo\TestStorage\";
        private const string ext = ".txt";

        public List<Space> SpacesList = new List<Space>();
        public Space CurrentSpace;

        public void CreateSpace(string spaceId)
        {
            if (!Directory.Exists(rootDir + spaceId))
            {
                Directory.CreateDirectory(rootDir + spaceId);
            }
            if (!File.Exists(rootDir + spaceId + @"\SpaceDat" + ext))
            {
                File.Create(rootDir + spaceId + @"\SpaceDat" + ext);
            }

            UpdateSpacesList();
        }

        private void UpdateSpacesList()
        {
            var dirs = Directory.GetDirectories(rootDir);

            foreach (var dir in dirs)
            {
                SpacesList.Add(new Space());
            }
        }

        public Space FindSpaceWithId(string id)
        {
            foreach (var space in SpacesList)
            {
                if (space.name != id) continue;
                CurrentSpace = space;
                return space;
            }

            return null;
        }
    }
}
