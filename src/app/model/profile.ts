import {User} from './user';

export interface Profile {
  id?: number;
  fullName?: string;
  image?: any;
  email?: string;
  address?: string;
  phone?: string;
  user?: User;
}
