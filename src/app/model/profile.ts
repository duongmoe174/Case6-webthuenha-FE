import {User} from './user';

export interface Profile {
  id?: number;
  fullName?: string;
  image?: any;
  address?: string;
  phone?: string;
  user?: User;
}
