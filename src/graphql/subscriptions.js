/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateBlog = /* GraphQL */ `
  subscription OnCreateBlog(
    $filter: ModelSubscriptionBlogFilterInput
    $owner: String
  ) {
    onCreateBlog(filter: $filter, owner: $owner) {
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
export const onUpdateBlog = /* GraphQL */ `
  subscription OnUpdateBlog(
    $filter: ModelSubscriptionBlogFilterInput
    $owner: String
  ) {
    onUpdateBlog(filter: $filter, owner: $owner) {
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
export const onDeleteBlog = /* GraphQL */ `
  subscription OnDeleteBlog(
    $filter: ModelSubscriptionBlogFilterInput
    $owner: String
  ) {
    onDeleteBlog(filter: $filter, owner: $owner) {
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
export const onCreateScript = /* GraphQL */ `
  subscription OnCreateScript(
    $filter: ModelSubscriptionScriptFilterInput
    $id: String
  ) {
    onCreateScript(filter: $filter, id: $id) {
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
export const onUpdateScript = /* GraphQL */ `
  subscription OnUpdateScript(
    $filter: ModelSubscriptionScriptFilterInput
    $id: String
  ) {
    onUpdateScript(filter: $filter, id: $id) {
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
export const onDeleteScript = /* GraphQL */ `
  subscription OnDeleteScript(
    $filter: ModelSubscriptionScriptFilterInput
    $id: String
  ) {
    onDeleteScript(filter: $filter, id: $id) {
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
export const onCreateDiagnosis = /* GraphQL */ `
  subscription OnCreateDiagnosis(
    $filter: ModelSubscriptionDiagnosisFilterInput
    $id: String
  ) {
    onCreateDiagnosis(filter: $filter, id: $id) {
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
export const onUpdateDiagnosis = /* GraphQL */ `
  subscription OnUpdateDiagnosis(
    $filter: ModelSubscriptionDiagnosisFilterInput
    $id: String
  ) {
    onUpdateDiagnosis(filter: $filter, id: $id) {
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
export const onDeleteDiagnosis = /* GraphQL */ `
  subscription OnDeleteDiagnosis(
    $filter: ModelSubscriptionDiagnosisFilterInput
    $id: String
  ) {
    onDeleteDiagnosis(filter: $filter, id: $id) {
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
