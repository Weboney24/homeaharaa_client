export const formValidation = (messgae) => {
  return {
    required: true,
    message: messgae,
  };
};

export const emailValidation = (messgae) => {
  return [
    {
      required: true,
      message: messgae,
    },
    {
      type: "email",
      message: "Enter Valid Email",
    },
  ];
};

export const passwordValidation = (messgae) => {
  return [{
    required: true,
    message: messgae,
  }, {
    pattern:
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    message:
      "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    },

  ];
};

export const passwordConfirmValidation = (messgae) => {
  return [{
    required: true,
    message: messgae,
  }, {
      pattern:
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      message:
        "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    },
    ({ getFieldValue }) => ({
      validator(_, value) {
        if (!value || getFieldValue('user_password') === value) {
          return Promise.resolve();
        }
        return Promise.reject(new Error('The confirm password that you entered do not match with new password!'));
      },
    }),
  ];
};


export const MobileNumberValidation = (messgae) => {
  return [{
    required: true,
    message: messgae,
  }
  ];
};