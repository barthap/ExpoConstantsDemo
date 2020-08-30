# What do `expo-constants` and `expo-application` show on different builds and different platforms?

It's sometimes unclear what `expo-constants` and `expo-application` values are when you eject your Expo app to bare workflow or build standalone app. I made a simple test app, which demonstrates their values.

I used this technique:

```js
import Constants from 'expo-constants';
import * as Application from 'expo-application';

// use this to filter out values
// which are not actual data
const applicationFilter = (key: any, val: any) => typeof val !== 'function' && key !== 'ApplicationReleaseType';

const applicationStr = JSON.stringify(
  Application,
  (key, val) => applicationFilter(key, val) ? val : undefined,
  2
);

const constantsStr = JSON.stringify(
  Constants,
  // filter out fonts, as they are not interesting
  (key, val) => key === 'systemFonts' ? undefined : val, 
  2
);

// displaying is oversimplified here
export default App = () => (
    <View style={styles.container}>
        <Text>Constants value</Text>
        <TextInput value={constantsStr} />
        <Text>Application value</Text>
        <TextInput value={applicationStr} />
    </View>
);
```

then I ran it on all three platforms: Android, iOS and Web using:
1. Expo Client
2. Standalone APK build
3. Eject to bare workflow

Versions used:
- Expo SDK 38
- iOS Simulator: iPhone 11 iOS 13.6
- Android Emulator: Nexus 5 API 28
- Expo Client 2.16.0
- Web: Chrome
- Metro Bundler running on port 19000

My `app.json` manifest file used:
```json
{
  "expo": {
    "name": "App.json Name",
    "description": "App.json description",
    "slug": "app-slug",
    "version": "1.2.3",
    "scheme": "myscheme",

    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "updates": {
      "enabled": false
    },
    "assetBundlePatterns": ["**/*"],
    "ios": {
      "supportsTablet": false,
      "bundleIdentifier": "my.ios.bundleId",
      "buildNumber": "1.0.0"
    },
    "android": {
      "package": "my.android.package",
      "versionCode": 234
    },
    "web": {
      "favicon": "./assets/favicon.png",
      "name": "Web name",
      "description": "Web description"
    }
  }
}
```

## Expo Client

### iOS Simulator

Application:
```json
{
  "nativeApplicationVersion": "2.16.0",
  "nativeBuildVersion": "2.16.0.101",
  "applicationName": "Expo",
  "applicationId": "host.exp.Exponent",
  "androidId": null
}
```

