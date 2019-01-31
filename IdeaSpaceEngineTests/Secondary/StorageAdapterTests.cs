using System.Collections.Generic;
using System.IO;
using System.Linq;
using IdeaSpace.Models;
using IdeaSpace.Secondary;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace IdeaSpaceTests.Secondary
{
    [TestClass]
    public class StorageAdapterTests
    {
        private StorageAdapter storageAdapter;
        private const string rootDir = @"C:\Users\ukbdav\Documents\Projects\IdeaSpace\Repo\TestStorage\";
        private const string spaceData = @"\SpaceDat";
        private const string ext = ".txt";

        private Space testSpace;
        private List<string> ideas;

        [TestInitialize]
        public void SetUp()
        {
            storageAdapter = new StorageAdapter();
            ideas = new List<string> { "NewIdea" };
            testSpace = new Space { Name = "TestSpace" };

            if (!Directory.Exists(rootDir + testSpace.Name))
            {
                storageAdapter.WriteToFile(testSpace);
            }
        }

        [TestMethod]
        public void CanReadSpaceFromFile()
        {
            var filepath = rootDir + testSpace.Name + @"\SpaceDat" + ext;
            var foundSpace = storageAdapter.ReadSpaceFromFile(filepath);

            Assert.AreEqual(testSpace.Name, foundSpace.Name);
        }

        [TestMethod]
        public void CanReadAllIdeas()
        {
            var foundIdeas = storageAdapter.ReadAllIdeas(rootDir + "Default Dir");


            Assert.IsTrue(foundIdeas.Select(i => i.Title == "Idea").FirstOrDefault());
        }

        [TestMethod]
        public void CanSerializeSpaceToString()
        {
            storageAdapter.WriteToFile(testSpace);

            Assert.IsTrue(Directory.Exists(rootDir + testSpace.Name));
            Assert.IsTrue(File.Exists(rootDir + testSpace.Name + spaceData + ext));
        }

        [TestMethod]
        public void CanSerializeIdeaToString()
        {
            var ideaList = ideas.Select(i => new Idea { Title = i, Id = i}).ToList();

            foreach (var idea in ideaList)
            {
                storageAdapter.WriteToFile(testSpace.Name, idea);

                Assert.IsTrue(File.Exists(rootDir + testSpace.Name + @"\" + idea.Id + ext));
            }
        }

        [TestMethod]
        public void CanDeleteFileWithGivenName()
        {
            var spaceDir = testSpace.Name + @"\";

            storageAdapter.DeleteFile(spaceDir, ideas.Last());

            Assert.IsFalse(File.Exists(rootDir + spaceDir + ideas.Last() + ext));
        }

        [TestMethod]
        public void CanDeleteDirectoryWithGivenName()
        {
            storageAdapter.WriteToFile(testSpace);

            storageAdapter.DeleteDirectoryWithFiles(testSpace.Name);

            Assert.IsFalse(Directory.Exists(rootDir + testSpace.Name));
        }

        [TestMethod]
        public void CanNotDeleteDirectoryIfHasCannotBeDeletedFlag()
        {
            var flaggedSpace = new Space{ Name = "Default Dir", canBeDeleted = false }; 
            storageAdapter.WriteToFile(flaggedSpace);

            storageAdapter.DeleteDirectoryWithFiles(flaggedSpace.Name);

            Assert.IsTrue(Directory.Exists(rootDir + testSpace.Name));
        }

        [TestCleanup]
        public void CleanUp()
        {
            if (Directory.Exists(rootDir + testSpace.Name))
            {
                storageAdapter.DeleteDirectoryWithFiles(testSpace.Name);
            }
        }
    }
}
