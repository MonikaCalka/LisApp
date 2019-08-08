using System.Collections.Specialized;
using System.Linq;
using System.Net.Http;
using System.Web;

namespace LisApp.Common
{
    public static class Language
    {
        public static string getLang(HttpRequestBase re)
        {
            NameValueCollection headers = re.Headers;

            string[] allKeys = headers.AllKeys;
            foreach (string key in allKeys)
            {
                if (key.Equals("Lang"))
                {
                    string[] values = headers.GetValues(key);
                    return values[0];
                }
            }
            return null;
        }
    }
}