using LisApp.Enums;

namespace LisApp.Models
{
    public class DictionaryModel
    {
        public long Id { get; set; }

        public string Name { get; set; }

        public DictionaryTypesEnum Type { get; set; }
    }
}