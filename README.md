# Demo
- https://foodbank-pwa.firebaseapp.com/
<img src="https://github.com/danlee0528/FoodBank-ProgressiveWebApp/blob/main/Screen%20Shot%202021-02-15%20at%2010.54.49%20PM.png" width="40%"/>

# How to Run? 
- Visit the above link on your mobile device
- Save the page to home screen from the option menu
- Go offline and start adding/removing items


# Technologies
- Firebase
- JavaScript, HTML, CSS

# Understanding Progressive Web Apps
## Progressive Web Apps
- Use web technologies such as Vanilla JS, CSS, HTML
    - Install on a mobile home screen
    - Access the app when offline
    - Get (web) push notifications
- Accessed via a web address and not the app store
- Runs in the browser but with access to device features

## Service Workers
- A JS file (by convention, sw.js) that runs a separate thread from the main thread (like a background thread) listening for fetch requests, push messages, etc.
    - load content offline
    - use background sync
    - use push notifications
### Lifecycle
1. Register the service worker (sw.js) 
2. The brower installs event (cahcing, other tasks)
3. Service worker becomes active
4. Service worker "listens" for events
a
