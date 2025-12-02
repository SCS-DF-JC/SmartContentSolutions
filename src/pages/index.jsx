import Layout from "./Layout.jsx";

import Home from "./Home";

import DashboardPreview from "./DashboardPreview";

import Pricing from "./Pricing";

import CoreTools from "./CoreTools";

import CorporateTools from "./CorporateTools";

import Contact from "./Contact";

import Privacy from "./Privacy";

import Terms from "./Terms";

import Tool from "./Tool";

import Account from "./Account";

import SubscriptionSuccess from "./SubscriptionSuccess";

import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

const PAGES = {
    
    Home: Home,
    
    DashboardPreview: DashboardPreview,
    
    Pricing: Pricing,
    
    CoreTools: CoreTools,
    
    CorporateTools: CorporateTools,
    
    Contact: Contact,
    
    Privacy: Privacy,
    
    Terms: Terms,
    
    Tool: Tool,
    
    Account: Account,
    
    SubscriptionSuccess: SubscriptionSuccess,
    
}

function _getCurrentPage(url) {
    if (url.endsWith('/')) {
        url = url.slice(0, -1);
    }
    let urlLastPart = url.split('/').pop();
    if (urlLastPart.includes('?')) {
        urlLastPart = urlLastPart.split('?')[0];
    }

    const pageName = Object.keys(PAGES).find(page => page.toLowerCase() === urlLastPart.toLowerCase());
    return pageName || Object.keys(PAGES)[0];
}

// Create a wrapper component that uses useLocation inside the Router context
function PagesContent() {
    const location = useLocation();
    const currentPage = _getCurrentPage(location.pathname);
    
    return (
        <Layout currentPageName={currentPage}>
            <Routes>            
                
                    <Route path="/" element={<Home />} />
                
                
                <Route path="/Home" element={<Home />} />
                
                <Route path="/DashboardPreview" element={<DashboardPreview />} />
                
                <Route path="/Pricing" element={<Pricing />} />
                
                <Route path="/CoreTools" element={<CoreTools />} />
                
                <Route path="/CorporateTools" element={<CorporateTools />} />
                
                <Route path="/Contact" element={<Contact />} />
                
                <Route path="/Privacy" element={<Privacy />} />
                
                <Route path="/Terms" element={<Terms />} />
                
                <Route path="/Tool" element={<Tool />} />
                
                <Route path="/Account" element={<Account />} />
                
                <Route path="/SubscriptionSuccess" element={<SubscriptionSuccess />} />
                
            </Routes>
        </Layout>
    );
}

export default function Pages() {
    return (
        <Router>
            <PagesContent />
        </Router>
    );
}