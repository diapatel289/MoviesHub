// /graphql/queries/headerQuery.ts

export const HEADER_QUERY = `
{
  item(path: "/sitecore/content/HeadLessSites/movieshub/Data/Amovieshub/Header", language: "en") {
    ... on MoviesHeader {
      id
      name
      displayName

      logo {
        src
        alt
      }

      home {
        value
      }
      about {
        value
      }
      category {
        value
      }
      year {
        value
      }
      addMovie {
        value
      }

      homeLink {
        text
        url
        target
      }
      aboutLink {
        text
        url
        target
      }
      addMovieLink {
        text
        url
        target
      }
    }
  }
}
`;
