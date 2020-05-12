
using Domain;
using Domain.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
  public class DataContext : IdentityDbContext<AppUser>
  {

        public DataContext(DbContextOptions<DataContext> options) : base(options)
    { }

        public DbSet<Feature> Features { get; set; }

        public DbSet<PropertyFeature> PropertyFeatures { get; set; }

        public DbSet<PropertyType> PropertyTypes { get; set; }

        public DbSet<Property> Properties { get; set; }

        public DbSet<PostCode> PostCodes { get; set; }

        public DbSet<Image> Images { get; set; }

        public DbSet<Listing> Listings { get; set; }

        public DbSet<Agency> Agencies { get; set; }

        public DbSet<AgencyCompany> AgencyCompanies { get; set; }

        public DbSet<Agent> Agents { get; set; }

        public DbSet<UserType> UserTypes { get; set; }

        public DbSet<UserProperty> UserProperties { get; set; }
        
        public DbSet<UserActivity> UserActivities { get; set; }

        public DbSet<Activity> Activities { get; set; }
        
        public DbSet<Comment> Comments { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
      base.OnModelCreating(modelBuilder);

            // Customize the ASP.NET Identity model and override the defaults if needed.
            // For example, you can rename the ASP.NET Identity table names and more.
            // Add your customizations after calling base.OnModelCreating(builder);
            //quick and dirty takes care of my entities not all scenarios
            foreach (var entity in modelBuilder.Model.GetEntityTypes())
            {
                // var currentTableName = modelBuilder.Entity(entity.Name).Metadata.Relational().TableName;
                // modelBuilder.Entity(entity.Name).ToTable(currentTableName.ToLower());

            }

            modelBuilder.Entity<Property>()
              .HasIndex(b => b.Slug)
              .IsUnique();

            modelBuilder.Entity<PropertyFeature>()
              .HasKey(x => new { x.PropertyId, x.FeatureId });


            modelBuilder.Entity<Listing>()
              .HasOne(x => x.Property)
              .WithMany(c => c.Listings)
              .OnDelete(DeleteBehavior.SetNull);

            modelBuilder.Entity<Listing>()
               .HasOne(x => x.Agency)
              .WithMany(c => c.Listings)
              .IsRequired(false)
              .OnDelete(DeleteBehavior.SetNull);

            modelBuilder.Entity<Listing>()
               .HasOne(x => x.Agent)
              .WithMany(c => c.Listings)
              .IsRequired(false)
              .OnDelete(DeleteBehavior.SetNull);



            modelBuilder.Entity<UserProperty>(x => x.HasKey(up => new { up.AppUserId, up.PropertyId }));

            modelBuilder.Entity<UserProperty>()
                .HasOne(u => u.AppUser)
                .WithMany(p => p.UserProperties)
                .HasForeignKey(a => a.AppUserId);

            modelBuilder.Entity<UserProperty>()
                .HasOne(p => p.Property)
                .WithMany(up => up.UserProperties)
                .HasForeignKey(a => a.PropertyId);
            
            modelBuilder.Entity<UserActivity>(x => x.HasKey(up => new { up.AppUserId, up.ActivityId }));
            
            modelBuilder.Entity<UserActivity>()
                .HasOne(u => u.AppUser)
                .WithMany(p => p.UserActivities)
                .HasForeignKey(a => a.AppUserId);

            modelBuilder.Entity<UserActivity>()
                .HasOne(p => p.Activity)
                .WithMany(up => up.UserActivities)
                .HasForeignKey(a => a.ActivityId);

            modelBuilder.Entity<UserPermission>(x => x.HasKey(up => new { up.AppUserId, up.PropertyId }));

            modelBuilder.Entity<UserPermission>()
                .HasOne(u => u.AppUser)
                .WithMany(p => p.UserPermissions)
                .HasForeignKey(a => a.AppUserId);

            modelBuilder.Entity<UserPermission>()
                .HasOne(p => p.Property)
                .WithMany(up => up.UserPermissions)
                .HasForeignKey(a => a.PropertyId);

        }
    }
}