Constants:
```json
{
  "manifest": {
    "debuggerHost": "127.0.0.1:19001",
    "packagerOpts": {
      "lanType": "ip",
      "dev": true,
      "hostType": "lan",
      "minify": false,
      "https": false,
      "urlRandomness": null
    },
    "slug": "app-slug",
    "updates": {
      "enabled": false
    },
    "splash": {
      "imageUrl": "http://127.0.0.1:19001/assets/./assets/splash.png",
      "image": "./assets/splash.png",
      "backgroundColor": "#ffffff",
      "resizeMode": "contain"
    },
    "isVerified": true,
    "ios": {
      "supportsTablet": false,
      "bundleIdentifier": "my.ios.bundleId",
      "buildNumber": "1.0.0"
    },
    "logUrl": "http://127.0.0.1:19000/logs",
    "scheme": "myscheme",
    "icon": "./assets/icon.png",
    "platforms": [
      "ios",
      "android",
      "web"
    ],
    "name": "App.json Name",
    "iconUrl": "http://127.0.0.1:19001/assets/./assets/icon.png",
    "description": "App.json description",
    "loadedFromCache": false,
    "id": "@<<username>>/app-slug",
    "android": {
      "versionCode": 234,
      "package": "my.android.package"
    },
    "bundleUrl": "http://127.0.0.1:19001/node_modules/expo/AppEntry.bundle?platform=ios&dev=true&minify=false&hot=false",
    "orientation": "portrait",
    "web": {
      "name": "Web name",
      "description": "Web description",
      "favicon": "./assets/favicon.png"
    },
    "version": "1.2.3",
    "sdkVersion": "38.0.0",
    "env": {},
    "xde": true,
    "hostUri": "127.0.0.1:19000",
    "assetBundlePatterns": [
      "**/*"
    ],
    "mainModuleName": "node_modules/expo/AppEntry",
    "developer": {
      "tool": "expo-cli",
      "projectRoot": "/<<path-to-project>>/app-constants-demo"
    }
  },
  "isHeadless": false,
  "isDetached": false,
  "platform": {
    "ios": {
      "userInterfaceIdiom": "handset",
      "platform": "x86_64",
      "model": "Simulator",
      "systemVersion": "13.6",
      "buildNumber": null
    }
  },
  "sessionId": "384F4A3A-UUID-HERE-929D-F8A84C9C1DE7",
  "isDevice": false,
  "statusBarHeight": 44,
  "supportedExpoSdks": [
    "36.0.0",
    "37.0.0",
    "38.0.0"
  ],
  "nativeBuildVersion": "2.16.0.101",
  "debugMode": false,
  "linkingUri": "exp://127.0.0.1:19000/",
  "expoRuntimeVersion": "2.16.0.101",
  "installationId": "584DC2FE-UUID-HERE-BEC1-91C1D7BA742C",
  "expoVersion": "2.16.0.101",
  "deviceName": "iPhone 11",
  "experienceUrl": "exp://127.0.0.1:19000",
  "nativeAppVersion": "2.16.0",
  "deviceYearClass": 2020,
  "appOwnership": "expo",
  "deviceId": "584DC2FE-UUID-HERE-BEC1-91C1D7BA742C",
  "linkingUrl": "exp://127.0.0.1:19000/"
}
```

### Android

Application:
```json
{
  "nativeApplicationVersion": "2.16.1",
  "nativeBuildVersion": "129",
  "applicationName": "Expo",
  "applicationId": "host.exp.exponent",
  "androidId": "8285d7db6f956915"
}
```

Constants:
```json
{
  "nativeAppVersion": "2.16.1",
  "linkingUri": "exp://192.168.0.160:19000",
  "expoVersion": "2.16.1",
  "isDetached": false,
  "nativeBuildVersion": 129,
  "installationId": "5f506976-UUID-HERE-a94a-6a8e67578fa4",
  "statusBarHeight": 24,
  "supportedExpoSdks": [
    "35.0.0",
    "36.0.0",
    "38.0.0",
    "37.0.0"
  ],
  "isDevice": false,
  "intentUri": "exp://192.168.0.160:19000",
  "platform": {
    "android": {
      "versionCode": null
    }
  },
  "deviceYearClass": 2013,
  "systemVersion": "9",
  "deviceName": "AOSP on IA Emulator",
  "sessionId": "94dfd9d8-UUID-HERE-bbc7-d6646a24ea77",
  "experienceUrl": "exp://192.168.0.160:19000",
  "isHeadless": false,
  "appOwnership": "expo",
  "manifest": {
    "name": "App.json Name",
    "description": "App.json description",
    "slug": "app-slug",
    "version": "1.2.3",
    "scheme": "myscheme",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff",
      "imageUrl": "http://192.168.0.160:19001/assets/./assets/splash.png"
    },
    "updates": {
      "enabled": false
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": false,
      "bundleIdentifier": "my.ios.bundleId"
    },
    "android": {
      "package": "my.android.package",
      "versionCode": 234
    },
    "web": {
      "favicon": "./assets/favicon.png",
      "name": "Web name",
      "description": "Web description"
    },
    "sdkVersion": "38.0.0",
    "platforms": [
      "ios",
      "android",
      "web"
    ],
    "xde": true,
    "developer": {
      "tool": "expo-cli",
      "projectRoot": "/<<path-to-project>>/app-constants-demo"
    },
    "packagerOpts": {
      "hostType": "lan",
      "lanType": "ip",
      "dev": true,
      "minify": false,
      "urlRandomness": null,
      "https": false
    },
    "env": {},
    "bundleUrl": "http://192.168.0.160:19001/node_modules/expo/AppEntry.bundle?platform=android&dev=true&minify=false&hot=false",
    "debuggerHost": "192.168.0.160:19001",
    "mainModuleName": "node_modules/expo/AppEntry",
    "logUrl": "http://192.168.0.160:19000/logs",
    "hostUri": "192.168.0.160:19000",
    "iconUrl": "http://192.168.0.160:19001/assets/./assets/icon.png",
    "id": "@<<username>>/app-slug",
    "loadedFromCache": false,
    "isVerified": true,
    "primaryColor": "#023C69"
  },
  "deviceId": "5f506976-UUID-HERE-a94a-6a8e67578fa4",
  "linkingUrl": "exp://192.168.0.160:19000"
}
```

