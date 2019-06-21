using LisApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LisApp.IDAO
{
    public interface ISamplesDAO
    {
        List<SampleModel> ReadSamplesList();
        SampleModel ReadSampleById(long id);
        SampleModel ReadSampleByStudyId(long id);
    }
}
