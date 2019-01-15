using IdeaSpace.Primary;
using Microsoft.AspNetCore.Mvc;

namespace IdeaSpacePresentationServices.Controllers
{
    [Route("api/[controller]")]
    public class RequestController : ControllerBase
    {
        private readonly IRequestHandler requestHandler;

        public RequestController(IRequestHandler requestHandler)
        {
            this.requestHandler = requestHandler;
        }

        [Route("createSpace/{spaceId}")]
        [HttpPost]
        public ActionResult CreateSpace([FromRoute] string spaceId)
        {
            requestHandler.CreateNewSpace(spaceId);

            return Ok();
        }

        [Route("createIdea/{spaceId}")]
        [HttpPost]
        public ActionResult CreateIdeaInSpace([FromRoute]string spaceId, [FromBody] string ideaData)
        {
            requestHandler.CreateNewIdea(spaceId, ideaData);

            return Ok();
        }

        [Route("getSpaces")]
        [HttpGet]
        public ActionResult GetAllSpaces()
        {
            return Ok(requestHandler.GetAllSpaces());
        }

        [Route("getIdeasInSpace/{spaceId}")]
        [HttpGet]
        public ActionResult GetAllIdeasInSpace([FromRoute] string spaceId)
        {
            return Ok(requestHandler.GetAllIdeas(spaceId));
        }

        [Route("deleteSpace/{spaceId}")]
        [HttpDelete]
        public ActionResult DeleteSpace([FromRoute] string spaceId)
        {
            requestHandler.DeleteSpace(spaceId);

            return Ok();
        }

        [Route("deleteIdea/{spaceId}/{ideaId}")]
        [HttpDelete]
        public ActionResult DeleteIdeaFromSpace([FromRoute] string spaceId, [FromRoute] string ideaId)
        {
            requestHandler.DeleteIdea(spaceId, ideaId);

            return Ok();
        }
    }
}
