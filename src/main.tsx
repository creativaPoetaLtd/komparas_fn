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
import ConfirmShop from './confirm/ShopComfirm.tsx'
import KomparasId from './confirm/KomparasId.tsx'
import ServicePage from './components/about/servicePage.tsx'
import TechnicalTermsPage from './components/about/TechnicalTermsPage.tsx'
import PartnershipPage from './components/about/PartnershipPage.tsx'
import JobDescriptionPage from './components/about/Jobdescription.tsx'
import TermsAndConditions from './components/about/TermsAndConditions.tsx'
import SingleJobApplication from './components/dashboard/Jobs/singleJobApplication.tsx'
import ComparisonDrawer from './components/products-page/ComparisonDrawer.tsx'
import ComparisonDrawerSingle from './components/Product/Pdrawer.tsx'
import HowToUseKompras from './components/about/HowToUseKompras.tsx'
import WhyBuyersUseKompras from './components/about/WhyBuyersUseKompras.tsx'
import WhyShopsUseKompras from './components/about/WhyShopsUseKompras.tsx'
import RegisterShop from './components/about/registerShop.tsx'
import ProtectedRoute from './components/auth/ProtectRoutes/Protecting.tsx'
import RedirectIfAuthenticated from './components/auth/ProtectRoutes/RedirectIfAuthenticated.tsx'
import SingleServicePage from './components/SingleService.tsx'
import Blog from './components/blog/blog.tsx'
import BlogPost from './components/blog/BlogPost.tsx'

let userddata = localStorage.getItem("authToken");
let user = userddata || '';

ReactDOM.createRoot(document.getElementById('root')!).render(

  <React.StrictMode>
    <BrowserRouter>
      <Routes>
      <Route path="/login" element={
          <RedirectIfAuthenticated token={user}>
            <SigninPage />
          </RedirectIfAuthenticated>
        } />
        <Route path="/signup" element={
          <RedirectIfAuthenticated token={user}>
            <SignupPage />
          </RedirectIfAuthenticated>
        } />
        <Route path="/dashboard" element={
          <ProtectedRoute token={user}>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/forgot_password" element={<ForgotPasswordForm />} />
        <Route path="/reset_password?resetToken=:resetToken" element={<ResetPassword />} />
        <Route path="/" element={<App />} />
        <Route path="/product/:productId" element={<ProductPage />} />
        <Route path="/product/:productId/compare" element={<ComparisonDrawerSingle open={false} onClose={() => {}} comparisonData={{}} />} />
        <Route path="/job-applications/:id" element={<SingleJobApplication />} />
        <Route path="/client/confirm/:KomparasId" element={<KomparasId />} />
        <Route path="/shop/confirm/:KomparasId" element={<ConfirmShop />} />
        <Route path="/contact_us" element={<ContactPage />} />
        <Route path="/about_us" element={<AboutPage />} />
        <Route path="/serivisi" element={<ServicePage />} />
        <Route path="/sobanukirwa" element={<TechnicalTermsPage />} />
        <Route path="/partnership" element={<PartnershipPage />} />
        <Route path="/akazi" element={<JobDescriptionPage />} />
        <Route path="/koresha-kompras" element={<HowToUseKompras />} />
        <Route path="/ibyiza-bya-kompras-umukiriye" element={<WhyBuyersUseKompras />} />
        <Route path="/ibyiza-bya-kompras-iduka" element={<WhyShopsUseKompras />} />
        <Route path="/amategeko-agenga-kompras" element={<TermsAndConditions />} />
        <Route path="/client/confirm" element={<Confirm />} />
        <Route path="/shop/confirm" element={<Confirm />} />
        <Route path="/andikisha-iduka-ryawe" element={<RegisterShop />} />
        <Route path="/confirm" element={<Confirm />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/compare"  element={<ComparisonDrawer open={false} onClose={() => { } } refresh={false} />} />
        <Route path="/product/:productId/shop/:shopId" element={<ShopPage />} />
        <Route path="/services/:id" element={<SingleServicePage />} />
        <Route path="/blog" element={<Blog />} /> 
        <Route path="/blog/:id" element={<BlogPost />} />
      </Routes>
    </BrowserRouter>
    <ToastContainer />
  </React.StrictMode>,
)
