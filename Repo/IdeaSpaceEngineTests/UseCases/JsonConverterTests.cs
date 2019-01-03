using IdeaSpaceEngine.UseCases;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace IdeaSpaceEngineTests.UseCases
{
    [TestClass]
    public class JsonConverterTests
    {
        private JsonConverter jsonConverter;

        [TestInitialize]
        public void SetUp()
        {
            jsonConverter = JsonConverter.Instance();
        }

        [TestMethod]
        public void TestThatConverterCanBeCalledFromASingleInstance()
        {
            var newJsonConverter = JsonConverter.Instance();

            Assert.AreEqual(jsonConverter, newJsonConverter);
        }

        
    }
}
