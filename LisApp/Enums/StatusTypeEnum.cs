using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace LisApp.Enums
{
    public enum StatusTypeEnum
    {
        Ordered = 1,
        ReOrdered = 2,
        InProgress = 3,
        ToVerify = 4,
        Verified = 5,
        Ended = 6,
        TakenSample = 7
    }
}