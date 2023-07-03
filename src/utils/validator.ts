
const ERROR_CODES = {
  'SK001': 'Asegurate que el nombre sea correcto.',
  'SK002': 'El nombre solo puede contener letras.',
  'SK003': 'Asegurate que el apellido sea correcto.',
  'SK004': 'El apellido solo puede contener letras.',
  'SK005': 'Ingresá el DNI sin puntos ni espacios.',
  'SK006': 'Asegurate de que el e-mail sea correcto.',
  'SK007': 'Asegurate de que el código de área sea correcto.',
  'SK008': 'Asegurate de que el celular sea correcto.',
  'SK009': 'El celular solo puede contener números.',
  'SK010': 'El DNI solo puede contener números.',
  'SK011': 'El código de área solo puede contener números.',
  'SK012': 'Campo incompleto.',
  'SK013': 'Asegurate de que el campo no esté vacío',
  'SK016': 'Error en el Email',
  'MP316': 'Ingresa un nombre válido.',
}

export type ValidationType = { isValid: boolean; errorMessage?: string };

const checkIfHaveOnlyNumbers = (value = '') => /^[0-9]*$/.test(value);
const checkIfHaveNumber = (value: string):boolean => /\d/.test(value);
const checkMinLength = (value: string, minLength: number): boolean => (value.length < minLength);

export const validateNotEmptyField = (value: string): ValidationType => {
  if(checkMinLength(value, 2)) {
    return {
      isValid: false,
      errorMessage: ERROR_CODES['SK013'],
    };
  }

  return {
    isValid: true,
    errorMessage: '',
  };
};

export const validateField = (value: string): ValidationType => {
  return {
    isValid: (value !== '' && !/^[A-Za-z]+$/i.test(value)) && true,
    errorMessage: '',
  };
};

export const validateEmptyField = (value: string): ValidationType => {
  return {
    isValid: (value !== '') ? true : false,
    errorMessage: ERROR_CODES['SK012'],
  };
}

export const validateFirstName = (value = '', minLength = 2): ValidationType => {
  if(value === '') {
    return {
      isValid: false,
      errorMessage: ERROR_CODES['SK012'],
    };
  } else if(checkMinLength(value, minLength)) {
    return {
      isValid: false,
      errorMessage: ERROR_CODES['SK001'],
    };
  } else if (checkIfHaveNumber(value)) {
    return {
      isValid: false,
      errorMessage: ERROR_CODES['SK002'],
    }
  }

  return {
    isValid: true,
    errorMessage: '',
  };
}

export const validateLastName = (value = '', minLength = 2): ValidationType => {
  if(value === '') {
    return {
      isValid: false,
      errorMessage: ERROR_CODES['SK012'],
    };
  } else if(checkMinLength(value, minLength)) {
    return {
      isValid: false,
      errorMessage: ERROR_CODES['SK003'],
    };
  } else if (checkIfHaveNumber(value)) {
    return {
      isValid: false,
      errorMessage: ERROR_CODES['SK004'],
    }
  }

  return {
    isValid: true,
    errorMessage: '',
  };
}

export const validateAreaCode = (value = '', minLength = 2): ValidationType => {
  if(value === '') {
    return {
      isValid: false,
      errorMessage: ERROR_CODES['SK012'],
    };
  } else if(checkMinLength(value, minLength)) {
    return {
      isValid: false,
      errorMessage: ERROR_CODES['SK007'],
    };
  } else if (!checkIfHaveOnlyNumbers(value)) {
    return {
      isValid: false,
      errorMessage: ERROR_CODES['SK011'],
    }
  }

  return {
    isValid: true,
    errorMessage: '',
  };
}

export const validatePhoneNumber = (value = '', minLength = 8): ValidationType => {
  if(value === '') {
    return {
      isValid: false,
      errorMessage: ERROR_CODES['SK012'],
    };
  } else if(checkMinLength(value, minLength)) {
    return {
      isValid: false,
      errorMessage: ERROR_CODES['SK008'],
    };
  } else if (!checkIfHaveOnlyNumbers(value)) {
    return {
      isValid: false,
      errorMessage: ERROR_CODES['SK009'],
    }
  }

  return {
    isValid: true,
    errorMessage: '',
  };
}

export const validateCitizenId = (value: string, minLength = 8): ValidationType => {
  if(value === '') {
    return {
      isValid: false,
      errorMessage: ERROR_CODES['SK012'],
    };
  } else if(checkMinLength(value, minLength)) {
    return {
      isValid: false,
      errorMessage: ERROR_CODES['SK005'],
    };
  } else if (!checkIfHaveOnlyNumbers(value)) {
    return {
      isValid: false,
      errorMessage: ERROR_CODES['SK010'],
    }
  }

  return {
    isValid: true,
    errorMessage: '',
  };
}

export const validateEmail = (value: string): ValidationType => {
  if(value === '') {
    return {
      isValid: false,
      errorMessage: ERROR_CODES['SK012'],
    };
  } else if (!(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value))) {
    return {
      isValid: false,
      errorMessage: ERROR_CODES['SK016'], 
    };
  }

  return {
    isValid: true,
    errorMessage: '',
  };
}
