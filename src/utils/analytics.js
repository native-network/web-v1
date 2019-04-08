import ReactGA from 'react-ga';

export function initGoogleAnalytics() {
  ReactGA.initialize('UA-125567970-2', {
    gaOptions: {
      siteSpeedSampleRate: 100,
    },
  });
  ReactGA.pageview(window.location.pathname + window.location.search);
}
