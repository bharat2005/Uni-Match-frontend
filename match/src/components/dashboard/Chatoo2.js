import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import { collection, addDoc, serverTimestamp, getDocs, orderBy, query, onSnapshot } from "firebase/firestore";

export default function Chat({chatId = "chats_12413922_12413923", sender_reg_no="12413923", receiver_reg_no="12413922"}) {
    const [message, setMessage] = useState("");
    const [textMessages, setTextMessages] = useState([]);

    useEffect(() => {

    const unsubscribe = onSnapshot(query(collection(db, "chats", chatId, "messages"), orderBy("timestamp")),
    (response)=> {
        setTextMessages(response.docs.map(doc => doc.data()))
    },
    (error)=> {
        console.error("Error", error)
    })

    return unsubscribe

    }, []);

    function handleSend() {

        addDoc(collection(db, "chats", chatId, "messages"), {
            sender_reg_no,
            receiver_reg_no,
            text: message,
            timestamp: serverTimestamp(),
        })
            .then((docRef) => {
                console.log("Message sent successfully!", docRef.id);
            })
            .catch((error) => {
                console.error("Error sending message:", error);
            })
            .finally(() => {
                setMessage(""); 
            });
    }

    return (
        <>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message"
            />
            <button onClick={handleSend}>Send</button>
            <ul>
                {textMessages.map((message, index) => (
                    <div key={index} style={{ backgroundColor: 'cyan', margin: '5px', borderRadius: '24px' }}>
                        <p>{message.text} <br />
                            <small>{message.timestamp? message.timestamp.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }).toString(): "no date"}</small>
                        </p>
                    </div>
                ))}
            </ul>
        </>
    );
}