### Web

Application:
```json
{
  "nativeApplicationVersion": null,
  "nativeBuildVersion": null,
  "applicationName": null,
  "applicationId": null,
  "androidId": null
}
```

Constants:
```json
{
  "installationId": "233e7a37-UUID-HERE-b1a7-91d458dd5a8e",
  "sessionId": "2e2a524e-UUID-HERE-b5ea-a27163d1c38b",
  "platform": {
    "web": {
      "ua": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.83 Safari/537.36"
    }
  },
  "isHeadless": false,
  "isDevice": true,
  "expoVersion": "38.0.0",
  "linkingUri": "http://localhost:19006",
  "expoRuntimeVersion": "38.0.0",
  "deviceName": "Chrome",
  "nativeAppVersion": null,
  "nativeBuildVersion": null,
  "statusBarHeight": 0,
  "deviceYearClass": null,
  "manifest": {
    "name": "App.json Name",
    "description": "App.json description",
    "slug": "app-slug",
    "version": "1.2.3",
    "scheme": "myscheme",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "updates": {
      "enabled": false
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "web": {},
    "sdkVersion": "38.0.0",
    "platforms": [
      "ios",
      "android",
      "web"
    ]
  },
  "experienceUrl": "http://localhost:19006",
  "debugMode": true,
  "appOwnership": null,
  "deviceId": "233e7a37-UUID-HERE-b1a7-91d458dd5a8e",
  "linkingUrl": "http://localhost:19006"
}
```

## Standalone build (using Expo build services)

### iOS

Application:
```json
{
  "nativeApplicationVersion": "1.2.3",
  "nativeBuildVersion": "1.0.0",
  "applicationName": "App.json Name",
  "applicationId": "my.ios.bundleId",
  "androidId": null
}
```

