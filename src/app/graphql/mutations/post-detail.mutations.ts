// src/app/graphql/mutations/post-detail.mutations.ts
import { gql } from 'apollo-angular';

export const ADD_POST = gql`
  mutation AddPost($input: PostInput!) {
    addPost(input: $input) {
      id
      deleted
      info
      info_show
      h
      w
      title
      backgroundurl
      download_counter
      published
      track
      data {
        title
        editable
        boxed
        rect {
          x y width height rx ry fill fillOpacity opacity rotate originX originY stroke strokeOpacity strokeWidth strokeAlignment
        }
        circle {
          cx cy r fill fillOpacity opacity originX originY stroke strokeWidth strokeOpacity strokeAlignment
        }
        ellipse {
          cx cy rx ry fill fillOpacity opacity originX originY rotate stroke strokeWidth strokeOpacity strokeAlignment
        }
        line {
          x1 y1 x2 y2 stroke strokeWidth opacity originX originY rotate
        }
        text {
          x y fs fw text api lang controlName dependency type color fontStyle { italic underline }
          rotate fontFamily textShadow { enable color blur offsetX offsetY }
          backgroundColor textEffects { enable gradient { enable startColor endColor direction } outline { enable color width } glow { enable color blur } }
          textAnchor alignmentBaseline letterSpacing lineHeight textTransformation opacity originX originY
        }
        image {
          r x y imageUrl borderColor borderWidth shape origin placeholder
          svgProperties { fill stroke strokeWidth } rotate
        }
      }
      msg
      apiData
      image
      created_at
      updated_at
      deleted_at
    }
  }
`;

export const UPDATE_POST = gql`
  mutation UpdatePost($input: PostUpdateInput!) {
    updatePost(input: $input) {
      id
      deleted
      info
      info_show
      h
      w
      title
      backgroundurl
      download_counter
      published
      track
      data {
        title
        editable
        boxed
        rect {
          x y width height rx ry fill fillOpacity opacity rotate originX originY stroke strokeOpacity strokeWidth strokeAlignment
        }
        circle {
          cx cy r fill fillOpacity opacity originX originY stroke strokeWidth strokeOpacity strokeAlignment
        }
        ellipse {
          cx cy rx ry fill fillOpacity opacity originX originY rotate stroke strokeWidth strokeOpacity strokeAlignment
        }
        line {
          x1 y1 x2 y2 stroke strokeWidth opacity originX originY rotate
        }
        text {
          x y fs fw text api lang controlName dependency type color fontStyle { italic underline }
          rotate fontFamily textShadow { enable color blur offsetX offsetY }
          backgroundColor textEffects { enable gradient { enable startColor endColor direction } outline { enable color width } glow { enable color blur } }
          textAnchor alignmentBaseline letterSpacing lineHeight textTransformation opacity originX originY
        }
        image {
          r x y imageUrl borderColor borderWidth shape origin placeholder
          svgProperties { fill stroke strokeWidth } rotate
        }
      }
      msg
      apiData
      image
      created_at
      updated_at
      deleted_at
    }
  }
`;

export const SOFT_DELETE_POST = gql`
  mutation SoftDeletePost($id: String!) {
    softDeletePost(id: $id)
  }
`;

export const RECOVER_POST = gql`
  mutation RecoverPost($id: String!) {
    recoverPost(id: $id)
  }
`;

export const HARD_DELETE_POST = gql`
  mutation HardDeletePost($id: String!) {
    hardDeletePost(id: $id)
  }
`;

export const UPLOAD_THUMBNAIL = gql`
  mutation UploadThumbnail($postId: String!, $file: Upload!) {
    uploadThumbnail(postId: $postId, file: $file)
  }
`;
