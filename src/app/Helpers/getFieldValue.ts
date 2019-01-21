import { get, findKey } from 'lodash';
import UserInterface from './../interfaces';

export default function getFieldValue({ fieldName, user }: { fieldName: string, user: UserInterface }) {
    let result = get(user, fieldName);

    if (!result) {
        const key = findKey(user, fieldName);
        result = key ? get(user, `${key}.${fieldName}`) : undefined;
    }

    return result;
}
