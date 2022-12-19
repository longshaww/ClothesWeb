export const isDate = (ExpiryDate) => {
    var objDate, // date object initialized from the ExpiryDate string
        mSeconds, // ExpiryDate in milliseconds
        day, // day
        month, // month
        year; // year
    // date length should be 10 characters (no more no less)
    if (ExpiryDate.length !== 10) {
        return false;
    }
    // third and sixth character should be '/'
    if (ExpiryDate.substring(2, 3) !== '/' || ExpiryDate.substring(5, 6) !== '/') {
        return false;
    }
    // extract month, day and year from the ExpiryDate (expected format is mm/dd/yyyy)
    // subtraction will cast variables to integer implicitly (needed
    // for !== comparing)
    month = ExpiryDate.substring(0, 2) - 1; // because months in JS start from 0
    day = ExpiryDate.substring(3, 5) - 0;
    year = ExpiryDate.substring(6, 10) - 0;
    var currentTime = new Date();
    const yearBaby = currentTime.getFullYear() - year;
    // test year range
    if (year < 1000 || year > 3000 || yearBaby < 6) {
        return false;
    }
    // convert ExpiryDate to milliseconds
    mSeconds = new Date(year, month, day).getTime();
    // initialize Date() object from calculated milliseconds
    objDate = new Date();
    objDate.setTime(mSeconds);
    // compare input date and parts from Date() object
    // if difference exists then date isn't valid
    if (
        objDate.getFullYear() !== year ||
        objDate.getMonth() !== month ||
        objDate.getDate() !== day
    ) {
        return false;
    }
    // otherwise return true
    return true;
};

export const checkIsValidName = (str) => {
    return /\d/.test(str);
};

export const validatePhoneNumber = (str) => {
    try {
        return str.match(/\d/g).length === 10;
    } catch (err) {
        return false;
    }
};

export const ValidateEmail = (mail) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
        return true;
    }
    return false;
};

export const validatePassword = (pw) => {
    return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/.test(pw) && pw.length > 6;
};

const validateVerifyPassword = (newPw, verifyPw) => {
    return newPw === verifyPw;
};
export const validateNewPassword = (model) => {
    const newPw = model.newPassword.value;
    const verifyPw = model.verifyPassword.value;
    if (!validatePassword(newPw)) {
        return 'Password phải có kí tự đăc biệt,số,chữ hoa,độ dài > 6 kí tự';
    }
    if (!validateVerifyPassword(newPw, verifyPw)) {
        return 'Xác nhận lại password không đúng';
    }
};

export const validateRank = (rank, moneyPayed) => {
    switch (rank) {
        case 'Bronze':
            if (moneyPayed > 500) throw new Error('Số tiền nhập sai quy định rank');
            break;
        case 'Silver':
            if ((moneyPayed >= 500) & (moneyPayed < 1000)) {
                return;
            } else {
                throw new Error('Số tiền nhập sai quy định rank');
            }
        case 'Gold':
            if (moneyPayed >= 1000 && moneyPayed < 5000) {
                return;
            } else {
                throw new Error('Số tiền nhập sai quy định rank');
            }
        case 'Platinum':
            if (moneyPayed > 5000) {
                return;
            } else {
                throw new Error('Số tiền nhập sai quy định rank');
            }
        default:
            throw new Error('Đã xảy ra lỗi');
    }
};

export const isAdmin = (role) => {
    switch (role) {
        case 0:
            return true;
        case 1:
            return true;
        default:
            return false;
    }
};
