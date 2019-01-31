using System.Collections.Generic;
using System.IO;
using System.Linq;
using IdeaSpace.Models;
using Newtonsoft.Json;

namespace IdeaSpace.Secondary
{
    public class StorageAdapter : IStorageAdapter
    {
        private const string rootDir = @"C:\Users\ukbdav\Documents\Projects\IdeaSpace\Repo\TestStorage\";
        private const string ext = ".txt";

        public List<Idea> ReadAllIdeas(string filePath)
        {
            var list = new List<Idea>();
            var files = Directory.GetFiles(filePath);

            list.AddRange(files.Where(f => !f.EndsWith("SpaceDat" + ext))
                .Select(f => JsonConvert.DeserializeObject<Idea>(File.ReadAllText(f))));

            return list;
        }

        public Space ReadSpaceFromFile(string filePath)
        {
            var data = File.ReadAllText(filePath);
            var space = JsonConvert.DeserializeObject<Space>(data);
            return space;
        }

        public void WriteToFile(Space space)
        {
            var data = JsonConvert.SerializeObject(space);
            if (!Directory.Exists(rootDir + space.Name)) Directory.CreateDirectory(rootDir + space.Name);
            File.WriteAllText(rootDir + space.Name + @"\SpaceDat" + ext, data);
        }

        public void WriteToFile(string spaceName, Idea idea, bool writeOverride = false)
        {
            var fileDir = rootDir + spaceName;
            var data = JsonConvert.SerializeObject(idea);
            if (!Directory.Exists(fileDir)) Directory.CreateDirectory(fileDir);
            var spaceData = File.ReadAllText(fileDir + @"\SpaceDat" + ext);
            var space = JsonConvert.DeserializeObject<Space>(spaceData);
            if (space.canCreateIdeas || writeOverride)
                File.WriteAllText(rootDir + spaceName + @"\" + idea.Id + ext, data);
        }

        public void DeleteFile(string spaceName, string fileName)
        {
            File.Delete(rootDir + spaceName + fileName + ext);
        }

        public void DeleteDirectoryWithFiles(string dirName)
        {
            var data = File.ReadAllText(rootDir + dirName + @"\SpaceDat" + ext);
            var space = JsonConvert.DeserializeObject<Space>(data);
            if (space.canBeDeleted == false) return;

            var files = Directory.GetFiles(rootDir + dirName);

            foreach (var file in files)
            {
                File.Delete(file);
            }

            Directory.Delete(rootDir + dirName);
        }

        public void InitDefaultDir()
        {
            var idea = new Idea
            {
                Title = "Idea",
                Id = "Idea",
                Body = "Hi, I'm Default",
                ParentGroup = "Default Group"
            };
            var space = new Space
            {
                Name = "Default Dir",
                Description = "The Default Directory provided by the program.",
                Groups = new []{"Default Group"},
                canBeDeleted = false,
                canCreateIdeas = false
            };

            WriteToFile(space);
            WriteToFile(space.Name, idea, true);
        }
    }
}
