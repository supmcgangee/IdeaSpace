using System.Linq;
using IdeaSpace.Models;
using IdeaSpace.Secondary;
using IdeaSpace.UseCases;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;

namespace IdeaSpaceTests.UseCases
{
    [TestClass]
    public class SpaceManagerTests
    {
        private SpaceManager spaceManager;
        private readonly Mock<IStorageAdapter> storageAdapterMock = new Mock<IStorageAdapter>();
        private const string knownId = "Default Dir";

        [TestInitialize]
        public void SetUp()
        {
            spaceManager = new SpaceManager(storageAdapterMock.Object);
            var newSpace = new Space { Name = knownId };

            storageAdapterMock.Setup(mock => mock.WriteToFile(newSpace));
            storageAdapterMock.Setup(mock => mock.ReadSpaceFromFile(It.IsAny<string>()))
                .Returns(new Space { Name = knownId });
            spaceManager.SaveSpace(newSpace);
        }

        [TestMethod]
        public void CanCreateASpace()
        {
            storageAdapterMock.Verify(mock => mock.WriteToFile(It.IsAny<Space>()));
        }

        [TestMethod]
        public void CanGetAllSpaces()
        {
            var spaces = spaceManager.GetSpacesList();

            Assert.IsTrue(spaces.Any(space => space.Name == knownId));
        }
        
        [TestMethod]
        public void CanCallDeleteASpaceMethodUsingStorageAdapter()
        {
            spaceManager.DeleteSpaceWithId(knownId);
        }
    }
}
