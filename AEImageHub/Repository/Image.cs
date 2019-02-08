﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Text;
using AEImageHub.DI.SQLServerConnection;
using System.Data.SqlClient;
using System.Diagnostics;

namespace AEImageHub.Repository
{
    public class Image
    {

        public void GetData()
        {
            using (SqlConnection connection = new SqlConnection(SQLConnection.getConnectionString()))
            {
                Console.WriteLine("\nQuery data example:");
                Console.WriteLine("=========================================\n");
                Console.WriteLine("Image_id/user_id/image_name/size");
                connection.Open();
                StringBuilder sb = new StringBuilder();
                sb.Append("SELECT *");
                sb.Append("FROM [Image]");
                String sql = sb.ToString();
                using (SqlCommand command = new SqlCommand(sql, connection))
                {
                    using (SqlDataReader reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            Console.WriteLine("{0}, {1}, {2}, {3}", reader[0], reader[1], reader[2], reader[3]);
                        }
                    }
                }
                connection.Close();
            }
        }

    }
}
