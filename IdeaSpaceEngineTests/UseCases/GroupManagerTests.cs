using System.Collections.Generic;
using IdeaSpace.Models;
using IdeaSpace.Secondary;
using IdeaSpace.UseCases;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;

namespace IdeaSpaceTests.UseCases
{
    [TestClass]
    public class GroupManagerTests
    {
        private GroupManager groupManager;
        private readonly Mock<IStorageAdapter> storageAdapter = new Mock<IStorageAdapter>();
        private const string knownId = "Default Dir";

        private List<Idea> ideasList;

        [TestInitialize]
        public void SetUp()
        {
            groupManager = new GroupManager(storageAdapter.Object);
            if (ideasList == null)
            {
                InitIdeas();
            }
        }

        [TestMethod]
        public void TestCanGetListOfGroups()
        {
            storageAdapter.Setup(mock => mock.ReadAllIdeas(It.IsAny<string>())).Returns(ideasList);

            var groups = groupManager.OrganiseIdeasIntoGroups(knownId);

            Assert.IsTrue(groups.Count == 3);
            for (int i = 0; i < groups.Count; i++)
            {
                Assert.IsTrue(groups[i].Ideas.Count == i + 1,"expected count/current loop" + i);
            }
        }

        private void InitIdeas()
        {
            ideasList = new List<Idea>
            {
                new Idea { Title = "Test Idea 1", Body = "Test", ParentGroup = "A" },
                new Idea { Title = "Test Idea 2", Body = "Test", ParentGroup = "B" },
                new Idea { Title = "Test Idea 3", Body = "Test", ParentGroup = "B" },
                new Idea { Title = "Test Idea 4", Body = "Test", ParentGroup = "C" },
                new Idea { Title = "Test Idea 5", Body = "Test", ParentGroup = "C" },
                new Idea { Title = "Test Idea 6", Body = "Test", ParentGroup = "C" }
            };
        }
    }
}
