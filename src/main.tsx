import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
// import LoginForm from './components/auth/Login.tsx'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import SignupForm from './components/auth/Signup.tsx'
import ForgotPasswordForm from './components/auth/ForgotPassword.tsx'
import ResetPassword from './components/auth/ResetPassword.tsx'
// import SingleProductPage from './components/signleProduct/SingleProductPage.tsx'
// import 'swiper/swiper.min.css';
import Dashboard from './components/dashboard/dash.tsx'
// import Contact from './Contact.tsx'
import AboutPage from './components/about/page.tsx'
import UserProfile from './Profile.tsx'
import Products from './components/products-page/Products.tsx'
import ContactPage from './components/Contact/ContactPage.tsx'
import SignupPage from './components/SignUp/SignupPage.tsx'
import SigninPage from './components/SignIn/SignInPage.tsx'
import ProductPage from './components/Product/ProductPage.tsx'
import ShopPage from './components/Product/Shop/Page.tsx'
import Confirm from './confirm/Confirm.tsx'
import KomparasId from './confirm/KomparasId.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<SigninPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/forgot_password" element={<ForgotPasswordForm />} />
        <Route path="/reset_password?resetToken=:resetToken" element={<ResetPassword />} />
      </Routes>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/product/:productId" element={<ProductPage />} />
        <Route path="/confirm/:KomparasId" element={<KomparasId />} />
        <Route path="/contact_us" element={<ContactPage />} />
        <Route path="/about_us" element={<AboutPage />} />
        <Route path="/confirm" element={<Confirm />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:productId/shop/:shopId" element={<ShopPage />} />



      </Routes>
    </BrowserRouter>
    <ToastContainer />
  </React.StrictMode>,
)
