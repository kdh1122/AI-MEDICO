const signUpConfig = {
  header: 'Create an Amplify-Workshop Store Account',
  defaultCountryCode: '82',
  signUpFields: [
    {
      label: 'First name',
      key: 'given_name',
      required: true,
      displayOrder: 100,
      type: 'string'
    },
    {
      label: 'Last name',
      key: 'family_name',
      required: true,
      displayOrder: 101,
      type: 'string'
    },
    {
      label: 'Address',
      key: 'address',
      required: true,
      displayOrder: 102,
      type: 'string'
    }
  ]
};

export default signUpConfig
