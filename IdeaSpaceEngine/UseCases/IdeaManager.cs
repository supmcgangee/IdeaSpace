using System;
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
        private const string defaultSpaceId = "Default Dir";
        private const string alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
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

        public Idea FindIdeaWithTitle(string id)
        {
            GetAllIdeas();
            var foundIdea = ideaList.FirstOrDefault(idea => idea.Id == id);

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

            idea = GenerateId(idea);
            storageAdapter.WriteToFile(currentSpaceDir, idea);
        }

        public void DeleteIdeaWithTitle(string title)
        {
            var ideas = storageAdapter.ReadAllIdeas(rootDir + currentSpaceDir);
            var titles = ideas.Select(idea => idea.Title).ToList();

            if (!titles.Contains(title)) return;

            storageAdapter.DeleteFile(currentSpaceDir, title);
        }

        private void GetAllIdeas()
        {
            ideaList = storageAdapter.ReadAllIdeas(rootDir + currentSpaceDir);
        }

        private static Idea GenerateId(Idea idea)
        {
            if (!string.IsNullOrEmpty(idea.Id)) { return idea; }

            var guid = Guid.NewGuid();
            var guidReplace = guid.ToString();

            string[] replaceThese = {"-", "a", "b", "c", "d", "e", "f"};
            string[] replaceWith = { " ", "1", "2", "3", "4", "5", "6"};
            
            for (var i = 0; i < replaceThese.Length; i++)
            {
                guidReplace = guidReplace.Replace(replaceThese[i], replaceWith[i]);
            }

            string id = "";
            for (var i = 0; i < guidReplace.Length; i += 2)
            {
                var subString = guidReplace.Substring(i, 2);
                var number = int.Parse(subString);

                id += alphabet[number % alphabet.Length];
            }

            idea.Id = id;
            return idea;
        }
    }
}