Constants:
```json
{
  "manifest": {
    "slug": "app-slug",
    "updates": {
      "enabled": false
    },
    "splash": {
      "imageUrl": "https://<<maybe-unique-id>>.cloudfront.net/~assets/b8895f17edbefb9f51b1f863c9811e44",
      "backgroundColor": "#ffffff",
      "image": "./assets/splash.png",
      "resizeMode": "contain"
    },
    "hostUri": "exp.host/@<<username>>/app-slug",
    "ios": {
      "supportsTablet": false,
      "bundleIdentifier": "my.ios.bundleId",
      "buildNumber": "1.0.0"
    },
    "revisionId": "1.2.3-r.p4RG0R9NN",
    "icon": "./assets/icon.png",
    "platforms": [
      "ios",
      "android",
      "web"
    ],
    "locales": {},
    "releaseId": "bdebefe5-UUID-HERE-8381-81684a4a49a7",
    "description": "App.json description",
    "dependencies": [
      "@expo/html-elements",
      "expo",
      "expo-application",
      "expo-constants",
      "expo-status-bar",
      "react",
      "react-dom",
      "react-native",
      "react-native-paper",
      "react-native-safe-area-context",
      "react-native-web"
    ],
    "isVerified": true,
    "bundledAssets": [
      "asset_3a2ba31570920eeb9b1d217cabe58315.ttf",
      "asset_8b12b3e16d591abc926165fa8f760e3b.json",
      "asset_744ce60078c17d86006dd0edabcd59a7.ttf",
      "asset_461d9bba8b6a3c91675039df12cfe6ca.json",
      "asset_140c53a7643ea949007aa9a282153849.ttf",
      "asset_94c4ffdcbffeb0570c635d7f8edd8a25.json",
      "asset_ca9ce9ff0676a9b04ef0f8a3ad17dd08.ttf",
      "asset_54a5c98d22f313098b3dbe2d5b2e87ba.json",
      "asset_b49ae8ab2dbccb02c4d11caaacf09eab.ttf",
      "asset_39843e5d52a6c5c42d5abdb0b34bcaa6.json",
      "asset_b06871f281fee6b241d60582ae9369b9.ttf",
      "asset_f1f91feb805137c9283fb766620ec5eb.json",
      "asset_09dd345dbd4ec5a0874841d5749ac153.json",
      "asset_0886a6b127c6057cee83f9c65c7ffd62.json",
      "asset_f6c6f6c8cb7784254ad00056f6fbd74e.ttf",
      "asset_b70cea0339374107969eb53e5b1f603f.ttf",
      "asset_c39278f7abfc798a241551194f55e29f.ttf",
      "asset_e20945d7c929279ef7a6f1db184a4470.ttf",
      "asset_60668d999bbaf663420340f7bdd580d7.json",
      "asset_b2e0fc821c6886fb3940f85a3320003e.ttf",
      "asset_3e6805fbc794680014716b8c752f20b8.json",
      "asset_3c851d60ad5ef3f2fe43ebd263490d78.ttf",
      "asset_1a0e3525dd5df87e77057204129a5e6e.json",
      "asset_a37b0c01c0baf1888ca812cc0508f6e2.ttf",
      "asset_7e078700f0c35367a56c5bbb2047dda7.json",
      "asset_8e7f807ef943bff1f6d3c2c6e0f3769e.ttf",
      "asset_fdc01171a7a7ea76b187afcd162dee7d.json",
      "asset_d2285965fe34b05465047401b8595dd0.ttf",
      "asset_647543ebfccf6e5495434383598453d1.json",
      "asset_5cdf883b18a5651a29a4d1ef276d2457.ttf",
      "asset_74d124a3caeac2bea111f3ca2f2dd34a.json",
      "asset_2379ae894c2c9f63b852a9f3676c2763.png"
    ],
    "iconUrl": "https://<<maybe-unique-id>>.cloudfront.net/~assets/41aba486029b982d6f7773e6eed0f5b4",
    "name": "App.json Name",
    "id": "@<<username>>/app-slug",
    "android": {
      "versionCode": 234,
      "package": "my.android.package"
    },
    "bundleUrl": "https://<<maybe-unique-id>>.cloudfront.net/%40<<username>>%2Fapp-slug%2F1.2.3%2F1f9cdba7599b075e95de5e8bb476c14c-38.0.0-ios.js",
    "commitTime": "2020-08-30T14:48:27.228Z",
    "orientation": "portrait",
    "web": {
      "description": "Web description",
      "favicon": "./assets/favicon.png",
      "name": "Web name"
    },
    "version": "1.2.3",
    "sdkVersion": "38.0.0",
    "releaseChannel": "default",
    "loadedFromCache": true,
    "publishedTime": "2020-08-30T14:48:27.139Z",
    "scheme": "myscheme"
  },
  "isHeadless": false,
  "isDetached": true,
  "platform": {
    "ios": {
      "platform": "x86_64",
      "systemVersion": "13.6",
      "model": "Simulator",
      "userInterfaceIdiom": "handset",
      "buildNumber": "1.0.0"
    }
  },
  "sessionId": "9A3E4ECA-UUID-HERE-82B3-CFFF26179825",
  "isDevice": false,
  "statusBarHeight": 44,
  "supportedExpoSdks": [
    "38.0.0"
  ],
  "nativeBuildVersion": "1.0.0",
  "debugMode": false,
  "linkingUri": "myscheme://",
  "expoRuntimeVersion": "38.0.0",
  "installationId": "A3E144A8-UUID-HERE-91AC-F99DBBC0AA50",
  "expoVersion": "38.0.0",
  "deviceName": "iPhone 11",
  "experienceUrl": "https://expo.io:443/@<<username>>/app-slug",
  "nativeAppVersion": "1.2.3",
  "deviceYearClass": 2020,
  "appOwnership": "standalone",
  "deviceId": "A3E144A8-UUID-HERE-91AC-F99DBBC0AA50",
  "linkingUrl": "myscheme://"
}
```

