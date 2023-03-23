export interface Config {
  app: {
    analytics?: {
      umami: {
        /**
         * Umami Analytics tracking ID
         * @visibility frontend
        */   
        enabled: boolean;
        
        /**
         * Umami Analytics tracking ID
         * @visibility frontend
         */        
        websiteId: string;

        /**
         * Umami Analytics Auth Bearer Token
         * @visibility frontend
         */   
        authToken: string;

        /**
         * Umami Analytics endpoint url
         * @visibility frontend
         */   
        url: string;
      }
    }
  }
}