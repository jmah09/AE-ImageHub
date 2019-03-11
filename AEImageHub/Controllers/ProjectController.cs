﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AEImageHub.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace AEImageHub.Controllers
{
    [Authorize]
    [Route("api/project")]
    public class ProjectController : ControllerBase
    {
        private readonly ihubDBContext _context;

        public ProjectController(ihubDBContext context)
        {
            _context = context;
        }

        /*
        GET
        API Endpoint: api/project/
        Description: Retrieves projects
        Request Requirements:
        1. User JWT in header field

        Server response and status code:
        200 - Project retrieve was successful server should return project list
        401 - the JWT attached to the header is invalid or expired(should redirect to login)
        */
        [HttpGet("")]
        public Object GetProjects()
        {
            return JsonConvert.SerializeObject(_context.Project);
        }

        /*
        GET
        API Endpoint: api/project/:project_id
        Description: Retrieves project
        Request Requirements:
        1. User JWT in header field

        Server response and status code:
        200 - Project retrieve was successful server should return project data
        401 - the JWT attached to the header is invalid or expired(should redirect to login)
        403 - user not authorized to view project
        */
        [HttpGet("{projectname}")]
        public Object GetProject(string projectname)
        {
            return JsonConvert.SerializeObject(_context.Project.Where(p => p.ProjectName == projectname).First());
        }

        /*
        POST
        API Endpoint: api/project
        Description: Creates project(Admin only)
        Request Requirements:
        1. User JWT in header field
        2. Project credentials

        Server response and status code:
        201 - Project creation was successful
        401 - the JWT attached to the header is invalid or expired(should redirect to login)
        403 - user not authorized to create project
        */
        [HttpPost("")]
        public void PostProject([FromBody] JObject payload)
        {
            Project project = new Project()
            {
                ProjectName = (string)payload["ProjectName"],
                CreatedDate = (DateTime)payload["CreatedDate"],
                Description = (string)payload["Description"]
            };

            _context.Project.Add(project);
            _context.SaveChanges();
        }

        /*
        DELETE
        API Endpoint: api/project/:project_id
        Description: Deletes project
        Request Requirements:
        1. User JWT in header field

        Server response and status code:
        200 - Project deletion was successful 
        401 - the JWT attached to the header is invalid or expired(should redirect to login)
        403 - user not authorized to delete project
        */
        [HttpDelete("{projectname}")]
        public void DeleteProject(string projectname)
        {
            Project project = (Project)_context.Project.Where(p => p.ProjectName == projectname).First();
            _context.Remove(project);
            _context.SaveChanges();
        }

        /*
        PUT
        API Endpoint: api/project/:project_id
        Description: Modifies user profile
        Request Requirements:
        1. User JWT in header field

        Server response and status code:
        200 - Project modification was successful 
        401 - the JWT attached to the header is invalid or expired(should redirect to login)
        403 - user not authorized to modify project
        */
        [HttpPut("{projectname}")]
        public void PutProject(string projectname, [FromBody] JObject payload)
        {
            Project project = (Project)_context.Project.Where(p => p.ProjectName == projectname).First();
            if (payload["ProjectName"].Type != JTokenType.Null) { project.ProjectName = (string)payload["ProjectName"]; };
            if (payload["CreatedDate"].Type != JTokenType.Null) { project.CreatedDate = (DateTime)payload["CreatedDate"]; };
            if (payload["Description"].Type != JTokenType.Null) { project.Description = (string)payload["Description"]; };
            _context.SaveChanges();
        }
    }
}