// /graphql/queries/headerQuery.ts

export const MOVIE_QUERY = `
{
  item(path: "/sitecore/content/HeadLessSites/movieshub/Data/Amovieshub/Movies", language: "en") {
    ... on Movies {
      id
      name
      displayName

      moviesTitle {
        value
      }
      gridNumber {
        value
      }
      direction {
        value
      }
      
    }
  }
}
`;
