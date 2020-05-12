using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Models.Images
{
    public class AddFileResponse
    {
        public IList<string> PreSignedUrl { get; set; }
    }
}
