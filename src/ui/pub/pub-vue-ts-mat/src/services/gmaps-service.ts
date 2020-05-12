
// // Your personal API key.
// // Get it here: https://console.cloud.google.com/google/maps-apis
// const API_KEY = `AIzaSyCWAaBJsIvwbrbTI18PITVy7p0Qb6htM1k`;
// const CALLBACK_NAME = `gmapsCallback`;

// import {} from 'googlemaps';

// // import * as $ from 'jquery';

// import jQuery from 'jquery';
// const $ = jQuery;




// // interface Window {
// //   google
// // }

// // window.google = google;

// // const document = {
// //   querySelector: {} as any,
// //   createElement: {} as any
// // }


// // declare global {
// //     interface Window {
// //         google: any
// //     }
// // }

// // declare global {
// //     interface Document {
// //         querySelector: any
// //     }
// // }

// export default class GMapsService {

//   /**
//    *
//    */


//   constructor() {


//   }

//   loadScript(): Promise<any>{


//     // $(document).ready((x) => {

//     //   x.getScript(
//     //     `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&callback=${CALLBACK_NAME}`
//     //   , (y)=> {
//     //     alert('got the script');
//     //   });
//     // });

//     try {
//       let script = document.createElement(`script`);
//       script.async = true;
//       script.defer = true;
//       script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&callback=${CALLBACK_NAME}`;
//       document.getElementsByTagName('body').appendChild(script);

//       // script.onerror = rejectInitPromise;
//       document.querySelector(`head`).appendChild(script);
//       return Promise.resolve();
//     } catch (error) {
//       return Promise.reject('No good');
//     }
//   }

//   gmapsCallback(){
//     alert('call back called');
//   }


//   initialized = true;
//   // The callback function is called by
//   // the Google Maps script if it is
//   // successfully loaded.
//   // window[CALLBACK_NAME] = () => resolveInitPromise(window.google);

//   // We inject a new script tag into
//   // the `<head>` of our HTML to load
//   // the Google Maps script.

//   // script.async = true;
//   // script.defer = true;
//   // script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&callback=${CALLBACK_NAME}`;
//   // script.onerror = rejectInitPromise;
//   // document.querySelector(`head`).appendChild(script);


// }
