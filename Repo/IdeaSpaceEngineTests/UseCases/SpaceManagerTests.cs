using System;
using System.IO;
using IdeaSpaceEngine.Models;
using IdeaSpaceEngine.Primary;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace IdeaSpaceEngineTests.Primary
{
    [TestClass]
    public class SpaceManagerTests
    {
        private SpaceManager spaceManager;
        private const string rootDir = @"C:\Users\ukbdav\Documents\Projects\IdeaSpace\Repo\TestStorage\";
        private const string knownId = "TestSpace";
        private const string ext = ".txt";

        [TestInitialize]
        public void SetUp()
        {
            spaceManager = new SpaceManager();
        }

        [TestMethod]
        public void CanCreateASpaceAndNewSpaceIsAddedToSpacesList()
        {
            spaceManager.CreateSpace(knownId);

            Assert.IsNotNull(spaceManager.SpacesList.Count == 1);
        }

        [TestMethod]
        public void FindMethodIsAbleToReturnASpace()
        {
            spaceManager.CreateSpace(knownId);

            Assert.IsNotNull(spaceManager.FindSpaceWithId(knownId));
        }

        [TestMethod]
        public void CheckIfNewSpaceHasBeenWrittenToFile()
        {
            spaceManager.CreateSpace(knownId);

            Assert.IsTrue(Directory.Exists(rootDir + knownId), "File Directory Not Found");
            Assert.IsTrue(File.Exists(rootDir + knownId + @"\SpaceDat" + ext), "Associated Space Directory File Not Found");
        }
    }
}
