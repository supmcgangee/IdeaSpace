using System.Collections.Generic;
using IdeaSpace.Models;
using IdeaSpace.Secondary;
using IdeaSpace.UseCases;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;

namespace IdeaSpaceTests.UseCases
{
    [TestClass]
    public class IdeaManagerTests
    {
        private IdeaManager ideaManager;
        private readonly Mock<IStorageAdapter> storageAdapterMock = new Mock<IStorageAdapter>();
        private const string knownTitle = "Idea";
        private const string knownId = "Default Dir";

        private Idea testIdea;

        [TestInitialize]
        public void SetUp()
        {
            ideaManager = new IdeaManager(storageAdapterMock.Object);
            ideaManager.ChangeCurrentSpaceDir(knownId);

            storageAdapterMock.Setup(mock => mock.ReadAllIdeas(It.IsAny<string>()))
                .Returns(new List<Idea> { new Idea { Title = knownTitle, Id = knownTitle, Body = "test", ParentGroup = "A" }});
        }
        
        [TestMethod]
        public void CanCreateAIdeaInCurrentSpace()
        {
            testIdea = new Idea { Title = knownTitle, Id = "test", Body = "NewTestBody" };
            storageAdapterMock.Setup(mock => mock.WriteToFile(knownId, testIdea, false));

            ideaManager.SaveIdea(testIdea);

            storageAdapterMock.Verify(mock => mock.WriteToFile(It.IsAny<string>(), It.IsAny<Idea>(), false));
        }
        
        [TestMethod]
        public void CanCallDeleteFileMethodFromCurrentSpaceUsingStorageAdapter()
        {
            storageAdapterMock.Setup(mock => mock.DeleteFile(knownId + @"\", knownTitle));

            ideaManager.DeleteIdeaWithTitle(knownTitle);

            storageAdapterMock.Verify(mock => mock.DeleteFile(@"Default Dir\", knownTitle));
        }
    }
}
