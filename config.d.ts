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
         * @visibility secret
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