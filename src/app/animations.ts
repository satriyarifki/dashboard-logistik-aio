import {
  trigger,
  state,
  style,
  animate,
  transition,
  useAnimation,
} from '@angular/animations';
import {
  bounce,
  swing,
  slideInLeft,
  slideInDown,
  zoomIn,
  zoomOut,
  fadeInDown,
  fadeInUp,
} from 'ng-animate';

export const slideInRouteVar = trigger('routeAnimations', [
  transition('* => *', useAnimation(fadeInDown, { params: { timing: 0.25 } })),
  transition('* => *', useAnimation(fadeInUp, { params: { timing: 0.25 } })),
]);

export const zoomInOutVar = trigger('ZoomInOutAnimation', [
  transition(':enter', useAnimation(zoomIn, { params: { timing: 0.25 } })),
  transition(':leave', useAnimation(zoomOut, { params: { timing: 0.25 } })),
]);
export const zoomInVar = trigger('ZoomInAnimation', [
  transition(':enter', useAnimation(zoomIn, { params: { timing: 0.25 } })),
]);
