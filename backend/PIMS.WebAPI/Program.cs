using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using PIMS.WebAPI.Data;
using PIMS.WebAPI.Mapping;
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<PIMSWebAPIContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("PIMSWebAPIContext") ?? throw new InvalidOperationException("Connection string 'PIMSWebAPIContext' not found.")));


builder.Services.AddAutoMapper(typeof(AutoMapperProfiles));
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", builder =>
    {
        builder.WithOrigins("http://localhost:7001")
               .AllowAnyHeader()
               .AllowAnyMethod();
    });
});



var app = builder.Build();
app.UseCors("AllowFrontend");

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
