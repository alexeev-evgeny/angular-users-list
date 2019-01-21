import axios from 'axios';

export default class UsersService {
    constructor() { }

    async getAll(query) {
        try {
            const { data = [] } = await axios.get(query);
            return data;
        } catch (error) {
            console.error('Failed to get users', { error });
            return [];
        }
    }
}