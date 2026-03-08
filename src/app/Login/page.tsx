"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Montserrat } from "next/font/google";
import { page, card, form, forgotModal as fm } from "./login.styles";
import Spinner from "@/components/Spinner";
import "@/styles/animations.css";

const montserrat = Montserrat({ subsets: ["latin"] });

export default function LoginPage() {
  const [email, setEmail]               = useState("");
  const [password, setPassword]         = useState("");
  const [isLoading, setIsLoading]       = useState(false);
  const [error, setError]               = useState("");
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [adminEmail, setAdminEmail]     = useState("");
  const [resetLoading, setResetLoading] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      await new Promise((res) => setTimeout(res, 1000));
      router.push("/Dashboard");
    } catch {
      setError("Invalid credentials. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setResetLoading(true);
    try {
      await new Promise((res) => setTimeout(res, 1000));
      setResetSuccess(true);
    } catch {
      // handle error
    } finally {
      setResetLoading(false);
    }
  };

  const closeModal = () => {
    setShowForgotModal(false);
    setAdminEmail("");
    setResetSuccess(false);
    setResetLoading(false);
  };

  return (
    <div
      className={`${montserrat.className} ${page.wrapper}`}
      style={{ backgroundImage: "url('/login/bg.jpg')" }}
    >
      {/* Background overlay */}
      <div className={page.overlay} />

      {/* Login Card */}
      <div className={card.wrapper} style={{ background: "rgba(255,255,255,0.88)" }}>

        {/* Logo */}
        <div className={card.logoWrap}>
          <img src="/logo.png" alt="Portalix Logo" className={card.logo} />
        </div>

        {/* Heading */}
        <h1 className={card.title}>Sign in to access your account</h1>
        <p className={card.subtitle}>Authorized personnel only. Please sign in to proceed.</p>

        {/* Form */}
        <form onSubmit={handleSubmit} className={form.wrapper}>
          {error && <div className={form.errorBox}>{error}</div>}

          {/* Username */}
          <div className={form.fieldWrap}>
            <label className={form.label}>User Name</label>
            <div className={form.inputWrap}>
              <img src="/login/solar_user-linear.png" alt="" className={form.inputIcon} />
              <input
                type="email"
                placeholder="Enter your Username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className={form.input}
              />
            </div>
          </div>

          {/* Password */}
          <div className={form.fieldWrap}>
            <label className={form.label}>Password</label>
            <div className={form.inputWrap}>
              <img src="/login/password.png" alt="" className={form.inputIcon} />
              <input
                type="password"
                placeholder="Enter your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className={form.inputPassword}
              />
            </div>
          </div>

          {/* Forgot Password */}
          <div className={form.forgotWrap}>
            <button type="button" onClick={() => setShowForgotModal(true)} className={form.forgotBtn}>
              Forgot Password?
            </button>
          </div>

          {/* Submit */}
          <button type="submit" disabled={isLoading} className={form.submitBtn}>
            {isLoading ? <Spinner /> : "Sign In"}
          </button>
        </form>

        <p className={card.copyright}>© Copyright 2026. Portalix</p>
      </div>

      {/* ─── Forgot Password Modal ─── */}
      {showForgotModal && (
        <div
          className={fm.overlay}
          style={{ background: "rgba(0,0,0,0.35)" }}
          onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
        >
          <div className={fm.card}>

            {/* Header */}
            <div className={fm.headerRow}>
              <div className={fm.spacer} />
              <h2 className={`${montserrat.className} ${fm.title}`}>Forgot Password</h2>
              <button onClick={closeModal} className={fm.closeBtn}>
                <svg width="11" height="11" viewBox="0 0 16 16" fill="none">
                  <path d="M2 2L14 14M14 2L2 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            </div>

            <div className={fm.divider} />

            {/* Body */}
            <div className={fm.body}>
              {resetSuccess ? (
                <div className={fm.successWrap}>
                  <div className={fm.successIcon}>
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                      <path d="M5 14L11 20L23 8" stroke="#E87A00" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <p className={fm.successText}>
                    Password reset link has been sent to<br />
                    <span className={fm.successEmail}>{adminEmail}</span>
                  </p>
                  <button onClick={closeModal} className={fm.successBtn}>Done</button>
                </div>
              ) : (
                <form onSubmit={handleForgotPassword} className={fm.formWrap}>
                  <div className={fm.fieldWrap}>
                    <label className={fm.label}>Enter Admin Email</label>
                    <input
                      type="email"
                      placeholder="Enter your admin email"
                      value={adminEmail}
                      onChange={(e) => setAdminEmail(e.target.value)}
                      required
                      className={fm.input}
                    />
                  </div>

                  <div className={fm.spacerBlock} />

                  <button type="submit" disabled={resetLoading} className={fm.submitBtn}>
                    {resetLoading ? <Spinner /> : "Send Password Reset Link"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}