export const rules = {
  email: {
    required: {
      value: true,
      message: 'Email bắt buộc'
    },
    pattern: {
      value: /^\S+@\S+\.\S+$/,
      message: 'Email không đúng định dạng'
    },
    maxLenght: {
      value: 160,
      message: 'Độ dài từ 5 -160 ký tự'
    },
    minLenght: {
      value: 5,
      message: 'Độ dài từ 5 -160 ký tự'
    }
  },
  password: {
    required: {
      value: true,
      message: 'Password là bắt buộc'
    },
    maxLength: {
      value: 160,
      message: 'Độ dài từ 6 - 160 ký tự'
    },
    minLength: {
      value: 6,
      message: 'Độ dài từ 6 - 160 ký tự'
    }
  },
  confirm_password: {
    required: {
      value: true,
      message: 'Nhập lại password là bắt buộc'
    },
    maxLength: {
      value: 160,
      message: 'Độ dài từ 6 - 160 ký tự'
    },
    minLength: {
      value: 6,
      message: 'Độ dài từ 6 - 160 ký tự'
    }
  }
}

export const priceRules = {
  price_min: {
    pattern: {
      value: /^\d+$/,
      message: 'Price-min không đúng định dạng'
    }
  },
  price_max: {
    pattern: {
      value: /^\d+$/,
      message: 'Price-max không đúng định dạng'
    }
  }
}
