using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace WebAPI;


    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // Add framework services.
            services.AddMvc(); // or AddControllers() for API projects
            // services.AddControllers();
            // services.AddCors();
            
            // Add other services here (e.g., Entity Framework, authentication, etc.).
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                // app.UseSwagger();
                // app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "YourApiName v1"));
            }
            // else
            // {
            //     app.UseExceptionHandler("/Home/Error");
            //     app.UseHsts();
            // }

            // Add middleware and configure the request pipeline.
            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseRouting();
            // app.UseCors(x => x
            // .AllowAnyOrigin()
            // .AllowAnyMethod()
            // .AllowAnyHeader());

        // app.UseHttpsRedirection(); 


           app.UseCors(m=>m.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());
            

            // app.UseCors(m=>m.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers(); // or MapDefaultControllerRoute() for MVC projects
            });

           

        }
    }

