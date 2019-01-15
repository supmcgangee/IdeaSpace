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
        private const string rootDir = @"C:\Users\ukbdav\Documents\Projects\IdeaSpace\Repo\TestStorage\";
        private const string knownId = "Default Dir";
        private const string ext = ".txt";

        private Idea testIdea;

        [TestInitialize]
        public void SetUp()
        {
            ideaManager = new IdeaManager(storageAdapterMock.Object);
            ideaManager.ChangeCurrentSpaceDir(knownId);

            const string filePath = rootDir + knownId + @"\";

            storageAdapterMock.Setup(mock => mock.ReadIdeaFromFile(filePath + knownTitle + ext))
                .Returns(new Idea { Title = knownTitle });
        }
        
        [TestMethod]
        public void CanCreateAIdeaInCurrentSpace()
        {
            testIdea = new Idea { Title = knownTitle, Body = "NewTestBody" };
            storageAdapterMock.Setup(mock => mock.WriteToFile(knownId, testIdea));

            ideaManager.SaveIdea(testIdea);

            storageAdapterMock.Verify(mock => mock.WriteToFile(It.IsAny<string>(), It.IsAny<Idea>()));
        }
        
        [TestMethod]
        public void FindMethodIsAbleToReturnAIdea()
        {
            storageAdapterMock.Setup(mock => mock.ReadIdeaFromFile(It.IsAny<string>()))
                .Returns(new Idea { Title = knownTitle });

            Assert.IsNotNull(ideaManager.FindIdeaWithTitle(knownTitle));
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
