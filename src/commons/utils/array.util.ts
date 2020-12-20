interface IUser {
  name: string;
}

export const filterByName = (a: IUser, b: IUser) =>
  a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
