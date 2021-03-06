﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace LisApp.Models
{
    public class UserModel
    {
        public long? IdUser { get; set; }

        public long? IdEmployee { get; set; }

        public EmployeeModel Employee { get; set; }

        public string Login { get; set; }

        public string Password { get; set; }

        public DateTime DateOfChange { get; set; }

        public bool InUse { get; set; }

        public long? IdPatient { get; set; }

        public UserModel() { }

        public UserModel(long? idEmployee, string login, string password, long? idPatient) {
            this.IdEmployee = idEmployee;
            this.Login = login;
            this.Password = password;
            this.IdPatient = idPatient;
        }
    }
}