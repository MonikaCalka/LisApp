using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(LisApp.Startup))]
namespace LisApp
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
