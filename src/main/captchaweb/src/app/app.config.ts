import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { RECAPTCHA_SETTINGS, RecaptchaSettings } from 'ng-recaptcha';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: { siteKey: '6LdPlfsqAAAAAL-4r83dR0cimqonJ0sCNRwbfByr' } as RecaptchaSettings,
    },
  ],
};