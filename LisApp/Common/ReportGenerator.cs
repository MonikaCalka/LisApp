using iText.IO.Font;
using iText.IO.Image;
using iText.Kernel.Font;
using iText.Kernel.Pdf;
using iText.Layout;
using iText.Layout.Element;
using iText.Layout.Properties;
using LisApp.Models;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web.Http.Results;
using System.Web.Mvc;
using System.Web;
using System.Globalization;
using System;

namespace LisApp.Common
{
    public class ReportGenerator
    {
        public byte[] createPdf(StudyModel study, string Lang)
        {
            MemoryStream stream = new MemoryStream();
            PdfWriter writer = new PdfWriter(stream);

            var pdf = new PdfDocument(writer);
            var document = new Document(pdf);
            var font = PdfFontFactory.CreateFont(FontConstants.HELVETICA, "cp1250", true);
            //var font2 = PdfFontFactory.CreateFont(FontConstants.TIMES_ROMAN);
            var bold = PdfFontFactory.CreateFont(FontConstants.HELVETICA_BOLD, "cp1250", true);

            //PdfFontFactory.
            //doc.Add(new Paragraph("Tekst do wyświetlenia", myFont));

            document.Add(new Paragraph(Lang == "pl" ? "WYNIKI BADAŃ LABORATORYJNYCH" : "LABORATORY RESULTS")
                .SetTextAlignment(TextAlignment.CENTER)
                .SetFontSize(14)
                .SetMarginBottom(20)
                .SetFont(font));
            document.SetFont(bold).Add(new Paragraph((Lang == "pl" ? "Pacjent: " : "Patient: ") + study.Patient)).SetBottomMargin(10);

            document.SetFont(font).Add(new Paragraph((Lang == "pl" ? "Id zlecenia: " : "Id order: ") + study.IdOrder));
            document.Add(new Paragraph((Lang == "pl" ? "Data zlecenia: " : "Date of order: ") + study.DateOfOrder));
            document.Add(new Paragraph((Lang == "pl" ? "Lekarz: " : "Doctor: ") + study.Doctor)).SetFont(font).SetBottomMargin(10);


            document.Add(new Paragraph((Lang == "pl" ? "Id badania: " : "Id study: ") + study.IdStudy)).SetFont(font);
            document.Add(new Paragraph((Lang == "pl" ? "Typ badania: " : "Type of study: ") + study.Profile)).SetFont(font);

            var table = new Table(new float[] { 13, 3, 3, 3, 3 });
            table.SetWidth(UnitValue.CreatePercentValue(100));
            table.AddHeaderCell(new Cell().Add(new Paragraph("Test"))).SetFont(bold);
            table.AddHeaderCell(new Cell().Add(new Paragraph((Lang == "pl" ? "Wynik: " : "Result: ")))).SetFont(bold);
            table.AddHeaderCell(new Cell().Add(new Paragraph((Lang == "pl" ? "Jednostka: " : "Unit: ")))).SetFont(bold);
            table.AddHeaderCell(new Cell().Add(new Paragraph((Lang == "pl" ? "Wskaźnik: " : "Indicator: ")))).SetFont(bold);
            table.AddHeaderCell(new Cell().Add(new Paragraph((Lang == "pl" ? "Norma: " : "Norm: ")))).SetFont(bold);


            foreach (TestModel test in study.OrderedTest)
            {
                table.AddCell(new Cell().Add(new Paragraph(test.Name))).SetFont(font);
                table.AddCell(new Cell().Add(new Paragraph(test.Result))).SetFont(font);
                table.AddCell(new Cell().Add(new Paragraph(test.Unit))).SetFont(font);

                NumberFormatInfo provider = new NumberFormatInfo();
                provider.NumberDecimalSeparator = ".";

                if (study.PatientSex == "M")
                {
                    if (Convert.ToDouble(test.Result, provider) < test.NormMinM)
                        table.AddCell(new Cell().Add(new Paragraph("(v) " + (Lang == "pl" ? "Za niski" : "Too low")))).SetFont(font).SetTextAlignment(TextAlignment.CENTER);
                    else if (Convert.ToDouble(test.Result, provider) > test.NormMaxM)
                        table.AddCell(new Cell().Add(new Paragraph("(^) " + (Lang == "pl" ? "Za wysoki" : "Too high")))).SetFont(font).SetTextAlignment(TextAlignment.CENTER);
                    else
                        table.AddCell(new Cell().Add(new Paragraph("W normie"))).SetFont(font).SetTextAlignment(TextAlignment.CENTER);
                }
                else
                {
                    if (Convert.ToDouble(test.Result, provider) < test.NormMinF)
                        table.AddCell(new Cell().Add(new Paragraph("(v) " + (Lang == "pl" ? "Za niski" : "Too low")))).SetFont(font).SetTextAlignment(TextAlignment.CENTER);
                    else if (Convert.ToDouble(test.Result, provider) > test.NormMaxF)
                        table.AddCell(new Cell().Add(new Paragraph("(^) " + (Lang == "pl" ? "Za wysoki" : "Too high")))).SetFont(font).SetTextAlignment(TextAlignment.CENTER);
                    else
                        table.AddCell(new Cell().Add(new Paragraph((Lang == "pl" ? "W normie" : "Normal")))).SetFont(font).SetTextAlignment(TextAlignment.CENTER);
                }

                if (study.PatientSex == "M")
                {
                    if (test.NormMinM == test.NormMaxM && test.NormMinM == 0)
                        table.AddCell(new Cell().Add(new Paragraph("0"))).SetFont(font);
                    else
                        table.AddCell(new Cell().Add(new Paragraph(test.NormMinM + "-" + test.NormMaxM))).SetFont(font);
                }
                else
                {
                    if (test.NormMinF == test.NormMaxF && test.NormMinF == 0)
                        table.AddCell(new Cell().Add(new Paragraph("0"))).SetFont(font);
                    else
                        table.AddCell(new Cell().Add(new Paragraph(test.NormMinF + "-" + test.NormMaxF))).SetFont(font);
                }
            }
            document.Add(table);

            document.Add(new Paragraph((Lang == "pl" ? "Opis: " : "Description: ") + study.Result.Description)).SetFont(font);
            document.Add(new Paragraph((Lang == "pl" ? "Twórca opisu: " : "Creator of the description: ") + study.Lab)).SetFont(font);


            document.Close();

            return stream.ToArray();
        }


    }
}