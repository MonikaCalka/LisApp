using LisApp.Enums;

namespace LisApp.Models
{
    public class DictionaryModel
    {
        public long value { get; set; }

        public string label { get; set; }
  
        public DictionaryTypesEnum Type { get; set; }
    }
}