### Android

Application:
```json
{
  "nativeApplicationVersion": "1.2.3",
  "nativeBuildVersion": "234",
  "applicationName": "App.json Name",
  "applicationId": "my.android.package",
  "androidId": "3541210f7e7997cc"
}
```

Constants:
```json
{
  "nativeAppVersion": "1.2.3",
  "linkingUri": "myscheme://",
  "expoVersion": "1.2.3",
  "isDetached": true,
  "nativeBuildVersion": 234,
  "installationId": "8187b261-UUID-HERE-b8b6-45eb42c7e9b8",
  "statusBarHeight": 24,
  "supportedExpoSdks": [
    "38.0.0"
  ],
  "isDevice": false,
  "intentUri": "myscheme://",
  "platform": {
    "android": {
      "versionCode": 234
    }
  },
  "deviceYearClass": 2013,
  "systemVersion": "9",
  "deviceName": "AOSP on IA Emulator",
  "sessionId": "8cc025d0-UUID-HERE-87f1-810c6d30d0b0",
  "experienceUrl": "https://expo.io:443/@<<username>>/app-slug",
  "isHeadless": false,
  "appOwnership": "standalone",
  "manifest": {
    "ios": {
      "buildNumber": "1.0.0",
      "supportsTablet": false,
      "bundleIdentifier": "my.ios.bundleId"
    },
    "web": {
      "name": "Web name",
      "favicon": "./assets/favicon.png",
      "description": "Web description"
    },
    "icon": "./assets/icon.png",
    "name": "App.json Name",
    "slug": "app-slug",
    "scheme": "myscheme",
    "splash": {
      "image": "./assets/splash.png",
      "imageUrl": "https://<<maybe-unique-id>>.cloudfront.net/~assets/b8895f17edbefb9f51b1f863c9811e44",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "android": {
      "package": "my.android.package",
      "versionCode": 234
    },
    "iconUrl": "https://<<maybe-unique-id>>.cloudfront.net/~assets/41aba486029b982d6f7773e6eed0f5b4",
    "locales": {},
    "updates": {
      "enabled": false
    },
    "version": "1.2.3",
    "platforms": [
      "ios",
      "android",
      "web"
    ],
    "sdkVersion": "38.0.0",
    "description": "App.json description",
    "orientation": "portrait",
    "dependencies": [
      "@expo/html-elements",
      "expo",
      "expo-application",
      "expo-constants",
      "expo-status-bar",
      "react",
      "react-dom",
      "react-native",
      "react-native-paper",
      "react-native-safe-area-context",
      "react-native-web"
    ],
    "bundledAssets": [
      "asset_3a2ba31570920eeb9b1d217cabe58315.ttf",
      "asset_8b12b3e16d591abc926165fa8f760e3b.json",
      "asset_744ce60078c17d86006dd0edabcd59a7.ttf",
      "asset_461d9bba8b6a3c91675039df12cfe6ca.json",
      "asset_140c53a7643ea949007aa9a282153849.ttf",
      "asset_94c4ffdcbffeb0570c635d7f8edd8a25.json",
      "asset_ca9ce9ff0676a9b04ef0f8a3ad17dd08.ttf",
      "asset_54a5c98d22f313098b3dbe2d5b2e87ba.json",
      "asset_b49ae8ab2dbccb02c4d11caaacf09eab.ttf",
      "asset_39843e5d52a6c5c42d5abdb0b34bcaa6.json",
      "asset_b06871f281fee6b241d60582ae9369b9.ttf",
      "asset_f1f91feb805137c9283fb766620ec5eb.json",
      "asset_09dd345dbd4ec5a0874841d5749ac153.json",
      "asset_0886a6b127c6057cee83f9c65c7ffd62.json",
      "asset_f6c6f6c8cb7784254ad00056f6fbd74e.ttf",
      "asset_b70cea0339374107969eb53e5b1f603f.ttf",
      "asset_c39278f7abfc798a241551194f55e29f.ttf",
      "asset_e20945d7c929279ef7a6f1db184a4470.ttf",
      "asset_60668d999bbaf663420340f7bdd580d7.json",
      "asset_b2e0fc821c6886fb3940f85a3320003e.ttf",
      "asset_3e6805fbc794680014716b8c752f20b8.json",
      "asset_3c851d60ad5ef3f2fe43ebd263490d78.ttf",
      "asset_1a0e3525dd5df87e77057204129a5e6e.json",
      "asset_a37b0c01c0baf1888ca812cc0508f6e2.ttf",
      "asset_7e078700f0c35367a56c5bbb2047dda7.json",
      "asset_8e7f807ef943bff1f6d3c2c6e0f3769e.ttf",
      "asset_fdc01171a7a7ea76b187afcd162dee7d.json",
      "asset_d2285965fe34b05465047401b8595dd0.ttf",
      "asset_647543ebfccf6e5495434383598453d1.json",
      "asset_5cdf883b18a5651a29a4d1ef276d2457.ttf",
      "asset_74d124a3caeac2bea111f3ca2f2dd34a.json",
      "asset_2379ae894c2c9f63b852a9f3676c2763.png"
    ],
    "id": "@<<username>>/app-slug",
    "releaseId": "d11c6168-UUID-HERE-bf81-1f7ed3b1c882",
    "revisionId": "1.2.3-r.FOrnjrNYY",
    "publishedTime": "2020-08-30T14:45:02.546Z",
    "commitTime": "2020-08-30T14:45:02.693Z",
    "bundleUrl": "https://<<maybe-unique-id>>.cloudfront.net/%40<<username>>%2Fapp-slug%2F1.2.3%2Ffbb6dba8155660aaebdd7d1959e31206-38.0.0-android.js",
    "releaseChannel": "default",
    "hostUri": "exp.host/@<<username>>/app-slug",
    "loadedFromCache": true,
    "isVerified": true
  },
  "deviceId": "8187b261-UUID-HERE-b8b6-45eb42c7e9b8",
  "linkingUrl": "myscheme://"
}
```

