import Cryptr from 'cryptr';

const payload = new Cryptr('your_secret_key');

export const ENCRYPT_DATA = (data) => {
    return payload.encrypt(data);
}

export const DECRYPT_DATA = (data) => {
    return payload.decrypt(data);
}

