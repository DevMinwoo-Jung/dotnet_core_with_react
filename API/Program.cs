using API.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container. 

// Note - dependency injection container


// Note - controller�� ���õ� ��
// Q - Controller�� �ϳ��� �ƴ��װ�, ���� ���� �����ٵ� �װ� ��� �Ǵ� �ǰ�
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle

// Note - �ؿ� �ΰ��� swagger�� ���� �� ��
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<StoreContext>(opt =>
{
    opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


app.UseCors(opt =>
{
    opt.AllowAnyHeader().AllowAnyMethod().AllowCredentials().WithOrigins("http://localhost:3000");
});

// http�� �͵� https�� �����°ǵ� �Ⱦ�����, ���߿��� ����ҵ�
// app.UseHttpsRedirection();


app.UseAuthorization();

app.MapControllers();

var scope = app.Services.CreateScope();
var context = scope.ServiceProvider.GetRequiredService<StoreContext>();
var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();

try 
{
    context.Database.Migrate();
    DbInitializer.Initialze(context);
} 
catch (Exception ex)
{
    logger.LogError(ex, "A problem occurred during migration");
}
app.Run();
