export default {
  get: (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  },
  
  set: (name, value, days = 7) => {
    const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
    document.cookie = `${name}=${value}; expires=${expires}; path=/`;
  },
  
  delete: (name) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
  },
  
  getAll: () => {
    return document.cookie.split('; ').reduce((acc, cookie) => {
      const [name, value] = cookie.split('=');
      if (name) acc[name] = value;
      return acc;
    }, {});
  }
}