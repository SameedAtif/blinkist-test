const handleClickEvent = (jsonArray, clickEventData) => {
  try {
    const { visitorId, assignedVariation } = clickEventData;

    if (!jsonArray[assignedVariation]) {
      jsonArray[assignedVariation] = { users: {} };
    }

    if (!jsonArray[assignedVariation].users[visitorId]) {
      jsonArray[assignedVariation].users[visitorId] = { clicks: [], views: [] };
    }

    jsonArray[assignedVariation].users[visitorId].clicks.push(clickEventData);

    return jsonArray;
  } catch (error) {
    console.error('Error handling click event:', error.message);
    return jsonArray;
  }
}

const handlePageView = (jsonArray, pageViewData) => {
  try {
    const { visitorId, assignedVariation } = pageViewData;

    if (!jsonArray[assignedVariation]) {
      jsonArray[assignedVariation] = { users: {} };
    }

    if (!jsonArray[assignedVariation].users[visitorId]) {
      jsonArray[assignedVariation].users[visitorId] = { clicks: [], views: [] };
    }

    jsonArray[assignedVariation].users[visitorId].views.push(pageViewData);

    return jsonArray;
  } catch (error) {
    console.error('Error handling click event:', error.message);
    return jsonArray;
  }
}

/**
 * Tracks a pageview to our "imaginary api" - in this demo just the browser console. ;)
 * Send as params whatever you might seem valuable to send.
 * The URL is probably a good start though.
 */
export const trackPageview = (params) => {
  console.log(`--> Tracking Pageview: ${params}`);
  // const usersData = readUsersJson() || {}; --> Get Hosted data
  const newUserData = handlePageView({}, params); // or Send the params to the backend server.
  console.log('data stored', newUserData);
};

/**
 * Tracks an event to our "imaginary api" - in this demo just the browser console. ;)
 * Send as params whatever you might seem valuable to send.
 * The URL and an event name are probably a good start though.
 */
export const trackEvent = (params) => {
  console.log(`--> Tracking Event: ${params}`);
  // const usersData = readUsersJson() || {}; --> Get Hosted data
  const newUserData = handleClickEvent({}, params); // or Send the params to the backend server.
  console.log('data stored', newUserData);
};
