using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Data;
using System.Data.SqlClient;
using GymRegistrationAPI.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Routing;
namespace GymRegistrationAPI.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class RegistrationController : ControllerBase
  {

    private readonly IConfiguration _configuration;
    private readonly IWebHostEnvironment _env;

    public RegistrationController(IConfiguration configuration, IWebHostEnvironment env)
    {
      _configuration = configuration;
      _env = env;
    }
   
    [HttpGet]

    public JsonResult Get()
    {
      string query = @"
select * from dbo.gymRegisteredUser";

      DataTable table = new DataTable();
      string sqlDataSource = _configuration.GetConnectionString("GymRegistrationCon");

      SqlDataReader myReader;

      using (SqlConnection myCon = new SqlConnection(sqlDataSource)) {
        myCon.Open();
        using (SqlCommand myCommand = new SqlCommand(query, myCon)) {
          myReader = myCommand.ExecuteReader();
          table.Load(myReader);
          myReader.Close();
          myCon.Close();
        }
      }
      return new JsonResult(table);
    }

   [Route("PostGym")]
    [HttpPost]
    public JsonResult Post([FromBody] User gr) {

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
      return new JsonResult("Added Successfully");

    }

    [Route("Updatedetails/{gymRegisteredUser_pk}")]

    [HttpPut]

    public JsonResult Put(User gr)
    {

      string query = @"
update  dbo.gymRegisteredUser  set
              firstName='" + gr.firstName + @"',
              lastName='" + gr.lastName + @"',
              email='"+gr.email+@"',
              mobile='" + gr.mobile + @"',
              weight='" + gr.weight + @"',
              height='" + gr.height + @"',
              bmi='" + gr.bmi + @"',
               bmiResult='" + gr.bmiResult + @"',
            gender='" + gr.gender + @"',
              requireTrainer='" + gr.requireTrainer + @"',
              package='" + gr.package + @"',
              haveGymbefore='" + gr.haveGymbefore + @"',
      
              enquiryDate='" + gr.enquiryDate + @"'
               where gymRegisteredUser_pk='" + gr.gymRegisteredUser_pk + @"'
";

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
      return new JsonResult("Updated Successfully");

    }


    [HttpDelete("{gymRegisteredUser_pk}")]

    public JsonResult Delete(int gymRegisteredUser_pk)
    {

      string query = @"
delete  dbo.gymRegisteredUser  
          where gymRegisteredUser_pk='" + gymRegisteredUser_pk + @"'

";

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
      return new JsonResult("Deleted Successfully");

    }




    [HttpGet("UserDetails/{gymRegisteredUser_pk}")]

    public JsonResult Get(int gymRegisteredUser_pk)
    {

      string query = @"
select * from dbo.gymRegisteredUser  
          where gymRegisteredUser_pk='" + gymRegisteredUser_pk + @"'

";

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
      return new JsonResult(table);

    }
  }
}
