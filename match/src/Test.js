import React from "react";
import { motion } from "framer-motion";
import { Heart, Smile, MessageCircle } from "lucide-react";

export default function KawaiiDatingApp() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", backgroundColor: "#FFF0F6", minHeight: "100vh", padding: "24px" }}>
      {/* App Header */}
      <motion.h1
        style={{ fontSize: "32px", fontWeight: "bold", color: "#FF69B4", marginBottom: "16px" }}
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        💖 Kawaii Love 💖
      </motion.h1>

      {/* Profile Cards */}
      <motion.div
        style={{ width: "100%", maxWidth: "320px" }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div style={{ borderRadius: "16px", boxShadow: "0 4px 6px rgba(0,0,0,0.1)", backgroundColor: "#FFFFFF", padding: "16px", border: "4px solid #FFB6C1" }}>
          <img
            src="https://via.placeholder.com/150"
            alt="Cute Profile"
            style={{ width: "100%", borderRadius: "12px", marginBottom: "16px" }}
          />
          <div style={{ textAlign: "center" }}>
            <h2 style={{ fontSize: "20px", fontWeight: "600", color: "#FF4081" }}>Momo, 22 🐰</h2>
            <p style={{ color: "#808080" }}>Loves bubble tea & cute cafés! ☕✨</p>
            <div style={{ display: "flex", justifyContent: "center", gap: "16px", marginTop: "16px" }}>
              <button style={{ backgroundColor: "#64B5F6", color: "white", padding: "8px 16px", borderRadius: "24px", display: "flex", alignItems: "center", gap: "8px", border: "none" }}>
                <MessageCircle size={16} /> Chat
              </button>
              <button style={{ backgroundColor: "#FF4081", color: "white", padding: "8px 16px", borderRadius: "24px", display: "flex", alignItems: "center", gap: "8px", border: "none" }}>
                <Heart size={16} /> Like
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Bottom Buttons */}
      <div style={{ position: "fixed", bottom: "40px", display: "flex", gap: "24px" }}>
        <button style={{ backgroundColor: "#E0E0E0", padding: "16px", borderRadius: "50%", border: "none" }}>
          <Smile size={24} style={{ color: "#FFD700" }} />
        </button>
        <button style={{ backgroundColor: "#FF4081", padding: "16px", borderRadius: "50%", border: "none", color: "white" }}>
          <Heart size={24} />
        </button>
        <button style={{ backgroundColor: "#64B5F6", padding: "16px", borderRadius: "50%", border: "none", color: "white" }}>
          <MessageCircle size={24} />
        </button>
      </div>
    </div>
  );
}
