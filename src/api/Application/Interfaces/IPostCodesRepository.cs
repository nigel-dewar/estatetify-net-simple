using Application.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces
{
    public interface IPostCodesRepository
    {
        Task<List<PostCodeDto>> FindPostCodesByAny(string q);
        Task<List<PostCodeDto>> FindPostCodesBySlug(string q);
    }
}
