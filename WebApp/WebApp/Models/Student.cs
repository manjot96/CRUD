using System;
using System.Collections.Generic;

namespace WebApp.Models
{
    public partial class Student
    {
        public int StudentId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime CreatedAt { get; set; }
        public byte[] VersionCol { get; set; }
    }
}
