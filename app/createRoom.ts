"use server";
 
export const createRoom = async () => {
  const response = await fetch("https://api.huddle01.com/api/v1/create-room", {
    method: "POST",
    body: JSON.stringify({
      title: "Huddle01 Room",
    }),
    headers: {
      "Content-type": "application/json",
      "x-api-key": "ak_uZrBhaybfGtQtCNi",
    },
    cache: "no-cache",
  });
 
  const data = await response.json();
  const roomId = data.data.roomId;
  return roomId;
};