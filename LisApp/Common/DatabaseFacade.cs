using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using LisApp.IDAO;
using LisApp.DAO;

namespace LisApp.Common
{
    public class DatabaseFacade : IDatabaseFacade
    {
        public IPatientsDAO PatientsDAO { get; private set; }

        public IDictionaryDAO DictionaryDAO { get; private set; }

        public IEmployeesDAO EmployeesDAO { get; private set; }

        public IUserDAO UserDAO { get; private set; }

        public IOrdersDAO OrderDAO { get; private set; }

        public IProfilesDAO ProfilesDAO { get; private set; }

        public IStudiesDAO StudiesDAO { get; private set; }

        public ISamplesDAO SamplesDAO { get; private set; }

        public ITestsDAO TestsDAO { get; private set; }

        public IResultUnitsDAO ResultUnitsDAO { get; private set; }

        public IVerificationsDAO VerificationsDAO { get; private set; }

        public IResultsDAO ResultsDAO { get; private set; }       

        public DatabaseFacade()
        {
            PatientsDAO = new PatientsDAO();

            DictionaryDAO = new DictionaryDAO();

            EmployeesDAO = new EmployeesDAO();

            UserDAO = new UserDAO();

            OrderDAO = new OrdersDAO();

            ProfilesDAO = new ProfilesDAO();

            StudiesDAO = new StudiesDAO();

            SamplesDAO = new SamplesDAO();

            TestsDAO = new TestsDAO();

            VerificationsDAO = new VerificationsDAO();

            ResultsDAO = new ResultsDAO();

            ResultUnitsDAO = new ResultUnitsDAO();
        }
    }
}