using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace LisApp.DAO
{
    public static class BaseDAO
    {
        private static string cnnString = @"Server=DESKTOP-1GSDLH6\SQLSERVER;Database=LaboratoryDB;Trusted_Connection=True;";

        public static List<T> Select<T>(string query, Func<CustomReader, T> readFunc)
        {
            using (SqlConnection conn = new SqlConnection(cnnString))
            {
                using (SqlCommand command = new SqlCommand(query, conn))
                {
                    conn.Open();
                    SqlDataReader reader = command.ExecuteReader();
                    Dictionary<string, int> columnNames = new Dictionary<string, int>();

                    for (int i = 0; i < reader.FieldCount; i++)
                    {
                        columnNames.Add(reader.GetName(i), i);
                    }

                    CustomReader customReader = new CustomReader(reader, columnNames);
                    List<T> result = new List<T>();
                    while (customReader.Read())
                    {
                        result.Add(readFunc(customReader));
                    }
                    conn.Close();
                    return result;
                }
            }
        }

        public static T SelectFirst<T>(string query, Func<CustomReader, T> readFunc)
        {
            var list = Select<T>(query, readFunc);
            return list?.Count > 0 ? list[0] : default(T);
        }

        public static long? InsertOrUpdate(string query, bool getId)
        {
            long? id = null;
            using (SqlConnection conn = new SqlConnection(cnnString))
            {
                using (SqlCommand command = new SqlCommand(query, conn))
                {
                    conn.Open();
                    if (getId)
                        id = (long)command.ExecuteScalar();
                    else
                        command.ExecuteNonQuery();
                    conn.Close();
                }

            }
            return id;
        }

        public static string SetString(string value) {
            return value != null && value != "" ? "'" + value + "'" : "NULL";
        }

        public static string SetDate(DateTime? value)
        {
            if(value != null)
            {
                DateTime val = (DateTime)value;
                return "'" + val.ToString("yyyy'-'MM'-'dd HH:mm") + "'";
            } else
            {
                return "NULL";
            }
        }

        public static string SetNullableLong(long? value)
        {
            return value != null ? value.ToString() : "NULL";
        }

        public static string SetBool(bool? value)
        {
            if (value != null)
            {
                return (bool)value ? "1" : "0";
            }
            else
            {
                return "NULL";
            }
        }
    }
}