"use client";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import Checkbox from "@/components/form/input/Checkbox";
import { EyeCloseIcon, EyeIcon } from "@/icons";
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import CryptoJS from 'crypto-js';
import { AuthApi } from "@/app/api/AuthApi";
import Image from "next/image";
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const ENCRYPTION_KEY = 'JFb5K2Q0W6yPzRbNQrYpHbJ9RncgBnV8c1NxajY5Fsk=';

export default function SignInForm() {
  const { t, i18n } = useTranslation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const router = useRouter();

  // Load saved credentials on component mount
  useEffect(() => {
    const savedUsername = localStorage.getItem('saved_username');
    const savedPassword = localStorage.getItem('saved_password');

    if (savedUsername && savedPassword) {
      try {
        const decryptedUsername = CryptoJS.AES.decrypt(savedUsername, ENCRYPTION_KEY).toString(CryptoJS.enc.Utf8);
        const decryptedPassword = CryptoJS.AES.decrypt(savedPassword, ENCRYPTION_KEY).toString(CryptoJS.enc.Utf8);

        if (decryptedUsername && decryptedPassword) {
          setUsername(decryptedUsername);
          setPassword(decryptedPassword);
          setRememberMe(true);
        }
      } catch (error) {
        console.error('Failed to decrypt saved credentials:', error);
        // Clear invalid saved credentials
        localStorage.removeItem('saved_username');
        localStorage.removeItem('saved_password');
      }
    }
  }, []);

  const handleLogin = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      const user = { username, password };
      const response = await AuthApi.login(user);
      const { access_token, refresh_token, expires_in } = response;

      localStorage.setItem('access_token', access_token);
      localStorage.setItem('refresh_token', refresh_token);
      localStorage.setItem('expires_in', String(Date.now() + expires_in * 1000));
      localStorage.setItem('isLoggedIn', 'true');

      if (rememberMe) {
        const encryptedUsername = CryptoJS.AES.encrypt(username, ENCRYPTION_KEY).toString();
        const encryptedPassword = CryptoJS.AES.encrypt(password, ENCRYPTION_KEY).toString();
        localStorage.setItem('saved_username', encryptedUsername);
        localStorage.setItem('saved_password', encryptedPassword);
      } else {
        localStorage.removeItem('saved_username');
        localStorage.removeItem('saved_password');
      }

      router.push('/');
    } catch (error: any) {
      setErrorMessage(t('login_failed'));
    } finally {
      setLoading(false);
    }
  };

  return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col flex-1 lg:w-1/2 w-full items-center justify-center px-4 sm:px-6 lg:px-8"
      >
        {/* Logo Section */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex items-center mb-8 sm:mb-12"
        >
          <Image
              width={600}
              height={200}
              src="/images/logo/auth-logo.webp"
              alt={t('logo_alt')}
              className="w-auto h-auto max-w-[400px] sm:max-w-[500px]"
              priority
          />
        </motion.div>

        {/* Form Card */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full max-w-md"
        >
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-theme-xl border border-gray-200 dark:border-gray-800 p-6 sm:p-8 lg:p-10">
            {/* Header */}
            <div className="mb-8">
              <h1 className="mb-3 text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                {t('sign_in')}
              </h1>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                {t('enter_credentials')}
              </p>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="mb-6 p-4 rounded-xl bg-error-50 dark:bg-error-900/20 border border-error-200 dark:border-error-800"
              >
                <p className="text-sm font-medium text-error-600 dark:text-error-400 text-center">
                  {errorMessage}
                </p>
              </motion.div>
            )}

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-6">
              {/* Username Field */}
              <div>
                <Label className="mb-2">
                  {t('telephone')} <span className="text-error-500">*</span>
                </Label>
                <Input
                    placeholder={t('your_telephone')}
                    defaultValue={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full"
                />
              </div>

              {/* Password Field */}
              <div>
                <Label className="mb-2">
                  {t('password')} <span className="text-error-500">*</span>
                </Label>
                <div className="relative">
                  <Input
                      type={showPassword ? "text" : "password"}
                      placeholder={t('enter_password')}
                      defaultValue={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pr-12"
                  />
                  <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className={`absolute z-10 -translate-y-1/2 top-1/2 transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg p-2 ${
                        i18n.dir() === "rtl" ? "left-2" : "right-2"
                      }`}
                      aria-label={showPassword ? t('hide_password') : t('show_password')}
                  >
                    {showPassword ? (
                        <EyeIcon className="w-5 h-5 fill-gray-500 dark:fill-gray-400"/>
                    ) : (
                        <EyeCloseIcon className="w-5 h-5 fill-gray-500 dark:fill-gray-400"/>
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center">
                <Checkbox
                  checked={rememberMe}
                  onChange={setRememberMe}
                  label={t('remember_me')}
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                {loading ? (
                  <div className="flex items-center justify-center w-full py-3">
                    <div className="w-6 h-6 border-3 border-blue-light-500 border-t-transparent rounded-full animate-spin"/>
                  </div>
                ) : (
                  <Button 
                    className="w-full" 
                    size="md"
                    type="submit"
                  >
                    {t('sign_in')}
                  </Button>
                )}
              </div>
            </form>
          </div>

          {/* Additional Info or Links */}
          <div className="mt-6 text-center">
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              {t('secure_login') || 'Your credentials are encrypted and secure'}
            </p>
          </div>
        </motion.div>
      </motion.div>
  );
}
