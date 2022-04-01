import Connection from './Connection';

export interface ConnectionMap {
  name: string;
  connections: Connection[];
}
export  interface ConnectionTypes {
  id: string;
  tenant: string;
  subscription: string;
  authorize: string;
  callback: string;
  hasAllowedOrigins: string;
  strategies: ConnectionMap[];
}
