import { AuthenticationContext, adalFetch, withAdalLogin } from 'react-adal';

// todo : change (tenant and api) to ae.onmicrosoft.com once domain has been established
// todo : document this
const adalConfig = {
    tenant: 'gwangjaehotmail.onmicrosoft.com',
    clientId: 'a42cbd10-bbd7-414f-b9f8-733274fea3c1',
    endpoints: {
        api: 'a42cbd10-bbd7-414f-b9f8-733274fea3c1'
    },
    postLogoutRedirectUri: window.location.origin,
    redirectUri: 'http://localhost:5000/',
    cacheLocation: 'sessionStorage'
};

export const authContext = new AuthenticationContext(adalConfig);

export const getToken = () => {
    return authContext.getCachedToken(authContext.config.clientId);
};

export const adalApiFetch = (fetch, url, options) =>
    adalFetch(authContext, adalConfig.endpoints.api, fetch, url, options);

export const withAdalLoginApi = withAdalLogin(authContext, adalConfig.endpoints.api);