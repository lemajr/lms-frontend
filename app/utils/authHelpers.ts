interface JwtPayload {
    exp: number;
  }
  
  export const parseJwt = (token: string): JwtPayload => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );
    return JSON.parse(jsonPayload);
  };
  
  export const isTokenExpired = (token: string): boolean => {
    const decoded = parseJwt(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
  };
  