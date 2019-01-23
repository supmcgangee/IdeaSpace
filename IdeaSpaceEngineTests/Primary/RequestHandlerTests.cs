using System.Collections.Generic;
using IdeaSpace.Models;
using IdeaSpace.Primary;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;

namespace IdeaSpaceTests.Primary
{
    [TestClass]
    public class RequestHandlerTests
    {
        private RequestHandler requestHandler;
        private readonly Mock<ISpaceManager> spaceManagerMock = new Mock<ISpaceManager>();
        private readonly Mock<IIdeaManager> ideaManagerMock = new Mock<IIdeaManager>();
        private readonly Mock<IGroupManager> groupManagerMock = new Mock<IGroupManager>();
        private const string spaceId = "space";

        [TestInitialize]
        public void SetUp()
        {
            requestHandler = new RequestHandler(spaceManagerMock.Object, ideaManagerMock.Object, groupManagerMock.Object);
        }

        [TestMethod]
        public void VerifyThatCreateNewSpaceMethodIsCalled()
        {
            var space = new Space { Name = spaceId };
            spaceManagerMock.Setup(mock => mock.SaveSpace(It.IsAny<Space>()));

            requestHandler.CreateNewSpace(space);

            spaceManagerMock.Verify(mock => mock.SaveSpace(It.IsAny<Space>()));
        }

        [TestMethod]
        public void VerifyThatCreateNewIdeaMethodIsCalled()
        {
            var idea = new Idea{ Title = "Idea", Body = "Body" };
            ideaManagerMock.Setup(mock => mock.SaveIdea(It.IsAny<Idea>()));

            requestHandler.CreateNewIdea(spaceId, idea);

            ideaManagerMock.Verify(mock => mock.SaveIdea(It.IsAny<Idea>()));
        }

        [TestMethod]
        public void VerifyThatCanGetAllSpaces()
        {
            var testList = new List<Space>();

            spaceManagerMock.Setup(mock => mock.GetSpacesList()).Returns(testList);

            requestHandler.GetAllSpaces();

            spaceManagerMock.Verify(mock => mock.GetSpacesList());
        }

        [TestMethod]
        public void VerifyThatCanGetAllIdeasFromSpace()
        {
            var testList = new List<Idea>();

            ideaManagerMock.Setup(mock => mock.GetAllIdeas()).Returns(testList);

            requestHandler.GetAllIdeas(spaceId);

            ideaManagerMock.Verify(mock => mock.GetAllIdeas());
        }

        [TestMethod]
        public void VerifyThatCanOrganizeIdeasFromSpaceIntoGroups()
        {
            var testList = new List<Group>();

            groupManagerMock.Setup(mock => mock.OrganiseIdeasIntoGroups(It.IsAny<string>())).Returns(testList);

            requestHandler.GetAllGroups(spaceId);

            groupManagerMock.Verify(mock => mock.OrganiseIdeasIntoGroups(It.IsAny<string>()));
        }

        [TestMethod]
        public void VerifyThatDeleteSpaceMethodIsCalled()
        {
            spaceManagerMock.Setup(mock => mock.DeleteSpaceWithId(spaceId));

            requestHandler.DeleteSpace(spaceId);

            spaceManagerMock.Verify(mock => mock.DeleteSpaceWithId(It.IsAny<string>()));
        }

        [TestMethod]
        public void VerifyThatDeleteIdeaMethodIsCalled()
        {
            var ideaId = "idea";

            ideaManagerMock.Setup(mock => mock.DeleteIdeaWithTitle(ideaId));

            requestHandler.DeleteIdea(spaceId, ideaId);

            ideaManagerMock.Verify(mock => mock.DeleteIdeaWithTitle(ideaId));
        }
    }
}
