using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MoviesHub.Migrations
{
    /// <inheritdoc />
    public partial class MigrationofOTT : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Ott",
                table: "movie",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Ott",
                table: "movie");
        }
    }
}
