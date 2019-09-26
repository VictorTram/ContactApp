# ContactApp
• Full-stack mobile Contact Management Application in React Native with Expo tool-chain. </br>
• Multi-Screen navigation for Add/View/Edit contacts with Firebase storage for User data and image file upload.</br>


Requirements:
- A working Computer connected to the Internet. </br>
- A working phone, connected to the same Network as your computer. </br>
- A working firebase configuration Key. </br>

How to Install </br>
1. Fork the project onto your machine</br>
2. In the project folder create a 'config.js' file for your firebase key and place it like below:
```jsx
const SECRET_firebaseConfig = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
  };

export {SECRET_firebaseConfig};

```
3. In your project folder go ahead and enter in 'npm install' to install project dependencies</br>
```terminal
npm install
```
4. To run the project, simply type in 'npm start'</br>
```terminal
npm start
```
5. This will load the project files through an expo metro bundler. On the Metro Bundler page that
opens up in your default browser, open up the 'Expo' application on your phone and scan the QR code
that is displayed in the metro bundler</br>
6. The project now runs!</br>

