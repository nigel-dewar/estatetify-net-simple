using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MimeKit;
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Options;
using Api.Config;

namespace Api.Controllers
{
    // Just use action name as route
    [Route("[action]")]
    public class GenerateController : ControllerBase
    {
        public string MAIL_HOST;
        public int MAIL_PORT;

        public GenerateController(IOptions<MailServerConfig> mailServerConfigAccessor)
        {
            var config = mailServerConfigAccessor.Value;
            MAIL_HOST = config.Host;
            MAIL_PORT = config.Port;
        }

        [HttpPost]
        public async Task EmailRandomNames(string email = "test@fake.com")
        {
            var message = new MimeMessage();
            message.From.Add(new MailboxAddress("Generator", "generator@generate.com"));
            message.To.Add(new MailboxAddress("", email));
            message.Subject = "Here are your random names!";

            message.Body = new TextPart("plain")
            {
                Text = "Nigel Dewar"
            };
            using (var mailClient = new SmtpClient())
            {
                await mailClient.ConnectAsync(MAIL_HOST, MAIL_PORT, SecureSocketOptions.None);
                await mailClient.SendAsync(message);
                await mailClient.DisconnectAsync(true);
            }
        }

       
    }
}
