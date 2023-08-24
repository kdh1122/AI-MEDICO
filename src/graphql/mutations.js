/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createBlog = /* GraphQL */ `
  mutation CreateBlog(
    $input: CreateBlogInput!
    $condition: ModelBlogConditionInput
  ) {
    createBlog(input: $input, condition: $condition) {
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
export const updateBlog = /* GraphQL */ `
  mutation UpdateBlog(
    $input: UpdateBlogInput!
    $condition: ModelBlogConditionInput
  ) {
    updateBlog(input: $input, condition: $condition) {
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
export const deleteBlog = /* GraphQL */ `
  mutation DeleteBlog(
    $input: DeleteBlogInput!
    $condition: ModelBlogConditionInput
  ) {
    deleteBlog(input: $input, condition: $condition) {
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
export const createScript = /* GraphQL */ `
  mutation CreateScript(
    $input: CreateScriptInput!
    $condition: ModelScriptConditionInput
  ) {
    createScript(input: $input, condition: $condition) {
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
export const updateScript = /* GraphQL */ `
  mutation UpdateScript(
    $input: UpdateScriptInput!
    $condition: ModelScriptConditionInput
  ) {
    updateScript(input: $input, condition: $condition) {
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
export const deleteScript = /* GraphQL */ `
  mutation DeleteScript(
    $input: DeleteScriptInput!
    $condition: ModelScriptConditionInput
  ) {
    deleteScript(input: $input, condition: $condition) {
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
export const createDiagnosis = /* GraphQL */ `
  mutation CreateDiagnosis(
    $input: CreateDiagnosisInput!
    $condition: ModelDiagnosisConditionInput
  ) {
    createDiagnosis(input: $input, condition: $condition) {
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
export const updateDiagnosis = /* GraphQL */ `
  mutation UpdateDiagnosis(
    $input: UpdateDiagnosisInput!
    $condition: ModelDiagnosisConditionInput
  ) {
    updateDiagnosis(input: $input, condition: $condition) {
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
export const deleteDiagnosis = /* GraphQL */ `
  mutation DeleteDiagnosis(
    $input: DeleteDiagnosisInput!
    $condition: ModelDiagnosisConditionInput
  ) {
    deleteDiagnosis(input: $input, condition: $condition) {
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
