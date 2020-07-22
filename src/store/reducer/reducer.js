import EMPLOYEE_DETAILS from "../Types/types";

const initialState = {
  userDetails: {
    dob: "",
    country: "",
    orgName: "",
    firstName: "",
    mobileNumber: "",
    state: "",
    lastName: "",
    gender: "",
    emailId: "",
    city: "",
    communicationAddress: "",
    permanentAddress: "",
    pincode: "",
  },
  toggleIcon: {
    idSort: false,
    nameSort: false,
    genderSort: false,
    dobSort: false,
    mobileNumberSort: false,
    emailIdSort: false,
  },
  showColumn:{
    id:false,
    name:false,
    gender:false,
    dob:false,
    mobileNumber:false,
    emailId:false,
    actions:false
  },
  selectAll: false,
  checkBoxFlag: [],
  cachedAddress: "",
  errors: {},
  isChecked: false,
  index: null,
  isEdit: false,
  userHistory: [],
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case EMPLOYEE_DETAILS:
      return { ...state, [action.payload.name]: action.payload.value };
    default:
      return state;
  }
};
