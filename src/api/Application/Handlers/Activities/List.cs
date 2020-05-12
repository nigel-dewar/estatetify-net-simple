using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Handlers.Properties;
using Application.Models;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Persistence;

namespace Application.Handlers.Activities
{
    public class ListActivity
    {
        public class Query : IRequest<List<ActivityDto>> {
        }

        public class Handler : IRequestHandler<Query, List<ActivityDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            private readonly ILogger<List> _logger;

            public Handler(DataContext context, IMapper mapper, ILogger<List> logger)
            {
                _context = context;
                _mapper = mapper;
                _logger = logger;
            }

            public async Task<List<ActivityDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                
                try
                {
                    // for (int i = 0; i < 10; i++)
                    // {
                    //     cancellationToken.ThrowIfCancellationRequested();
                    //     await Task.Delay(1000, cancellationToken);
                    //     _logger.LogInformation($"Task {i} has completed");
                    // }

                }
                catch (Exception e) when (e is TaskCanceledException)
                {
                    _logger.LogInformation("Task was cancelled");
                }

                try
                {
                    var items = await _context.Activities
                        .ToListAsync();
                
                    // return items;
                    return _mapper.Map<List<Activity>, List<ActivityDto>>(items);
                }
                catch (Exception e)
                {
                    Console.WriteLine(e);
                    throw new Exception("Something went wrong");
                }
                
                

            }
        }
    }
}