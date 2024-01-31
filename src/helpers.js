import { v4 as uuidv4 } from 'uuid';

import { VISITOR_COOKIE_NAME } from './constants';

export const getRandomVariation = () => Math.random() < 0.5 ? 'control-variation' : 'test-variation';

export const getCookie = () => {
  const cookies = document.cookie.split(';');

  for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i].trim();

      if (cookie.startsWith(VISITOR_COOKIE_NAME)) {
          return cookie;
      }
  }

  return null;
}

export const createOrReadCookie = () => {
  let variation = getCookie();

  if (!variation) {
    visitId = `${VISITOR_COOKIE_NAME}_${uuidv4()}`;
    assignedVariation = getRandomVariation();
    Cookies.set(visitId, assignedVariation); // Expires in 1 day
    return [visitId, assignedVariation]
  }
  return variation.split('=');
}
