import { MessagesProvider } from "./components/Messages/messagesContext";
import MessageList from "./components/Messages";

export default function App() {
    return (
    <MessagesProvider>
      <MessageList />
    </MessagesProvider>
  );
}
