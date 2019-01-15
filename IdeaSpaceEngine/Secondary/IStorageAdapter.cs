using IdeaSpace.Models;

namespace IdeaSpace.Secondary
{
    public interface IStorageAdapter
    {
        Idea ReadIdeaFromFile(string filePath);
        Space ReadSpaceFromFile(string filePath);
        void WriteToFile(Space space);
        void WriteToFile(string filePath, Idea idea);
        void DeleteFile(string spaceName, string fileName);
        void DeleteDirectoryWithFiles(string dirName);
        void InitDefaultDir();
    }
}
