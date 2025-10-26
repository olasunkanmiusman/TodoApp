# ✅ Todo App

A modern and intuitive Todo application built with **React Native** and **Expo**, featuring **voice input mode** 🔊 powered by `expo-speech-recognition` for hands-free task creation!

This project uses **EAS Development Build** because of native module support — **Expo Go is not supported** ❌.

---

## ✨ Features

* ➕ Add multiple todos dynamically 
* ✅ Mark todo as completed or uncompleted
* ❌ Delete tasks individually
* 🗣️ **Voice input** for creating tasks easily
* 📱 Native build powered by **EAS Development Build**
* 🚫 Not compatible with Expo Go (uses native modules)

---

## 🛠️ Tech Stack

| Technology              | Purpose                  |
| ----------------------- | ------------------------ |
| React Native            | Mobile UI framework      |
| Expo                    | Development ecosystem    |
| expo-speech-recognition | Voice input capture      |
| EAS Build               | Native development build |

---

## ✅ Requirements

Ensure the following before running the project:

✔ Node.js **18+**
✔ Android device or emulator
✔ EAS Development Build installed on device
✔ Internet connection for Metro bundler
❌ Expo Go **not supported**

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository and install dependencies

```sh
git clone https://github.com/olasunkanmiusman/TodoApp.git
cd TodoApp

npm install
```

### 2️⃣ Install EAS CLI + Dev Client tools

```sh
npm install -g eas-cli
eas login
npx expo install expo-dev-client
```

> `expo-dev-client` is required because we are using native modules

---

### 3️⃣ Configure & Build Dev Client with EAS

```sh
eas build:configure
eas build --platform android --profile development
```

📌 This generates a **.apk** (Android) development build artifact
✅ The link will appear in terminal or Expo dashboard
✅ Download and install it on device

---

### 4️⃣ Install the Development Build

On Android device/emulator:

```sh
adb install -r path/to/your-app.apk
```

or simply click the shared **internal distribution link** to install 📲

---

### 5️⃣ Start Local Development Server (Metro Bundler)

```sh
npx expo start --tunnel
```

Tunnel ensures connection even if you are not on the same network ✅

---

### 6️⃣ Connect App to Bundler

1️⃣ Open installed **Todo Dev Client App**
2️⃣ Click **Scan QR**
3️⃣ Scan QR from terminal / Expo DevTools
4️⃣ App reloads instantly from your local code ✅

---

## 📂 Project Structure

```
TodoApp
 ┣ app/             # App folder routing (expo-router)
 ┣ components/      # UI components
 ┣ interfaces/      # TypeScript interfaces
 ┣ utils/           # CRUD helpers for todos
 ┣ assets/          # App icons & splash
 ┣ eas.json         # EAS build config
 ┣ package.json
 ┗ README.md
```

---

## 🚀 Future Enhancements

* 🌓 Dark Mode
* ☁️ Cloud sync via Supabase or Firebase
* 🔔 Reminders & Push Notifications
* ✅ Unit tests (Jest + RTL)

---

### 💡 Notes

✅ Development build is required anytime native modules change
✅ No Expo login required inside the app
❌ Takes longer than Expo Go at first — but more powerful!