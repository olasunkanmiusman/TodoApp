# ✅ Todo App

A modern and intuitive Todo application built with **React Native** and **Expo**, featuring **voice input mode** 🔊 powered by `expo-speech-recognition` for hands-free task creation!

> 🚫 This project does **not** work with Expo Go — it uses native modules.

---

## ✨ Features

✅ Add todos dynamically
✅ Mark completed or uncompleted
❌ Delete tasks individually
🗣️ Voice input for task entry
📱 Local native builds with Expo Dev Client
(so you can develop with native modules without EAS)

---

## 🛠️ Tech Stack

| Technology              | Purpose                     |
| ----------------------- | --------------------------- |
| React Native            | Mobile UI framework         |
| Expo                    | Development workflow        |
| expo-speech-recognition | Voice input support         |
| Expo Dev Client         | Required for native modules |

---

## ✅ Requirements

✔ Node.js **18+**
✔ Android Studio / Xcode installed
✔ Physical Android device or emulator
✔ Internet connection for Metro Bundler
❌ Expo Go not supported

---

## ⚙️ Installation & Setup

### 1️⃣ Clone & Install Dependencies

```sh
git clone https://github.com/olasunkanmiusman/TodoApp.git
cd TodoApp
npm install
```

---

### 2️⃣ Install Expo Dev Client

```sh
npx expo install expo-dev-client
```

---

### 3️⃣ Prebuild Native Android/iOS Projects

```sh
npx expo prebuild
```

This generates:

* `android/` folder (Native Android project)
* `ios/` folder (Native iOS project)

---

### 4️⃣ Run the App on Device/Emulator

#### ✅ Android:

```sh
npx expo run:android
```

✅ This will:

* Build a native Android APK locally
* Install it to connected device/emulator
* Launch it automatically

#### ✅ iOS (Mac only):

```sh
npx expo run:ios
```

---

### 5️⃣ Start Metro Bundler (Hot Reloading)

```sh
npx expo start
```

App reloads instantly as you save changes ✅

---

## 📂 Project Structure

```
TodoApp
 ┣ app/               # Expo Router navigation
 ┣ components/        # UI components
 ┣ interfaces/        # TypeScript types
 ┣ utils/             # Todo helpers
 ┣ assets/            # Icons & splash screens
 ┣ android/           # Generated native Android project
 ┣ ios/               # Generated native iOS project
 ┗ README.md
```

---

## 🚀 Future Enhancements

🔔 Push notifications
☁️ Cloud sync (Supabase or Firebase)
🌓 Dark mode
✅ Unit tests (Jest + RTL)

---

### 📌 Notes

✅ Native modules supported (e.g. speech recognition)
✅ No Expo login needed inside the app
❌ You must rebuild if native configs change
✅ Development workflow is closer to real production apps

