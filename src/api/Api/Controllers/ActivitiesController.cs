using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Handlers.Activities;
using Application.Models;
using Domain;
using Microsoft.AspNetCore.Mvc;
using MediatR;
using Microsoft.AspNetCore.Authorization;

namespace Api.Controllers
{
    [AllowAnonymous]
    public class ActivitiesController : BaseController
    {
        [HttpGet]
        public async Task<ActionResult<List<ActivityDto>>> List(CancellationToken ct)
        {
            return await Mediator.Send(new ListActivity.Query(), ct);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ActivityDto>> Details(Guid id)
        {
            return await Mediator.Send(new DetailsActivity.Query {Id = id});
        }
        
        [HttpPost]
        public async Task<ActionResult<Unit>> Create(CreateActivity.Command command)
        {
            return await Mediator.Send(command);
        }
        
        [HttpPut("{id}")]
        public async Task<ActionResult<Unit>> Edit(Guid id, Edit.Command command)
        {
            try
            {
                command.Id = id;
                var result = await Mediator.Send(command);
                return Ok(result);
            }
            catch (Exception ex)
            {

                return BadRequest(ex);
            }
            
        }
        
        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> Delete(Guid id)
        {
            return await Mediator.Send(new Delete.Command{ Id = id});
        }
        
        [HttpPost("{id}/attend")]
        public async Task<ActionResult<Unit>> Attend(Guid id)
        {
            return await Mediator.Send(new Attend.Command {Id = id});
        }
        
        [HttpDelete("{id}/attend")]
        public async Task<ActionResult<Unit>> UnAttend(Guid id)
        {
            return await Mediator.Send(new UnAttend.Command {Id = id});
        }

    }
}