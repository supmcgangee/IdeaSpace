using System;
using System.Collections.Generic;
using System.Text;

namespace IdeaSpaceEngine.UseCases
{
    public class JsonConverter
    {
        private static JsonConverter currentInstance;

        public static JsonConverter Instance()
        {
            if (currentInstance == null)
            {
                currentInstance = new JsonConverter();
            }

            return currentInstance;
        }
    }
}
