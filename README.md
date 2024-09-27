# Tabadol | Facilitating the exchange of educational personnel

Tabadol is a mobile app that enables educational personnel to share their demands to exchange post with others.

## Getting started

### Pre-requisites

- [Node.js](https://nodejs.org/en/)

### Installation

1. Clone the repo

   ```bash
   git clone https://github.com/zaynom/tabadol.git
   ```

2. Server

   - Install dependencies

   ```bash
   cd tabadol/server
   npm install
   ```

   - Set env variables

   ```bash
   GOOGLE_CLIENT_ID=
   GOOGLE_CLIENT_SECRET=
   GOOGLE_CALLBACK_URL=
   MONGODB_USERNAME=
   MONGODB_URI=
   MONGODB_PW=
   MONGODB_NAME=
   ACCESS_TOKEN_SECRET=
   REFRESH_TOKEN_SECRET=
   ```

   - Start server

   ```bash
   npm run dev
   ```

3. Client

   - Install dependencies

   ```bash
   cd tabadol/client
   npm install
   ```

   - Set env variables

   ```bash
   GOOGLE_CLIENT_ID_IOS=
   GOOGLE_CLIENT_ID_ANDROID=
   GOOGLE_CLIENT_ID_WEB=
   ```

   - Start client

   ```bash
   npm run ios
   or
   npm run android
   ```

## License

This project is licensed under a custom view-only license. You are free to view the contents of this repository, but any use, modification, or distribution of the code is prohibited. See the [LICENSE](LICENSE) file for full details.

## Authors

[Omar Ouaziz](https://github.com/zaynom)

## Contact

For any questions or concerns, please contact me at ouaziz0626@gmail.com.
