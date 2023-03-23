import {
  AnalyticsApi, AnalyticsEvent
} from '@backstage/core-plugin-api';
import { Config } from '@backstage/config';

/**
 * Umami Analytics API provider for the Backstage Analytics API.
 * @public
 */

export class UmamiAnalytics implements AnalyticsApi {
  enabled: boolean;
  authToken: string;
  umamiUrl: string;
  websiteId: string;
  hostname: string;

  private constructor(options: {
    enabled: boolean;
    authToken: string, 
    umamiUrl: string, 
    websiteId: string, 
    hostname: string
  }) {
    const { enabled, authToken, hostname, umamiUrl, websiteId } = options;

    this.enabled = enabled;
    this.authToken = authToken;
    this.umamiUrl = umamiUrl;
    this.websiteId = websiteId;
    this.hostname = hostname;
  }

  static fromConfig(config: Config) {
    const enabled = config.getBoolean('app.analytics.umami.enabled');
    const websiteId = config.getString('app.analytics.umami.websiteId');
    const authToken = config.getString('app.analytics.umami.authToken');
    const umamiUrl = config.getString('app.analytics.umami.url');
    const hostname = config.getString('app.baseUrl')

    return new UmamiAnalytics({ enabled, authToken, umamiUrl, websiteId, hostname});
  }

  captureEvent(event: AnalyticsEvent) {
    if (!this.enabled) return;

    const { context, action, subject, attributes } = event;

    let payload;

    if (action === 'navigate' && context.extension === 'App') {
      payload = {
        payload: {
          website: this.websiteId,
          url: subject,
          hostname: this.hostname,
        },
        type: "pageview"
      };
    }

    if (action === 'click') {
      payload = {
        payload: {
          website: this.websiteId,
          url: attributes?.to,
          event_name: subject,
          hostname: this.hostname,
        },
        type: "event"
      }
    }

    if (payload) {
      fetch(`${this.umamiUrl}/api/collect`, {
        method: 'POST',
        body: JSON.stringify(payload),
        mode: "cors",
  
        headers: {
          "Accept": 'application/json',
          'Authorization': `Bearer ${this.authToken}`
        }
      })
    }
    
  }
}