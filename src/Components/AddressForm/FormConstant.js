export default [
    {
        formName: 'Name',
        label: 'Name',
        mandatory: true,
        type: 'text',
        validationText: 'It should be a alphabet'
    },
    {
        formName: 'Email',
        label: 'Email',
        mandatory: true,
        type: 'email',
        validationText: 'Email is not valid'
    },
    {
        formName: 'Mobile Number',
        label: '10 digit Mobile Number',
        mandatory: true,
        length: 10,
        type: 'number',
        multiline: false,
        validationText: 'It should be a number with 10 characters'
    },
    {
        formName: 'Pincode',
        label: 'Pincode',
        mandatory: true,
        multiline: false,
        length: 6,
        type: 'number',
        validationText: 'It should be a number with 6 characters'
    },
    {
        formName: 'Locality',
        label: 'Locality',
        mandatory: false,
        multiline: false,
        type: 'text'
    },
    {
        formName: 'Address',
        label: 'Address(Area and street)',
        mandatory: true,
        multiline: true,
        type: 'text'
    },
    {
        formName: 'City',
        label: 'City/District/Town',
        mandatory: true,
        multiline: false,
        type: 'text',
        validationText: 'It should be alphabet'
    },
    {
        formName: 'State',
        label: 'State',
        mandatory: true,
        multiline: false,
        type: 'text',
        validationText: 'It should be alphabet'
    },
    {
        formName: 'Landmark',
        label: 'LandMark(optional)',
        mandatory: false,
        multiline: false,
        type: 'text',
        validationText: 'It should be alphabet'
    },
    {
        formName: 'Alternate Phone',
        label: 'Alternate Phone(optional)',
        mandatory: false,
        multiline: false,
        type: 'number',
        length: 10,
    }
]