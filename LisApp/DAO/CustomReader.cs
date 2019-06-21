using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace LisApp.DAO
{
    public class CustomReader
    {
        private SqlDataReader reader;
        private Dictionary<string, int> columnNames;

        public CustomReader(SqlDataReader reader, Dictionary<string, int> columnNames)
        {
            this.reader = reader;
            this.columnNames = columnNames;
        }

        public bool Read()
        {
            return reader.Read();
        }

        public string GetString(string field)
        {
            return reader.GetString(columnNames[field]);
        }

        public string GetNullableString(string field)
        {
            if (reader.IsDBNull(columnNames[field]))
                return null;
            else
                return reader.GetString(columnNames[field]);
        }

        public long GetLong(string field)
        {
            return reader.GetInt64(columnNames[field]);
        }

        public long? GetNullableLong(string field)
        {
            if (reader.IsDBNull(columnNames[field]))
                return null;
            else
                return reader.GetInt64(columnNames[field]);
        }

        public DateTime GetDate(string field)
        {
            return reader.GetDateTime(columnNames[field]);
        }

        public DateTime? GetNullableDate(string field)
        {
            if (reader.IsDBNull(columnNames[field]))
                return null;
            else
                return reader.GetDateTime(columnNames[field]);
        }

        public bool GetBool(string field)
        {
            return reader.GetBoolean(columnNames[field]);
        }

        public bool? GetNullableBool(string field)
        {
            if (reader.IsDBNull(columnNames[field]))
                return null;
            else
                return reader.GetBoolean(columnNames[field]);
        }

        public double GetDouble(string field)
        {
            return reader.GetDouble(columnNames[field]);
        }

        public double? GetNullableDouble(string field)
        {
            if (reader.IsDBNull(columnNames[field]))
                return null;
            else
                return reader.GetDouble(columnNames[field]);
        }
    }
}