import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { analyticsModuleUmami } from '../src/plugin';
import { Playground } from './Playground';

createDevApp()
  .registerPlugin(analyticsModuleUmami)
  .addPage({
    path: '/matomo',
    title: 'Matomo Playground',
    element: <Playground />,
  })
  .render();
