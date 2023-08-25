import { gql } from "@apollo/client";

export const GET_IMAGES = gql`
  query Query($keyword: String!) {
    images(keyword: $keyword) {
      image_ID
      source
      preview
      title
      thumbnails
      tags
    }
  }
`;