### Web

Application:
```json
{
  "nativeApplicationVersion": null,
  "nativeBuildVersion": null,
  "applicationName": null,
  "applicationId": null,
  "androidId": null
}
```

Constants:
```json
{
  "installationId": "0b298318-UUID-HERE-9541-cc7f777d3c82",
  "sessionId": "3961b6b7-UUID-HERE-bce3-6dc60b6582c0",
  "platform": {
    "web": {
      "ua": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.83 Safari/537.36"
    }
  },
  "isHeadless": false,
  "isDevice": true,
  "expoVersion": "38.0.0",
  "linkingUri": "http://localhost:5000",
  "expoRuntimeVersion": "38.0.0",
  "deviceName": "Chrome",
  "nativeAppVersion": null,
  "nativeBuildVersion": null,
  "statusBarHeight": 0,
  "deviceYearClass": null,
  "manifest": {
    "name": "App.json Name",
    "description": "App.json description",
    "slug": "app-slug",
    "version": "1.2.3",
    "scheme": "myscheme",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "updates": {
      "enabled": false
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "web": {},
    "sdkVersion": "38.0.0",
    "platforms": [
      "ios",
      "android",
      "web"
    ]
  },
  "experienceUrl": "http://localhost:5000",
  "debugMode": false,
  "appOwnership": null,
  "deviceId": "0b298318-UUID-HERE-9541-cc7f777d3c82",
  "linkingUrl": "http://localhost:5000"
}
```

## Ejected to bare workflow and buit locally

### iOS

Application:
```json

```

Constants:
```json

```

### Android

Application:
```json

```

Constants:
```json

```

### Web

The values are the same as for standalone web build.