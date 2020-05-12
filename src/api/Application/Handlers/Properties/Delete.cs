using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using MediatR;
using Persistence;

namespace Application.Handlers.Properties
{
    public class Delete
    {
        public class Command : IRequest
        {
            public string Id { get; set; }

        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var property = await _context.Properties.FindAsync(request.Id);

                if (property == null) {
                    throw new RestException(HttpStatusCode.NotFound, new { property = "Not Found" });
                }

                _context.Remove(property);

                var success = await _context.SaveChangesAsync() > 0;
                if (success) return Unit.Value;

                throw new Exception("Problem deleteing property");
            }
        }
    }
}
