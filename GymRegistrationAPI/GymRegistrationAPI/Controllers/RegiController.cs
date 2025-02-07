using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;
using System.Data;
using GymRegistrationAPI.Models;

namespace GymRegistrationAPI.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class RegiController : ControllerBase
  {
    private readonly IConfiguration _configuration;
    private readonly IWebHostEnvironment _env;

    public RegiController(IConfiguration configuration, IWebHostEnvironment env)
    {
      _configuration = configuration;
      _env = env;
    }

    [Route("addstream")]
    [HttpPost]
    public JsonResult Post([FromBody] Test gr)
    {
      string query = @"
insert into dbo.gymRegisteredUser  (firstName,lastName,email,mobile,weight,height,bmi,bmiResult,gender,requireTrainer,package,haveGymbefore,enquiryDate)
values(
'" + gr.firstName + @"',
          
              '" + gr.lastName + @"',
              '" + gr.email + @"',
              '" + gr.mobile + @"',
              '" + gr.weight + @"',
              '" + gr.height + @"',
              '" + gr.bmi + @"',
              '" + gr.bmiResult + @"',
              '" + gr.gender + @"',
              '" + gr.requireTrainer + @"',
              '" + gr.package + @"',
             
              '" + gr.haveGymbefore + @"',
              '" + gr.enquiryDate + @"'
              
) ";
      DataTable table = new DataTable();
      string sqlDataSource = _configuration.GetConnectionString("GymRegistrationCon");
      SqlDataReader myReader;
      using (SqlConnection myCon = new SqlConnection(sqlDataSource))
      {
        myCon.Open();
        using (SqlCommand myCommand = new SqlCommand(query, myCon))
        {
          myReader = myCommand.ExecuteReader();
          table.Load(myReader);
          myReader.Close();
          myCon.Close();
        }
      }
      return new JsonResult("added successfully");

    }

  }
}
