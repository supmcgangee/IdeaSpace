using System;
using System.Collections.Generic;
using System.Text;

namespace IdeaSpaceEngine.Models
{
    public class Space
    {
        public string name { get; set; }
        public Dictionary<Guid, Idea> Ideas { get; set; }
    }
}
