interface IGeo {
  lat: string;
  lng: string;
}

export interface IAdress {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: IGeo;
}

interface ICompany {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface IUser {
  id: number;
  name: string;
  username: string;
  email: string;
  address: IAdress;
  phone: string;
  website: string;
  company: ICompany;
}
export interface IUserFields {
  addressData: any[];
  contactDetail: any[];
  user: any[];
}
