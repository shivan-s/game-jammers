export interface IPaginatedResponse {
  next: string;
  previous: string;
  results: any[];
}

export interface IUser {
  reference_id: string;
  username: string;
  name: string | null;
  date_joined: string;
}

export interface IProfile extends IUser {
  email: string;
}
