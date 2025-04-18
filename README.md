# 🕵️ Mystery App

An anonymous messaging platform where users can send messages without revealing their identity.

## 🚀 Features
- Send anonymous messages
- Secure storage using MongoDB
- Modern UI with Next.js & TypeScript
- Fast and scalable backend
- User-friendly interface

## 🛠 Tech Stack
- **Frontend:** Next.js, TypeScript
- **Backend:** Next.js API Routes
- **Database:** MongoDB

## 📦 Installation

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/your-username/mystery-app.git
cd mystery-app
```

### 2️⃣ Install Dependencies
```sh
npm install
# or
yarn install
```

### 3️⃣ Set Up Environment Variables
Create a `.env.local` file in the root directory and add:
```env
MONGO_URI=your_mongodb_connection_string
NEXTAUTH_SECRET=your_secret_key
```

### 4️⃣ Run the Development Server
```sh
npm run dev
# or
yarn dev
```

Visit `http://localhost:3000` to explore the app!

## 🏗 Project Structure
```
/mystery-app
│── pages/
│   ├── index.tsx  # Homepage
│   ├── api/
│   │   ├── messages.ts  # API Route for messages
│── components/
│   ├── MessageForm.tsx  # Form to send messages
│   ├── MessageList.tsx  # Display messages
│── lib/
│   ├── db.ts  # MongoDB connection setup
│── styles/  # Styling
│── .env.local  # Environment variables
│── next.config.js  # Next.js configuration
│── package.json  # Dependencies
```

## 📝 Contributing
1. Fork the repo
2. Create a new branch (`git checkout -b feature-name`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to your branch (`git push origin feature-name`)
5. Open a pull request

## ⚡ Future Improvements
- User authentication
- Message encryption
- Dark mode support

## 📜 License
This project is open-source under the MIT License.


 
 
