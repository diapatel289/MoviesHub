using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MoviesHub.Migrations
{
    /// <inheritdoc />
    public partial class imageandscimage2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "audios",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Language = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_audios", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "categories",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_categories", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "downloadLinks",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    MovieId = table.Column<int>(type: "int", nullable: false),
                    Url = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Label = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_downloadLinks", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "quality",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    QualityName = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_quality", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "screenshots",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    MovieId = table.Column<int>(type: "int", nullable: false),
                    ImageType = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ScImage = table.Column<byte[]>(type: "varbinary(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_screenshots", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "users",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FullName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PasswordHash = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Role = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "YearMovies",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Year = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_YearMovies", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "movie",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Image = table.Column<byte[]>(type: "varbinary(max)", nullable: false),
                    Summary = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Format = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Tagline = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IMDbRating = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Runtime = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    OriginalLanguage = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Genres = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DownLoadLink = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DownloadLinkId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_movie", x => x.Id);
                    table.ForeignKey(
                        name: "FK_movie_downloadLinks_DownloadLinkId",
                        column: x => x.DownloadLinkId,
                        principalTable: "downloadLinks",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "AudioMovie",
                columns: table => new
                {
                    AudiosId = table.Column<int>(type: "int", nullable: false),
                    MoviesId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AudioMovie", x => new { x.AudiosId, x.MoviesId });
                    table.ForeignKey(
                        name: "FK_AudioMovie_audios_AudiosId",
                        column: x => x.AudiosId,
                        principalTable: "audios",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AudioMovie_movie_MoviesId",
                        column: x => x.MoviesId,
                        principalTable: "movie",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "castCrew",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    MovieId = table.Column<int>(type: "int", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Role = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_castCrew", x => x.Id);
                    table.ForeignKey(
                        name: "FK_castCrew_movie_MovieId",
                        column: x => x.MovieId,
                        principalTable: "movie",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CategoryMovie",
                columns: table => new
                {
                    CategoriesId = table.Column<int>(type: "int", nullable: false),
                    MoviesId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CategoryMovie", x => new { x.CategoriesId, x.MoviesId });
                    table.ForeignKey(
                        name: "FK_CategoryMovie_categories_CategoriesId",
                        column: x => x.CategoriesId,
                        principalTable: "categories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CategoryMovie_movie_MoviesId",
                        column: x => x.MoviesId,
                        principalTable: "movie",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "MovieQuality",
                columns: table => new
                {
                    MoviesId = table.Column<int>(type: "int", nullable: false),
                    QualitiesId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MovieQuality", x => new { x.MoviesId, x.QualitiesId });
                    table.ForeignKey(
                        name: "FK_MovieQuality_movie_MoviesId",
                        column: x => x.MoviesId,
                        principalTable: "movie",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_MovieQuality_quality_QualitiesId",
                        column: x => x.QualitiesId,
                        principalTable: "quality",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "MovieScreenshot",
                columns: table => new
                {
                    MoviesId = table.Column<int>(type: "int", nullable: false),
                    screenshotsId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MovieScreenshot", x => new { x.MoviesId, x.screenshotsId });
                    table.ForeignKey(
                        name: "FK_MovieScreenshot_movie_MoviesId",
                        column: x => x.MoviesId,
                        principalTable: "movie",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_MovieScreenshot_screenshots_screenshotsId",
                        column: x => x.screenshotsId,
                        principalTable: "screenshots",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "MovieYearMovie",
                columns: table => new
                {
                    MoviesId = table.Column<int>(type: "int", nullable: false),
                    YearId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MovieYearMovie", x => new { x.MoviesId, x.YearId });
                    table.ForeignKey(
                        name: "FK_MovieYearMovie_YearMovies_YearId",
                        column: x => x.YearId,
                        principalTable: "YearMovies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_MovieYearMovie_movie_MoviesId",
                        column: x => x.MoviesId,
                        principalTable: "movie",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AudioMovie_MoviesId",
                table: "AudioMovie",
                column: "MoviesId");

            migrationBuilder.CreateIndex(
                name: "IX_castCrew_MovieId",
                table: "castCrew",
                column: "MovieId");

            migrationBuilder.CreateIndex(
                name: "IX_CategoryMovie_MoviesId",
                table: "CategoryMovie",
                column: "MoviesId");

            migrationBuilder.CreateIndex(
                name: "IX_movie_DownloadLinkId",
                table: "movie",
                column: "DownloadLinkId");

            migrationBuilder.CreateIndex(
                name: "IX_MovieQuality_QualitiesId",
                table: "MovieQuality",
                column: "QualitiesId");

            migrationBuilder.CreateIndex(
                name: "IX_MovieScreenshot_screenshotsId",
                table: "MovieScreenshot",
                column: "screenshotsId");

            migrationBuilder.CreateIndex(
                name: "IX_MovieYearMovie_YearId",
                table: "MovieYearMovie",
                column: "YearId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AudioMovie");

            migrationBuilder.DropTable(
                name: "castCrew");

            migrationBuilder.DropTable(
                name: "CategoryMovie");

            migrationBuilder.DropTable(
                name: "MovieQuality");

            migrationBuilder.DropTable(
                name: "MovieScreenshot");

            migrationBuilder.DropTable(
                name: "MovieYearMovie");

            migrationBuilder.DropTable(
                name: "users");

            migrationBuilder.DropTable(
                name: "audios");

            migrationBuilder.DropTable(
                name: "categories");

            migrationBuilder.DropTable(
                name: "quality");

            migrationBuilder.DropTable(
                name: "screenshots");

            migrationBuilder.DropTable(
                name: "YearMovies");

            migrationBuilder.DropTable(
                name: "movie");

            migrationBuilder.DropTable(
                name: "downloadLinks");
        }
    }
}
