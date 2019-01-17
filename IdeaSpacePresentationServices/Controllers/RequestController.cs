using IdeaSpace.Models;
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

        [Route("createSpace/")]
        [HttpPost]
        public ActionResult CreateSpace([FromBody] Space space)
        {
            requestHandler.CreateNewSpace(space);

            return Ok();
        }

        [Route("createIdea/{spaceId}")]
        [HttpPost]
        public ActionResult CreateIdeaInSpace([FromRoute]string spaceId, [FromBody] Idea ideaData)
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
