npm install -g firebase-tools
firebase use --add espe-eyetracker-test
firebase deploy -P espe-eyetracker-test --token "$FIREBASE_DEPLOY_TOKEN"