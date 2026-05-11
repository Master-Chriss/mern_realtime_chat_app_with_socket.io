export const formatMessageTime = (time) => {
  const messageDate = new Date(time);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const messageDay = new Date(messageDate.getFullYear(), messageDate.getMonth(), messageDate.getDate());
  const todayDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const yesterdayDay = new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate());

  const timeStr = messageDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  if (messageDay.getTime() === todayDay.getTime()) {
    return timeStr;
  } else if (messageDay.getTime() === yesterdayDay.getTime()) {
    return `Yesterday ${timeStr}`;
  } else {
    const dayName = messageDate.toLocaleDateString([], { weekday: 'short' });
    const date = messageDate.getDate();
    const month = messageDate.toLocaleDateString([], { month: 'short' });
    return `${dayName} ${date} ${month} ${timeStr}`;
  }
};
