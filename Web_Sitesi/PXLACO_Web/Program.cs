var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

// Statik dosyaların (HTML, CSS, JS, Resim) çalışması için ŞART
app.UseStaticFiles();

app.MapGet("/", async context =>
{
    await context.Response.SendFileAsync("wwwroot/index.html");
});

app.Run();