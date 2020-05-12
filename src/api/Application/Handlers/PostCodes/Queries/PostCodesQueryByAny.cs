using Application.Interfaces;
using Application.Models;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Handlers.PostCodes.Queries
{
    public class PostCodesQueryByAny
    {
        public class Query : IRequest<List<PostCodeDto>>
        {
            public string SearchQuery { get; set; }
        }

        public class Handler : IRequestHandler<Query, List<PostCodeDto>>
        {
            private readonly IPostCodesRepository _postCodesRepository;

            public Handler(IPostCodesRepository postCodesRepository)
            {
                _postCodesRepository = postCodesRepository;
            }

            public async Task<List<PostCodeDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _postCodesRepository.FindPostCodesByAny(request.SearchQuery);
            }
        }
    }
}
