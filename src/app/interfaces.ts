export default interface UserInterface {
    id: string;
    address: UserAddress;
    age: number;
    department: string;
    gender: string;
    name: string;
}

interface UserAddress {
    city: string;
    street: string;
}

interface FilterData {
    value: string;
    count: number;
}

export interface FilterViewItemInterface {
    title: string;
    data: FilterData;
}
