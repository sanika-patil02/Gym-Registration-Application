using System.Reflection;

namespace GymRegistrationAPI.Models
{
  public class User
  {

    public int gymRegisteredUser_pk { get; set; }
    public string firstName {  get; set; }
    public string lastName { get; set; }
    public string email { get; set; }
    public string mobile { get; set; }
    public string weight { get; set; }
    public string height { get; set; }
    public string bmi { get; set; }
    public string bmiResult { get; set; }
    public string gender { get; set; }
    public string requireTrainer { get; set; }
    public string package { get; set; }
    public string important { get; set; }
    public string haveGymbefore { get; set; }
    public string enquiryDate { get; set; }

  }
}
