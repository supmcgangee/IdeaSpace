using System.Collections.Generic;
using System.IO;
using System.Linq;
using IdeaSpace.Models;
using IdeaSpace.Primary;
using IdeaSpace.Secondary;

namespace IdeaSpace.UseCases
{
    public class GroupManager : IGroupManager
    {
        private const string rootDir = @"C:\Users\ukbdav\Documents\Projects\IdeaSpace\Repo\TestStorage\";
        private const string ext = ".txt";

        private readonly IStorageAdapter storageAdapter;

        public GroupManager(IStorageAdapter storageAdapter)
        {
            this.storageAdapter = storageAdapter;
        }

        public List<Group> OrganiseIdeasIntoGroups(string currentSpaceDir)
        {
            var groupList = new List<Group>();
            if (!Directory.Exists(rootDir + currentSpaceDir)) return groupList;
            var files = storageAdapter.ReadAllIdeas(rootDir + currentSpaceDir);
            foreach (var file in files)
            {
                if (groupList.Any(g => g.Name == file.ParentGroup))
                {
                    groupList.Single(g => g.Name == file.ParentGroup).Ideas.Add(file);
                }
                else
                {
                    var newGroup = new Group
                    {
                        Name = file.ParentGroup,
                        Ideas = new List<Idea> { file }
                    };
                    groupList.Add(newGroup);
                }
            }

            return groupList;
        }
    }
}
