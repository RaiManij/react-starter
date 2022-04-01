import {REACT_APP_DOMAINID, REACT_APP_CLIENTID} from '@env';

export const configuration = {
  HOME: {
    TAB_BAR_HEIGHT: 50,
    LISTING_ITEM: {
      height: 130,
      offset: 15,
      saved: {
        position_top: 5,
        size: 25,
      },
    },
  },
  AUTH0_DOMAIN: 'https://' + REACT_APP_DOMAINID,
  CONNECTIONURL:
    'https://cdn.us.auth0.com/client/' + REACT_APP_CLIENTID + '.js',
  AUTH0_APIURL: 'https://' + REACT_APP_DOMAINID + '/api/v2/',
};
