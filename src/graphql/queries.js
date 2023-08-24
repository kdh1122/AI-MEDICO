/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getBlog = /* GraphQL */ `
  query GetBlog($id: ID!) {
    getBlog(id: $id) {
      id
      email
      name
      birth
      phone
      scripts {
        items {
          id
          email
          script
          createdAt
          updatedAt
          blogScriptsId
          __typename
        }
        nextToken
        __typename
      }
      diagnoses {
        items {
          id
          email
          translation
          createdAt
          updatedAt
          blogDiagnosesId
          __typename
        }
        nextToken
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const listBlogs = /* GraphQL */ `
  query ListBlogs(
    $filter: ModelBlogFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBlogs(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        email
        name
        birth
        phone
        scripts {
          nextToken
          __typename
        }
        diagnoses {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getScript = /* GraphQL */ `
  query GetScript($id: ID!) {
    getScript(id: $id) {
      id
      email
      blog {
        id
        email
        name
        birth
        phone
        scripts {
          nextToken
          __typename
        }
        diagnoses {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        owner
        __typename
      }
      script
      createdAt
      updatedAt
      blogScriptsId
      __typename
    }
  }
`;
export const listScripts = /* GraphQL */ `
  query ListScripts(
    $filter: ModelScriptFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listScripts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        email
        blog {
          id
          email
          name
          birth
          phone
          createdAt
          updatedAt
          owner
          __typename
        }
        script
        createdAt
        updatedAt
        blogScriptsId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getDiagnosis = /* GraphQL */ `
  query GetDiagnosis($id: ID!) {
    getDiagnosis(id: $id) {
      id
      email
      blog {
        id
        email
        name
        birth
        phone
        scripts {
          nextToken
          __typename
        }
        diagnoses {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        owner
        __typename
      }
      translation
      createdAt
      updatedAt
      blogDiagnosesId
      __typename
    }
  }
`;
export const listDiagnoses = /* GraphQL */ `
  query ListDiagnoses(
    $filter: ModelDiagnosisFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDiagnoses(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        email
        blog {
          id
          email
          name
          birth
          phone
          createdAt
          updatedAt
          owner
          __typename
        }
        translation
        createdAt
        updatedAt
        blogDiagnosesId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
