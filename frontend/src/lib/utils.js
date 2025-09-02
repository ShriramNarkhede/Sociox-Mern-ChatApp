export function formatMessageTime(date) {
  return new Date(date).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

export async function requestNotificationPermission() {
  if (typeof window === "undefined" || !("Notification" in window)) return false;
  if (Notification.permission === "granted") return true;
  try {
    const result = await Notification.requestPermission();
    return result === "granted";
  } catch (_e) {
    return false;
  }
}

export function showBrowserNotification(title, options = {}) {
  if (typeof window === "undefined" || !("Notification" in window)) return;
  if (Notification.permission !== "granted") return;
  try {
    const notification = new Notification(title, options);
    // Auto-close after a few seconds to avoid piling up
    setTimeout(() => notification.close(), 5000);
  } catch (_e) {
    // noop
  }
}
