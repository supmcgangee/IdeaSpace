using System.Collections.Generic;
using System.IO;
using System.Linq;
using IdeaSpace.Models;
using IdeaSpace.Primary;
using IdeaSpace.Secondary;

namespace IdeaSpace.UseCases
{
    public class IdeaManager : IIdeaManager
    {
        private readonly IStorageAdapter storageAdapter;
        private const string rootDir = @"C:\Users\ukbdav\Documents\Projects\IdeaSpace\Repo\TestStorage\";
        private const string ext = ".txt";
        private const string defaultSpaceId = "Default Dir";
        private string currentSpaceDir;
        private List<Idea> ideaList = new List<Idea>();

        public IdeaManager(IStorageAdapter storageAdapter)
        {
            this.storageAdapter = storageAdapter;
            currentSpaceDir = defaultSpaceId;
        }

        public void SaveIdea(Idea newIdea)
        {
            WriteIdeaToFile(newIdea);
            GetAllIdeas();
        }

        public Idea FindIdeaWithTitle(string title)
        {
            GetAllIdeas();
            var foundIdea = ideaList.FirstOrDefault(idea => idea.Title == title);

            return foundIdea;
        }

        public void ChangeCurrentSpaceDir(string spaceId)
        {
            currentSpaceDir = spaceId + @"\";
        }

        private void WriteIdeaToFile(Idea idea)
        {
            if (currentSpaceDir == null) { return; }
            if (!Directory.Exists(currentSpaceDir))
                Directory.CreateDirectory(currentSpaceDir);

            storageAdapter.WriteToFile(currentSpaceDir, idea);
        }

        public void DeleteIdeaWithTitle(string title)
        {
            var ideas = GetAllIdeasAsString();
            if (!ideas.Contains(title)) return;

            storageAdapter.DeleteFile(currentSpaceDir, title);
        }

        public List<Idea> GetAllIdeas()
        {
            ideaList = new List<Idea>();
            if (!Directory.Exists(rootDir + currentSpaceDir)) return ideaList;
            var files = Directory.GetFiles(rootDir + currentSpaceDir);
            foreach (var file in files)
            {
                if(file.EndsWith("SpaceDat" + ext)) continue;

                var idea = storageAdapter.ReadIdeaFromFile(file);
                ideaList.Add(idea);
            }
            
            return ideaList;
        }

        public List<string> GetAllIdeasAsString()
        {
            GetAllIdeas();
            var strings = ideaList.Select(idea => idea.Title).ToList();

            return strings;
        }
    }
}
