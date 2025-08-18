**🎬 Movie Download Project**

A web application for downloading movies. This project allows admins to upload movie details (title, categories, quality, audio, cast/crew, screenshots, and download links), while users can view and download movies.


**🛠️ Prerequisites**

Before running the project, make sure you have:

* .NET 8 SDK installed

* SQL Server (2019 or later)

* SQL Server Management Studio (SSMS) to manage the database

* Visual Studio 2022 or later
  

**1.⚙️ Setup Instructions**

Clone the repository

* git clone https://github.com/your-username/movieshub.git
* cd movieshub

**2. Database Setup**

Open SSMS

Create a new database (e.g., MoviesHubDB)

**3. Apply Migrations**

In the project root, run:

dotnet ef database update**

**4. Run the Application**

dotnet run

The app will start on https://localhost:5001 (or the port shown in your console).


👤 Setting Up an Admin User

You must have at least one Admin user to manage movies.

**Option 1: Insert directly into the database using SSMS:**

``` INSERT INTO Users (Username, Email, PasswordHash, Role) VALUES ('admin', 'admin@movieshub.com', '<hashed-password>', 'Admin'); ```


**Option 2: Use Swagger UI → POST /api/users → set Role = Admin.**


**✅ Usage**

Admins can add/manage movies

Users can view and download movies

Access APIs via Swagger for testing

**📌 Notes**

* Make sure the database connection string in appsettings.json is correct.

* Use SSMS to verify tables and users after migration.
