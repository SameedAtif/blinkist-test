import "./styles.css";
import Cookies from 'js-cookie'
import jquery from "jquery";
import { v4 as uuidv4 } from 'uuid';

import { createOrReadCookie, getCookie } from './helpers.js';
import { VIEW_ID_NAME, EVENT_ID_NAME } from './constants.js';
import { trackPageview, trackEvent } from "./analytics-api.js";

// Issues with importing jQuery :(
export default (window.$ = window.jQuery = jquery);

// Your code here
/**
 * When user visits the page for the first time:
 * - create cookie to track visit: `visit_{visit_id}`
 * - the value should be the assigned a variation: control-variation || test-variation
 * - the given variation should be rendered.
 * - append { pageViewId, timestamp, visitId, assignedVariation } to pageView object
 */
/**
 * When user refreshes/revisits the pages.
 * - check if a visit is present or not. Show variation accordingly.
 * - if it's a redirect create a new pageView. Append to pageView.
 */
/**
 * When user clicks the sign-up button.
 * - append { timestamp, pageViewId, visitorId, assignedVariation } to pageEvent object
 */

const storeUniqueVisit = (assignedVariation) => {
  const pageView = {
    pageViewId: `${VIEW_ID_NAME}_${uuidv4()}`,
    timestamp: new Date().toISOString(),
    visitorId: assignedVariation[0],
    assignedVariation: assignedVariation[1]
  };
  console.log('pageView', pageView)
  trackPageview(pageView);
}

const handleClickEvent = (assignedVariation) => {
  const clickEvent = {
    clickEventId: `${EVENT_ID_NAME}_${uuidv4()}`,
    timestamp: new Date().toISOString(),
    visitorId: assignedVariation[0],
    assignedVariation: assignedVariation[1]
  };
  console.log('clickEvent', clickEvent)
  trackEvent(clickEvent);
}

$(document).ready(() => {
  let assignedVariation = createOrReadCookie();

  $('#' + assignedVariation[1]).show();
  if (window.performance.navigation.type !== 1 && getCookie() !== null) {
    storeUniqueVisit(assignedVariation);
  }

  $("#sign-up-link").click(() => {
    handleClickEvent(assignedVariation);
    window.location.href = '/signup';
  });
});
